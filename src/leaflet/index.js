import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Scope from "../_base/ApplicationScope";
import baseMaps from './basemaps/basemaps';
import ApplicationMediator, {TOPICS} from "../helper/ApplicationMediator";
import GetFeatureInfo from "../helper/GetFeatureInfo";

export default class LeafletAPI {

    _map;

    _layers = Scope.$layers;

    _baseMaps = baseMaps;

    _legends = {};

    _layersMapping = {};

    _reorderedLayers = [];

    constructor (mapNode) {
        this.buildMap(mapNode);

        ApplicationMediator.subscribe(TOPICS.REORDER_LAYERS, (TOPIC, layers) => this.handleReorderLayers(layers));
    }

    buildMap(mapNode) {
        return new Promise((resolve, reject) => {
            try {
                this._map = L.map(mapNode, {
                    crs : L.CRS.EPSG3857,
                    center: [-13, -55],
                    zoom: 4
                });

                this._map.on("click", this.handleMapClick.bind(this));
                this._map.on("zoomend", this.handleMapZoomEnd.bind(this));

                this.setupBaseMap();
                this.setupPopoverPane();

            } catch (error) {
                reject(error);
            }
        });
    }

    setupPopoverPane () {
        let pane = this._map.createPane("popover");

        pane.style.zIndex = "800";
    }

    handleMapZoomEnd = () => {
        ApplicationMediator.publish(TOPICS.MAP_ZOOM_END, true)
    };

    handleMapClick (event) {
        let latLng = event.latlng;

        if (event.originalEvent.target.dataset.type !== "closePopup" && event.originalEvent.target.dataset.type !== "popupControl") {
            GetFeatureInfo.execute(this._map, latLng).then((geoJSONs) => {
                ApplicationMediator.publish(TOPICS.CLICK_ON_MAP, {
                    event,
                    geoJSONs
                });
            });
        }
    }

    setupBaseMap () {
        this._currentBasemap = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
            maxZoom: 19,
            subdomains:['mt0','mt1','mt2','mt3']
        }).addTo(this._map);

        this._currentBasemap.name = "Google Hybrid";
    }

    changeBasemap(baseMapConfig) {
        if (baseMapConfig.name === this._currentBasemap.name) return;

        switch(baseMapConfig.type) {
            case 'tileLayer':
                if (!this._baseMaps[baseMapConfig.name]) {
                    this._baseMaps[baseMapConfig.name] = L.tileLayer(baseMapConfig.url, baseMapConfig.options);
                }
                this._baseMaps[baseMapConfig.name].addTo(this._map);
                this._baseMaps[baseMapConfig.name].setZIndex(0);

                break;

            default:
        }

        if (this._currentBasemap) {
            this._map.removeLayer(this._currentBasemap);
        }

        this._currentBasemap = this._baseMaps[baseMapConfig.name];
        this._currentBasemap.name = baseMapConfig.name;
    }

    setupInitialLayers () {
        let scope = this;
        let layers = Object.assign([], this._layers);

        build(layers);
        setOrder();

        function build (layers) {
            layers.forEach((obj) => {
                if (obj.type === "GROUP") {
                    build(obj.children);
                } else if (obj.type === "ITEM") {
                    obj._id = new Date().getTime();

                    obj.dsn = obj.dsn.replace("\${ip}", Scope.$geoServerIp);

                    let pane = scope._map.createPane(String(obj._id));
                    let layer = L.tileLayer.wms(obj.dsn, {
                        pane,
                        layers : obj.layers,
                        crs : L.CRS.EPSG3857,
                        transparent: true,
                        format : "image/png"
                    });

                    if (!obj.enabledLayer) {
                        pane.style.opacity = 0;
                    }

                    layer.layerName = obj.name;
                    layer.defaultLayer = true;
                    layer.addTo(scope._map);

                    scope._layersMapping[obj._id] = layer;
                }
            });
        }

        function setOrder () {
            let layersIds = Object.keys(Object.assign({}, scope._layersMapping));
            let count = layers.length;

            layersIds.forEach((id) => {
                let pane = scope._map.getPane(String(id));

                pane.style.zIndex = (400 + count);
                count -= 1;
            });
        }
    }

    setupLegends () {
        let scope = this;
        let layers = Object.assign([], this._layers);

        build(layers);

        function build (layers) {
            layers.forEach((obj) => {
                if (obj.type === "GROUP") {
                    build(obj.children);
                } else if (obj.type === "ITEM") {
                    let url = obj.dsn.replace("\${ip}", Scope.$geoServerIp);

                    let params = {
                        request : "GetLegendGraphic",
                        version : "1.1.1",
                        layer : obj.layers,
                        width : 50,
                        height : 50,
                        format : "image/png"
                    };

                    url = scope._toQueryParams(url, params);

                    scope._legends[obj._id] = {
                        _id : obj._id,
                        enabled : obj.toggled,
                        title : obj.name,
                        url
                    };
                }
            });
        }
    }

    resizeMap() {
        this._map.invalidateSize(true);
    }

    insertPointsOnMap (coordinatesArr) {
        this._map.eachLayer((layer) => {
            if (!layer.name && !layer.defaultLayer) {
                this._map.removeLayer(layer);
            }
        });

        coordinatesArr.forEach((coordinates) => {
            let point = L.latLng(coordinates.y, coordinates.x);
            let myIcon = L.icon({
                iconAnchor: [12.5, 41],
                iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
            });

            L.marker(point, {icon : myIcon}).addTo(this._map);
        });

        let lastPoint = coordinatesArr[coordinatesArr.length - 1];
        this._map.panTo(L.latLng(lastPoint.y, lastPoint.x));
    }

    toggleLayer (layer) {
        if (layer.enabledLayer) {
            this.disableLayer(layer);
            this.disableLegend(layer);
        } else {
            this.enableLayer(layer);
            this.enableLegend(layer);
        }

        layer.enabledLayer = !layer.enabledLayer;

        ApplicationMediator.publish(TOPICS.TOGGLE_LAYER, layer);
    }

    disableLayer = (layer) => {
        let pane = this._map.getPane(String(layer._id));
        pane.style.opacity = 0;
    };

    enableLayer = (layer) => {
        let pane = this._map.getPane(String(layer._id));
        pane.style.opacity = 1;
    };

    disableLegend (layer) {
        this._legends[layer._id].enabled = false;
    }

    enableLegend (layer) {
        this._legends[layer._id].enabled = true;
    }

    getCurrentBaseMapName () {
        return this._currentBasemap.name;
    }

    getLegendsAsArray () {
        return this._reorderedLayers.length ? this._reorderedLayers : Object.assign([], Object.values(this._legends));
    }

    handleReorderLayers (layers) {
        let count = layers.length;
        let newLayers = Object.assign([], layers);

        this._removeFromOrderedLayers(layers);

        newLayers.forEach((layer) => {
            let pane = this._map.getPane(String(layer._id));
            pane.style.zIndex = (400 + count);

            this._reorderedLayers.push(layer);
            count -= 1;
        });
    }

    _removeFromOrderedLayers (layers) {
        let reorderedLayersIds = this._reorderedLayers.map((layer) => layer._id);
        let layersIds = layers.map((layer) => layer._id);
        let indexesToExclude = [];

        layersIds.forEach((id) => {
            if (reorderedLayersIds.includes(id)) {
                indexesToExclude.push(reorderedLayersIds.indexOf(id));
            }
        });

        indexesToExclude.sort((a, b) => a - b);
        indexesToExclude.reverse();
        indexesToExclude.forEach((index) => {
            this._reorderedLayers.splice(index, 1);
        });
    }

    getActiveLayers () {
        let self = this;
        let activeLayersKeys = Object.keys(this._layersMapping).filter((id) => isActive(id));
        let activeLayers = [];

        for (let key in this._layersMapping) {
            if (activeLayersKeys.includes(key)) {
                activeLayers.push(this._layersMapping[key]);
            }
        }

        return activeLayers;

        function isActive (layerId) {
            let active = false;

            find(self._layers);

            function find (layers) {

                for (let obj of layers) {
                    if (obj.type === "ITEM") {
                        if (obj._id === Number(layerId)) {
                            active = obj.enabledLayer;
                            break;
                        }
                    } else if (obj.type === "GROUP") {
                        find(obj.children)
                    }
                }
            }

            return active;
        }
    }

    getPane (name) {
        return this._map.getPane(name);
    }

    _toQueryParams (url, params) {
        return url + "?" + Object.keys(params).reduce((a, key) => {
            a.push(key.toUpperCase() + '=' + encodeURIComponent(params[key]));
            return a
        }, []).join('&');
    }
}
