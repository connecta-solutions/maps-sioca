import React from 'react';
import ReactDOM from 'react-dom';
import MainModule from './MainModule';
import "./App.css";
import Scope from "./_base/ApplicationScope";
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
import theme from "./theme.config";

const defaultTheme = getMuiTheme(theme);

injectTapEventPlugin();

export default class MapSioca {

    _applicationNode;

    _applicationReference;

    _mainModuleReference;

    constructor (node, geoServerIp) {
        this._applicationNode = node;
        Scope.$geoServerIp = geoServerIp;
    }

    buildApplication () {
        this._applicationReference = ReactDOM.render(
            <MuiThemeProvider muiTheme={defaultTheme}>
                <MainModule ref={element => this._mainModuleReference = element} />
            </MuiThemeProvider>,
            this._applicationNode);
    }

    insertPointsOnMap (coordinates) {
        Scope.$mapApi.insertPointsOnMap(coordinates);
    }

    resizeMap () {
        Scope.$mapApi.resizeMap();
    }

    setupInitialLayers () {
        Scope.$mapApi.setupInitialLayers();
    }

    setupLegends () {
        Scope.$mapApi.setupLegends();
    }

    insertOccurrenceLayer (occurrences, aliases) {
        Scope.$mapApi.insertOccurrenceLayer(occurrences, aliases);
    }

    removeOccurrenceLayer () {
        Scope.$mapApi.removeOccurrenceLayer();
    }
}

window["MapSioca"] = MapSioca;

// setTimeout(() => {
//    let _instance = new MapSioca(document.getElementById("root"), "cet.cds.com.br");
//
//    _instance.buildApplication();
//    _instance.setupInitialLayers();
//    _instance.setupLegends();
//
//    window["instance"] = _instance;
// }, 2000);
