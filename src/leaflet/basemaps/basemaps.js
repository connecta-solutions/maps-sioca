export default [
    {
        name : "osm",
        type : 'tileLayer',
        label : "Open Street Map",
        options : {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        },
        url : 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        thumbnail : 'https://b.tile.openstreetmap.org/5/16/15.png'
    },
    {
        name : "thunderforest-transport",
        label : "Thunderforest Transport",
        type : 'tileLayer',
        options : {
            attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            maxZoom: 19,
            apikey: 'db5ae1f5778a448ca662554581f283c5'
        },
        url : 'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=db5ae1f5778a448ca662554581f283c5',
        thumbnail : 'https://b.tile.thunderforest.com/transport/5/10/18.png?apikey=db5ae1f5778a448ca662554581f283c5'
    },
    {
        name : "Google Satellite",
        type : 'tileLayer',
        label : "Google Satellite",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        thumbnail : 'https://www.google.com.br/maps/vt/pb=!1m4!1m3!1i11!2i751!3i1114!2m3!1e0!2sm!3i378068088!2m40!1e2!2sspotlight!4m2!1sgid!2suk9nol_V3HBNcoPBTS6vEQ!8m34!1m8!12m7!10b0!12splaceholder!19m3!1b0!2zNSw2LDI0LDQ1LDc1LDkz!3s0x0%3A0x738470e469754a24!20e1!2m7!1s0x935a3d18df9ae275%3A0x738470e469754a24!2zQnJhc8OtbGlhLCBERg!4m2!3d-15.7942287!4d-47.8821658!5e1!6b1!11e1!13m10!2sa!15b1!18m3!5b0!6b0!8b0!22m3!6e2!7e3!8e2!19u12!19u14!19u20!20m1!1e6!3m8!2spt-BR!3sbr!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
        url : 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
    },
    {
        name : "Google Streets",
        type : 'tileLayer',
        label : "Google Streets",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        thumbnail : 'https://www.google.com.br/maps/vt/pb=!1m4!1m3!1i11!2i751!3i1114!2m3!1e0!2sm!3i378068088!2m40!1e2!2sspotlight!4m2!1sgid!2suk9nol_V3HBNcoPBTS6vEQ!8m34!1m8!12m7!10b0!12splaceholder!19m3!1b0!2zNSw2LDI0LDQ1LDc1LDkz!3s0x0%3A0x738470e469754a24!20e1!2m7!1s0x935a3d18df9ae275%3A0x738470e469754a24!2zQnJhc8OtbGlhLCBERg!4m2!3d-15.7942287!4d-47.8821658!5e1!6b1!11e1!13m10!2sa!15b1!18m3!5b0!6b0!8b0!22m3!6e2!7e3!8e2!19u12!19u14!19u20!20m1!1e6!3m8!2spt-BR!3sbr!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
    },
    {
        name : "Google Hybrid",
        type : 'tileLayer',
        label : "Google Hybrid",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        thumbnail : 'https://www.google.com.br/maps/vt/pb=!1m4!1m3!1i11!2i751!3i1114!2m3!1e0!2sm!3i378068088!2m40!1e2!2sspotlight!4m2!1sgid!2suk9nol_V3HBNcoPBTS6vEQ!8m34!1m8!12m7!10b0!12splaceholder!19m3!1b0!2zNSw2LDI0LDQ1LDc1LDkz!3s0x0%3A0x738470e469754a24!20e1!2m7!1s0x935a3d18df9ae275%3A0x738470e469754a24!2zQnJhc8OtbGlhLCBERg!4m2!3d-15.7942287!4d-47.8821658!5e1!6b1!11e1!13m10!2sa!15b1!18m3!5b0!6b0!8b0!22m3!6e2!7e3!8e2!19u12!19u14!19u20!20m1!1e6!3m8!2spt-BR!3sbr!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
    },
    {
        name : "Google Terrain",
        type : 'tileLayer',
        label : "Google Terrain",
        options : {
            subdomains:['mt0','mt1','mt2','mt3']
        },
        url : 'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        thumbnail : 'https://www.google.com.br/maps/vt/pb=!1m4!1m3!1i11!2i751!3i1114!2m3!1e0!2sm!3i378068088!2m40!1e2!2sspotlight!4m2!1sgid!2suk9nol_V3HBNcoPBTS6vEQ!8m34!1m8!12m7!10b0!12splaceholder!19m3!1b0!2zNSw2LDI0LDQ1LDc1LDkz!3s0x0%3A0x738470e469754a24!20e1!2m7!1s0x935a3d18df9ae275%3A0x738470e469754a24!2zQnJhc8OtbGlhLCBERg!4m2!3d-15.7942287!4d-47.8821658!5e1!6b1!11e1!13m10!2sa!15b1!18m3!5b0!6b0!8b0!22m3!6e2!7e3!8e2!19u12!19u14!19u20!20m1!1e6!3m8!2spt-BR!3sbr!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
    },
    {
        name : "osm-hot",
        type : 'tileLayer',
        label : "Open Street Map Hot",
        options : {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
        },
        url : 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        thumbnail : 'https://a.tile.openstreetmap.fr/hot/5/9/15.png'
    },
    {
        name : "openmapsurfer-roads",
        label : "Open Map Surfer Roads",
        type : 'tileLayer',
        options : {
            maxZoom: 20,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        },
        url : 'http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}',
        thumbnail : 'http://korona.geog.uni-heidelberg.de/tiles/roads/x=24&y=32&z=6'
    }
];