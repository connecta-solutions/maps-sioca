export default [
    {
        name : "osm",
        type : 'tileLayer',
        label : "OpenStreetMap",
        options : {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        },
        url : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        thumbnail : 'http://c.tile.osm.org/4/6/8.png'
    },
    {
        name : "thunderforest-transport",
        label : "Thunderforest",
        type : 'tileLayer',
        options : {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
            apikey: 'db5ae1f5778a448ca662554581f283c5'
        },
        url : 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=db5ae1f5778a448ca662554581f283c5',
        thumbnail : 'http://c.tile.thunderforest.com/transport/4/6/8.png?apikey=db5ae1f5778a448ca662554581f283c5'
    },
    {
        name : "Google Satellite",
        type : 'tileLayer',
        label : "Google Satélite",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        thumbnail : 'http://mt2.google.com/vt/lyrs=s&x=6&y=8&z=4',
        url : 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    },
    {
        name : "Google Streets",
        type : 'tileLayer',
        label : "Google Ruas",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        thumbnail : 'http://mt2.google.com/vt/lyrs=m&x=6&y=8&z=4'
    },
    {
        name : "Google Hybrid",
        type : 'tileLayer',
        label : "Google Híbrido",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        thumbnail : 'http://mt2.google.com/vt/lyrs=s,h&x=6&y=8&z=4'
    },
    {
        name : "Google Terrain",
        type : 'tileLayer',
        label : "Google Relevo",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        thumbnail : 'http://mt2.google.com/vt/lyrs=p&x=6&y=8&z=4'
    },
    {
        name : "osm-hot",
        type : 'tileLayer',
        label : "OpenStreetMap 2",
        options : {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        },
        url : 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        thumbnail : 'http://c.tile.openstreetmap.fr/hot/4/6/8.png'
    },
    {
        name : "OpenStreetMap.BlackAndWhite",
        label : "OpenStreetMaps Preto e branco",
        type : 'tileLayer',
        options : {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        url : 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
        thumbnail : 'http://c.tiles.wmflabs.org/bw-mapnik/4/6/8.png'
    },
    {
        name : "osm-aquarela",
        label : "OSM Aquarela",
        type : 'tileLayer',
        options : {
            ext: 'png',
            subdomains: 'abcd',
            maxZoom: 16,
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        },
        url : 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}',
        thumbnail : 'https://stamen-tiles-c.a.ssl.fastly.net/watercolor/4/6/8.png'
    },
];