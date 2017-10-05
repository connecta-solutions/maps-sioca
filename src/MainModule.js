import React, {Component} from 'react';
import LeafletAPI from "./leaflet/index";
import Scope from "./_base/ApplicationScope";
import SideBarComponent from "./component/sidebar/side-bar-component";
import IconMenu from 'material-ui/svg-icons/navigation/menu';
import TocComponent from "./main-module/TOC/TocComponent";
import BaseMapSelector from "./main-module/basemap-selector/BaseMapSelector";
import {IconButton} from "material-ui";
import Map from 'material-ui/svg-icons/maps/map';
import Layers from 'material-ui/svg-icons/maps/layers';

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
                    <SideBarComponent title="Temas"
                                      icon={<IconMenu/>}>
                        <div>
                            <div>
                                <IconButton tooltip="Camadas"
                                            tooltipPosition="bottom-right"
                                            onClick={() => this.changeTool("toc")}
                                            style={{
                                                backgroundColor : this.state.actualTool === "toc" ? "#c1bcbc" : "transparent"
                                            }}>
                                    <Layers />
                                </IconButton>

                                <IconButton tooltip="Seletor de mapa base"
                                            tooltipPosition="bottom-right"
                                            onClick={() => this.changeTool("baseMapSelector")}
                                            style={{
                                                backgroundColor : this.state.actualTool === "baseMapSelector" ? "#c1bcbc" : "transparent"
                                            }}>
                                    <Map />
                                </IconButton>
                            </div>

                            {
                                tools[this.state.actualTool]
                            }

                        </div>
                    </SideBarComponent>
                </div>
                <div ref={element => this._mapNode = element}
                     className={this._baseClass + "-map-node"} />
            </div>
        );
    }
}

export default MainModule;

const tools = {
    toc : <TocComponent />,
    baseMapSelector : <BaseMapSelector />
};
