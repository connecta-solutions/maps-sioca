import React, {Component} from 'react';
import LeafletAPI from "./leaflet/index";
import Scope from "./_base/ApplicationScope";
import SideBarComponent from "./component/sidebar/side-bar-component";
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import TocComponent from "./main-module/TOC/TocComponent";
import BaseMapSelector from "./main-module/basemap-selector/BaseMapSelector";
import LegendComponent from "./main-module/legend/LegendComponent";
import PopoverComponent from "./component/popover/popover-component";
import OccurrenceLegendDecorator from "./decorators/OccurrenceLegendDecorator";

class MainModule extends Component {

    _baseClass = "module-sioca";

    _mapNode;

    state = {
        actualTool : "toc"
    };

    componentDidMount () {
        Scope.$mapApi = new LeafletAPI(this._mapNode);
        Scope.$mapApi.resizeMap();
    }

    changeTool = (toolName) => {
        this.setState({
            actualTool : toolName
        });
    };

    render() {
        return (
            <div className={this._baseClass}>
                <div className={this._baseClass + "-toc-container"}>
                    <SideBarComponent icon={<IconMenu/>}>
                        <div>
                            <div className={this._baseClass + "-toc-menu-container"}>
                                <div className={this._baseClass + "-toc-menu-item"}
                                     onClick={() => this.changeTool("toc")}
                                     style={{
                                         backgroundColor : this.state.actualTool === "toc" ? "rgba(255,255,255, 1)" : "transparent"
                                     }}>
                                    <span>Camadas</span>
                                </div>

                                <div className={this._baseClass + "-toc-menu-item"}
                                     onClick={() => this.changeTool("legend")}
                                     style={{
                                         backgroundColor : this.state.actualTool === "legend" ? "rgba(255,255,255, 1)" : "transparent"
                                     }}>
                                    <span>Legenda</span>
                                </div>

                                <div className={this._baseClass + "-toc-menu-item"}
                                     onClick={() => this.changeTool("baseMapSelector")}
                                     style={{
                                         backgroundColor : this.state.actualTool === "baseMapSelector" ? "rgba(255,255,255, 1)" : "transparent"
                                     }}>
                                    <span>Mapas base</span>
                                </div>
                            </div>

                            {
                                tools[this.state.actualTool]
                            }

                        </div>
                    </SideBarComponent>
                </div>

                <div ref={element => {
                    this._mapNode = element;

                    if (!this.state.mapIsBuilt) {
                        this.setState({
                            mapIsBuilt : true
                        });
                    }
                }}
                     className={this._baseClass + "-map-node"} />

                {this.state.mapIsBuilt && (
                    <PopoverComponent />
                )}
            </div>
        );
    }
}

export default MainModule;

const tools = {
    toc : <TocComponent />,
    baseMapSelector : <BaseMapSelector />,
    legend : <LegendComponent />
};
