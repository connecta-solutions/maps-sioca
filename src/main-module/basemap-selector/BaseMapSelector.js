import React, {Component} from 'react';
import baseMaps from '../../leaflet/basemaps/basemaps';
import Scope from "../../_base/ApplicationScope";

class BaseMapSelector extends Component {

    _baseClass = "sioca-map-base-map-selector";

    handleClickAnyBaseMap = (baseMap) => {
        Scope.$mapApi.changeBasemap(baseMap);

        this.forceUpdate();
    };

    render() {
        let currentMap = Scope.$mapApi.getCurrentBaseMapName();

        return (
            <div className={this._baseClass}>
                <div className={this._baseClass + "-base-maps-container"}>
                    {baseMaps.map((baseMap, index) => {
                        return (
                            <div key={index}
                                 className={this._baseClass + "-base-map-thumb"}
                                 style={{
                                     border : currentMap === baseMap.name ? "solid 2px #af5d5d" : "2px solid #d8d8d8"
                                 }}>
                                <img src={baseMap.thumbnail} alt={baseMap.name}
                                     onClick={() => {this.handleClickAnyBaseMap(baseMap)}}/>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default BaseMapSelector;
