import React from 'react';
import ApplicationMediator, {TOPICS} from "../../helper/ApplicationMediator";
import Scope from '../../_base/ApplicationScope';
import Clear from 'material-ui/svg-icons/content/clear';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import ArrowFoward from 'material-ui/svg-icons/navigation/arrow-forward';

class PopoverComponent extends React.Component {

    _baseClass = "sioca-map-popover-component";

    _popoverReference;

    _popoverData = [];

    _lastSizes = {};

    state = {
        opened : false,
        currentPage : 0,
        bounds : {
            top : 0,
            left : 0
        }
    };

    constructor (props) {
        super(props);

        ApplicationMediator.subscribe(TOPICS.CLICK_ON_MAP, (TOPIC, data) => this.handleMapClick(data));
        ApplicationMediator.subscribe(TOPICS.MAP_ZOOM_END, (TOPIC, data) => this.handleMapZoomEnd());
    }

    componentDidMount () {
        let pane = Scope.$mapApi.getPane("popover");

        pane.appendChild(this._popoverReference);
    }

    handleMapZoomEnd = () => {
        this.setState({
            opened : false
        });
    };

    handleMapClick = ({event, geoJSONs}) => {
        if (geoJSONs.length) {

            this.buildPopoverData(geoJSONs);

            this.setState({
                opened : true,
                currentPage : 0
            }, () => {
                this.setState({
                    bounds : {
                        top : event.layerPoint.y - (this._popoverReference.clientHeight + 10),
                        left : event.layerPoint.x - (this._popoverReference.clientWidth / 2)
                    }
                });
            });

        } else {
            this.setState({
                opened : false
            });
        }
    };

    buildPopoverData = (geoJSONs) => {
        let pagesProperties = [];
        this._popoverData = [];

        geoJSONs.forEach((geoJSON) => {
            return geoJSON.features.forEach((feature) => {
                feature.properties["Camada"] = geoJSON.layerName;

                pagesProperties.push(
                    feature.properties
                )
            });
        });

        pagesProperties.forEach((properties, index) => {
            this._popoverData[index] = properties;
        });
    };

    buildPopoverContent = () => {
        let currentPageProperties = this._popoverData[this.state.currentPage];
        let styleNoBreakLines = {whiteSpace : 'nowrap'};
        let nodes = [];


        nodes.push(
            <div key="1"
                 style={styleNoBreakLines}>
                    <span style={{
                        fontSize : 14
                    }}>
                        <b>{currentPageProperties["Camada"]}</b>
                    </span>
            </div>
        );

        for (let key in currentPageProperties) {
            nodes.push(
                <div key={key}>
                    <span style={styleNoBreakLines}>
                        {key !== "Camada" ? (
                            <div style={{
                                maxWidth: 250,
                                overflow: "hidden",
                                cursor: "pointer",
                                textOverflow: "ellipsis"
                            }}>
                                <b>{key}</b>":&nbsp;<span title={currentPageProperties[key]}>{currentPageProperties[key]}</span>
                            </div>
                        ) : ""}
                    </span>
                </div>
            );
        }

        return nodes;
    };

    handleClosePopup = () => {
        this.setState({
            opened : false
        });
    };

    handleClickPopoverArrowLeft = () => {
        this.setLastSizes();

        this.setState({
            currentPage : this.state.currentPage - 1
        }, () => {this.verifyChangeSize()});
    };

    handleClickPopoverArrowRight = () => {
        this.setLastSizes();

        this.setState({
            currentPage : this.state.currentPage + 1
        }, () => {this.verifyChangeSize()});
    };

    setLastSizes = () => {
        this._lastSizes = {
            width : this._popoverReference.clientWidth,
            height : this._popoverReference.clientHeight
        };
    };

    verifyChangeSize = () => {
        let diffWidth = this._popoverReference.clientWidth - this._lastSizes.width;
        let diffHeight = this._popoverReference.clientHeight - this._lastSizes.height;
        let nextLeft = 0;
        let nextTop = 0;
        let bounds = {};

        if (diffWidth > 0) {
            nextLeft = this.state.bounds.left - (diffWidth / 2);
        }

        if (diffWidth < 0) {
            nextLeft = this.state.bounds.left + (Math.abs(diffWidth) / 2);
        }

        if (diffHeight > 0) {
            nextTop = this.state.bounds.top - diffHeight;
        }

        if (diffHeight < 0) {
            nextTop = this.state.bounds.top + Math.abs(diffHeight);
        }

        if (Math.abs(diffWidth) !== 0) {
            bounds.left = nextLeft;
        }

        if (Math.abs(diffHeight) !== 0) {
            bounds.top = nextTop;
        }

        if (Object.keys(bounds).length > 0) {
            this.setState({
                bounds : Object.assign({}, this.state.bounds, bounds)
            }, this.setLastSizes());
        }
    };

    render () {
        let buttonsStyle = {
            pointerEvents : 'none'
        };
        return (
            <div ref={(e) => this._popoverReference = e}
                 className={this._baseClass}
                 style={{
                     display : this.state.opened ? "block" : "none",
                     top : this.state.bounds.top,
                     left : this.state.bounds.left
                 }}>

                <div className={this._baseClass + "-header"}>
                    <div onClick={this.handleClosePopup}
                         data-type="closePopup"
                         style={{
                             cursor : 'pointer'
                         }}>
                        <Clear style={buttonsStyle} />
                    </div>
                </div>

                <div className={this._baseClass + "-body"}>
                    {this._popoverData.length && this.buildPopoverContent()}
                </div>

                <div className={this._baseClass + "-footer"}>
                    <div className={this._baseClass + "-carousel-control"}>
                        <div className="left"
                             data-type="popupControl"
                             onClick={this.state.currentPage !== 0 ? this.handleClickPopoverArrowLeft : () => {}}
                             style={{
                                 opacity : this.state.currentPage !== 0 ? 1 : 0
                             }}>
                            <ArrowBack style={buttonsStyle} />
                        </div>

                        <div className="right"
                             data-type="popupControl"
                             onClick={this.state.currentPage !== (this._popoverData.length - 1) ? this.handleClickPopoverArrowRight : () => {}}
                             style={{
                                 opacity : this.state.currentPage !== (this._popoverData.length - 1) ? 1 : 0
                             }}>
                            <ArrowFoward style={buttonsStyle} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopoverComponent;