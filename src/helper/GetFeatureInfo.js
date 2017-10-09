import Scope from "../_base/ApplicationScope";
import L from "leaflet";
import axios from 'axios';

export default class GetFeatureInfo {

    /**
     *
     * @param map
     * @param latLng
     */
    static execute (map, latLng) {
        return new Promise((resolve, reject) => {
            let layers = Scope.$mapApi.getActiveLayers();
            let getFeatureInfoUris = [];
            let promises = [];
            let geoJSONs = [];

            try {
                layers.forEach((layer) => {
                    getFeatureInfoUris.push(this._getFeatureInfoUrl(map, layer, latLng));
                });

                getFeatureInfoUris.forEach((url) => {
                    promises.push(
                        axios.get(url)
                    );
                });

                Promise.all(promises).then((responses) => {
                    responses.forEach((response) => {
                        if (response.data.features.length) {
                            geoJSONs.push(response.data);
                        }
                    });

                    resolve(geoJSONs);
                });

            } catch (e) {
                reject(e);
            }
        });
    }

    static _getFeatureInfoUrl (map, layer, latLng) {
        let url = getUrl (
            map,
            layer,
            latLng,
            {
                'info_format': 'application/json'
            }
        );

        return url;

        function getUrl (map, layer, latLng, params) {

            let point = map.latLngToContainerPoint(latLng, map.getZoom()),
                size = map.getSize(),
                bounds = map.getBounds(),
                sw = bounds.getSouthWest(),
                ne = bounds.getNorthEast();

            sw = [sw.lng, sw.lat];
            ne = [ne.lng, ne.lat];

            let defaultParams = {
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4326',
                styles: '',
                version: '1.1.1',
                format: layer.options.format,
                bbox: [sw.join(','), ne.join(',')].join(','),
                height: size.y,
                width: size.x,
                layers: layer.options.layers,
                query_layers: layer.options.layers,
                info_format: 'text/html'
            };

            params = L.Util.extend(defaultParams, params || {});

            params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
            params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

            return layer._url + L.Util.getParamString(params, layer._url, true);
        }
    }
}