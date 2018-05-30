var mymap = L.map('mapid').setView([13.804318, -86.272771], 2.9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    opacity: .7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoib21hci1uYXZhcnJvIiwiYSI6ImNpanN2ZWZxZzBoa291eWx4ZWdsajl1OGIifQ.SH4OG9811nirTGJ3rE4DHw'
}).addTo(mymap);
function choroplethize(d) {
    return d > 43.6 ? '#bd0026' :
        d > 26.0 ? '#f03b20' :
            d > 15 ? '#fd8d3c' :
                d > 7.4 ? '#fecc5c' :
                    d > 0 ? '#ffffb2' :
                        <!-- if values are null keep transparent-->
                        '#1C00ff00';
}
function styleHomicides(feature) {
    return {
        weight: .75,
        opacity: 0.5,
        color: 'grey',
        dashArray: '0',
        fillOpacity: 0.9,
        fillColor: choroplethize(feature.properties.refactor_4)
    }
}
function geojsonPopup(feature, layer){
    if(feature.properties.SOVEREIGNT){
        layer.bindPopup('Country:   ' + feature.properties.SOVEREIGNT + '<br>Total Homicides:   '+ feature.properties.refactor_3 + '<br>Homicide Rate:   '+ feature.properties.refactor_4 + ' per 100,000')
    }
}

L.geoJSON([homicides2015], {
    style: styleHomicides,
    onEachFeature: geojsonPopup,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng);
    }
}).addTo(mymap);