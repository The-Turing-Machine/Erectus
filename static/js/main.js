var arr = [{
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [72.03238901390978, 38.913188059745586]
    },
    "properties": {
        "title": "Mapbox DC",
        "marker-symbol": "monument"
    }
}];

var json = JSON.stringify(arr);

var obj = JSON.parse(json);

obj.push({
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [60.414, 37.776]
    },
    "properties": {
        "title": "Mapbox SF",
        "marker-symbol": "harbor"
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
                    "title": "Mapbox SF",
                    "marker-symbol": "harbor"
                }
            });
            console.log(data.data[i].coordinates.coordinates[0]);
            console.log(data.data[i].coordinates.coordinates[1]);
        }

    },
    error: function() {
        alert('Error loading Data');
    }
});
