class Converter {

    static _aliases = {};

    /**
     * @param {{geolocalizacoes : Object[]}[]} occurrences
     * @param {Object} aliases
     * @returns {IOccurrence[]}
     */
    static occurrencesToPoints (occurrences, aliases) {

        /**
         *
         * @type {IOccurrence[]}
         */
        let points = [];

        if (aliases) Converter._aliases = aliases;

        occurrences.forEach((occurrence) => {
            /**
             *
             * @type {IOccurrence}
             */
            let newPoint = {
                geometry : []
            };

            occurrence.geolocalizacoes.forEach((coordinates) => {
                newPoint.geometry.push({
                    x : coordinates.longitude,
                    y : coordinates.latitude,
                    legendType : 3
                });
            });

            newPoint.info = Converter._getPopupInfo(occurrence);

            points.push(newPoint);
        });

        return points;
    }

    static _getPopupInfo (occurrence) {
        let newTuple = {};
        let keys = Object.keys(occurrence);
        let values = Object.values(occurrence);

        keys.forEach((key, index) => {
            if (typeof values[index] !== "object") {
                newTuple[Converter._getFieldAlias(key)] = values[index];
            }
        });

        return newTuple;
    }

    static _getFieldAlias (field) {
        let alias = Converter._aliases[field];

        if (!alias) return field;

        return alias;
    }
}

export default Converter;