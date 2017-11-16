class IOccurrence {

    /**
     *
     * @type {IPoint[]}
     */
    geometry;

    /**
     *
     * @type {Object}
     */
    info;
}

class IPoint {
    /**
     *
     * @type {Number}
     */
    x;

    /**
     *
     * @type {Number}
     */
    y;

    /**
     *
     * @type {Number}
     */
    legendType;
}

class gato {
    teste (json) {
        json.features.map((feature) => {
            if (feature.geometry.type === "Point") {
                return {
                    geometry : [
                        {
                            x : feature.geometry.coordinates[0],
                            y : feature.geometry.coordinates[1],
                            legendType : Math.ceil(Math.random() * 36)
                        }
                    ],
                    info : feature.properties
                };
            }

        }).filter((feature) => {
            if (feature) {
                return feature;
            }
        });
    }
}