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
    }

    componentDidMount () {
        let pane = Scope.$mapApi.getPane("popover");

        pane.appendChild(this._popoverReference);
    }

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
            return geoJSON.features.map((feature) => {
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
            <div style={styleNoBreakLines}>
                <span style={{
                    fontSize : 12
                }}>
                    <b>{"Camada: " + currentPageProperties["Camada"]}</b>
                </span>
            </div>
        );

        for (let key in currentPageProperties) {
            nodes.push(
                <div key={key}>
                    <span style={styleNoBreakLines}>
                        {key !== "Camada" ? (
                            <div>
                                <b>{key}</b>{": " + currentPageProperties[key]}
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
        this.setState({
            currentPage : this.state.currentPage - 1
        });
    };

    handleClickPopoverArrowRight = () => {
        this.setState({
            currentPage : this.state.currentPage + 1
        });
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
                             onClick={this.handleClickPopoverArrowLeft}
                             style={{
                                 opacity : this.state.currentPage !== 0 ? 1 : 0
                             }}>
                            <ArrowBack style={buttonsStyle} />
                        </div>

                        <div className="right"
                             data-type="popupControl"
                             onClick={this.handleClickPopoverArrowRight}
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