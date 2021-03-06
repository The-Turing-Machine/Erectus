$(document).ready(function() {
    var arr = [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [72.03238901390978, 38.913188059745586]
        },
        "properties": {
            "title": "Disaster",
            "marker-symbol": "monument"
        }
    }];

    var json = JSON.stringify(arr);

    var obj = JSON.parse(json);

    var event;

    obj.push({
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [60.414, 37.776]
        },
        "properties": {
            "title": "Disaster",
            "marker-symbol": "monument"
        }
    });

    $.ajax({
        type: 'GET',
        url: 'http://10.0.0.62:5000',
        contentType: "application/json",
        // data: 'data value',
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            for (var i in data.data) {
                obj.push({
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [data.data[i].coordinates.coordinates[0], data.data[i].coordinates.coordinates[1]]
                    },
                    "properties": {
                        "title": "Disaster",
                        "marker-symbol": "monument"
                    }
                });
                $('</br><p class="events" style="background-color: rgba(0,0,0,0.6); padding: 1em;"><span class="time" style="float: left;">' + data.data[i].from_date + '</span></br>' + data.data[i].summary + '</br><span class="time">Severity Unit : </span>' + data.data[i].severity.unit + 'agnitude</br><span class="time">Severity Value : </span>' + data.data[i].severity.value + '</p>').appendTo('.major');
                //console.log(data.data[i].coordinates.coordinates[0]);
                //console.log(data.data[i].coordinates.coordinates[1]);
            }

        },
        error: function() {
            alert('Error loading Data');
        }
    });

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXNoaXNoMzE5NyIsImEiOiJjaW10YzluNWgwMXhkdjlrazVsb3BhdnZ1In0.BzeOLoPxqc8-ottHp7tWAg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v8',
        center: [-32.51469952959991,18.890056173909848],
        zoom: 1,
    });

    map.on('style.load', function() {

        // Add a new source from our GeoJSON data and set the
        // 'cluster' option to true.
        map.addSource("earthquakes", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            "data": {
                "type": "FeatureCollection",
                "features": obj
            },
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        // Use the earthquakes source to create five layers:
        // One for non-clustered markers, three for each cluster category,
        // and one for cluster labels.
        map.addLayer({
            "id": "non-cluster-markers",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "icon-image": "marker-15"
            }
        });

        // Display the earthquake data in three layers, each filtered to a range of
        // count values. Each range gets a different fill color.
        var layers = [
            [150, 'yellow'],
            [20, 'red'],
            [0, '#EC407A']
        ];

        layers.forEach(function(layer, i) {
            map.addLayer({
                "id": "cluster-" + i,
                "type": "circle",
                "source": "earthquakes",
                "paint": {
                    "circle-color": layer[1],
                    "circle-radius": 18
                },
                "filter": i == 0 ? [">=", "point_count", layer[0]] : ["all", [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i - 1][0]]
                ]
            });
        });

        // Add a layer for the clusters' count labels
        map.addLayer({
            "id": "cluster-count",
            "type": "symbol",
            "source": "earthquakes",
            "layout": {
                "text-field": "{point_count}",
                "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
                "text-size": 12
            }
        });

        $('#setCamp').one('click', function() {
            map.on('click', function(e) {
                console.log(JSON.stringify(e.lngLat));
                $.ajax({
                    type: 'POST',
                    url: 'http://10.0.0.62:5000/post',
                    contentType: "application/json",
                    data: JSON.stringify(e.lngLat),
                    dataType: 'json'
                });
                alert('Relief Camp Set!');
            });
        });
    });

var swatches = document.getElementById('swatches');
var layers = document.getElementById('layers');
var colors = [
    '#0d47a1',
    '#006064'

];

colors.forEach(function(color) {
    var swatch = document.createElement('button');
    swatch.style.backgroundColor = color;
    window.addEventListener('mousemove', function() {

        map.setPaintProperty(layer.value, 'fill-color', color);
    });
    swatches.appendChild(swatch);
});
});
