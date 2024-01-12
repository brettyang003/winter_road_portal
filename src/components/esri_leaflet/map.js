function setBasemap(basemap) {
    if (basemapLayer) {
        map.removeLayer(basemapLayer);
    }
    basemapLayer = L.esri.basemapLayer(basemap, { tileSize: 512, zoomOffset: -1, detectRetina: true })
        //basemapLayer = L.esri.Vector.vectorBasemapLayer("ArcGIS:" + basemap, { apiKey: apiKey });
    map.addLayer(basemapLayer);
    if (layerLabels) {
        map.removeLayer(layerLabels);
    }
    if (basemap.includes('Imagery')) {
        layerLabels = L.esri.basemapLayer('ImageryLabels');
        map.addLayer(layerLabels);
    }
}

function setPolylineLayer(i) {
    var stdweight = 4;
    if (mapLayers[i].layerNum == 3 || mapLayers[i].layerNum == 12) {
        if (activeLayers[1]) {
            map.removeLayer(activeLayers[1]);
        }
        if (activeLayers[24]) {
            map.removeLayer(activeLayers[24]);
        }
        e = 'inherit';
        d = 'inherit';
        if (document.getElementById("localRoadYU").checked) {
            e = 'black';
        }
        if (document.getElementById("roadYukon").checked) {
            d = 'red';
        }
        activeLayers[i] = L.esri.featureLayer({
            url: url[5],
            style: function(feature, layer) {
                var c;
                if (feature.properties.AW_WR == "All Weather") {
                    c = d;
                } else {
                    c = e;
                }
                return { color: c, weight: stdweight };
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(1, feature));
            }
        }).addTo(map);
    } else if (mapLayers[i].layerNum == 23 || mapLayers[i].layerNum == 26) {
        if (activeLayers[2]) {
            map.removeLayer(activeLayers[2]);
        }
        if (activeLayers[3]) {
            map.removeLayer(activeLayers[3]);
        }
        a = 'inherit';
        b = 'inherit';
        r = 'inherit';
        if (document.getElementById("localRoadNWT").checked) {
            a = 'black';
        }
        if (document.getElementById("roadNWT").checked) {
            b = 'rgb(0, 0, 219)';
            r = 'red';
        }
        activeLayers[i] = L.esri.featureLayer({
            url: url[2],
            style: function(geojson, layer) {
                var c, d = null;
                if (geojson.properties.AW_WR == "All Weather Road") {
                    c = r;
                } else if (geojson.properties.AW_WR == "Winter Road" && geojson.geometry.coordinates[0][0] > -111) {
                    c = b;
                    d = '10 10';
                } else if (geojson.properties.AW_WR == "Winter Road") {
                    c = 'inherit';
                } else {
                    c = a;
                }
                return { color: c, dashArray: d, weight: stdweight };
            },
            onEachFeature: function(geojson, layer) {
                layer.bindPopup(layerContent(2, geojson));
            }
        }).addTo(map);
    } else if (mapLayers[i].layerNum == 8 || mapLayers[i].layerNum == 10) {
        u = "https://modis.arcgis.com/arcgis/rest/services/VIIRS/ImageServer";
        if (mapLayers[i].layerNum == 8) {
            u = "https://modis.arcgis.com/arcgis/rest/services/MODIS/ImageServer";
        }
        activeLayers[i] = L.esri.imageMapLayer({
            url: u,
            attribution: "We acknowledge the use of imagery provided by services from NASA's Global Imagery Browse Services (GIBS), part of NASA's Earth Observing System Data and Information System (EOSDIS).",
            mosaicRule: { "mosaicMethod": "ByAttribute" }
        }).addTo(map);
    } else {
        if (mapLayers[i].layerNum == 27) {
            activeLayers[i] = L.esri.featureLayer({
                url: url[1],
                style: { color: mapLayers[i].layerColor, weight: stdweight },
                onEachFeature: function(feature, layer) {
                    layer.bindPopup(layerContent(i, feature));
                }
            }).addTo(map);
        } else {
            var d = null;
            if (mapLayers[i].layerColor == "rgb(0, 0, 219)") {
                d = '10 10';
            }
            activeLayers[i] = L.esri.featureLayer({
                url: url[0] + mapLayers[i].layerNum,
                style: { color: mapLayers[i].layerColor, weight: stdweight, dashArray: d },
                onEachFeature: function(feature, layer) {
                    if (mapLayers[i].layerNum != 16) {
                        layer.bindPopup(layerContent(i, feature));
                    }
                }
            }).addTo(map);
        }
    }
}

function mouseOut() {
    document.getElementById('info-pane').innerHTML = 'Hover to Inspect';
}

function layerContent(i, feature) {
    var target = mapLayers[i].layerNum;
    if (target == 1) {
        return "Name: " + feature.properties.STREET + "<br>Type: " + feature.properties.STREETNAME + "<br>CARTO: " + feature.properties.CARTO + "<br>Left Maf: " + feature.properties.LEFT_MAF + "<br>Right Maf: " + feature.properties.RIGHT_MAF + "<br>Beginning Elevation: " + feature.properties.BEGELEV + "<br>Ending Elevation: " + feature.properties.ENDELEV;
    } else if (target == 22) {
        return "Name: " + feature.properties.STREET + "<br>Road Type: Winter Road" + "<br>Begin Elevation: " + feature.properties.BEGELEV + "<br>End Elevation: " + feature.properties.ENDELEV;
    } else if (target == 3) {
        return "Name: " + feature.properties.rdsegnamen + "<br>Road Type: " + feature.properties.rdcls_en + "<br>Is This Segment Paved: " + feature.properties.ispaved_en;
    } else if (target == 23) {
        return "Name 1: " + feature.properties.ROADNAME + "<br>Name 2: " + feature.properties.RTENAME2EN + "<br>Surface: " + feature.properties.SURFACE + "<br>Speed: " + feature.properties.Speed;
    } else if (target == 21) {
        return "Name 1: " + feature.properties.RTENAME1EN + "<br>Name 2: " + feature.properties.RTENAME2EN + "<br>Road Class: " + feature.properties.ROADCLASS + "<br>Closed in: " + feature.properties.CLOSING;
    } else if (target == 27) {
        return "Name: " + feature.properties.ROADNAME + "<br>Road Type: " + feature.properties.ROADTYPE;
    } else if (target == 16) {
        return "Name: " + feature.properties.name + "<br>Oneway: " + translateInput(feature.properties.oneway) + "<br>Bridge: " + translateInput(feature.properties.bridge) + "<br>Tunnel: " + translateInput(feature.properties.tunnel);
    } else if (target == 4) {
        return "Num of Tracks: " + feature.properties.numtracks + "<br>Classification: " + feature.properties.classif_en + "<br>use: " + feature.properties.use_en + "<br>Status: " + feature.properties.status_en;
    } else if (target == 24) {
        return "Feature: " + feature.properties.FEATURE + "<br>Segment Length (km): " + feature.properties.SEG_LEN_KM + "<br>Municipality: " + feature.properties.MUNICIPAL + "<br>Structure Type: " + feature.properties.STRUCT_TYP + "<br>Beginning Elevation: " + feature.properties.BEGELEV + "<br>Ending Elevation: " + feature.properties.ENDELEV;
    } else if (target == 2) {
        return "Shape Length: " + feature.properties.Shape__Length;
    } else if (target == 5) {
        return "First Nations Name: " + feature.properties.FN_NAME + "<br>Route Name: " + feature.properties.ROUTE_NAME + "<br>Route Number: " + feature.properties.ROUTE_NUM + "<br>Route Length: " + feature.properties.ROUTE_LEN + "<br>Route Description: " + feature.properties.ROUTE_DESC;
    } else if (target == 6) {
        return "Name: " + feature.properties.TOURISM_TR;
    } else if (target == 0) {
        return 'Name: ' + feature.properties.NAME + ' Airport<br>Surface: ' + feature.properties.RUNWAY_SUR + 'Terminal: ' + feature.properties.TERMINAL + 'Elevation (ft): ' + feature.properties.ELEVATION_ + 'Length (ft): ' + feature.properties.LENGTH_FT + 'Width (ft): ' + feature.properties.WIDTH_FT + 'Maintenance: ' + feature.properties.MAINTENANC + 'Feature Type: ' + feature.properties.FEATURE_TY;
    } else if (target == 14) {
        return 'Name: ' + feature.properties.NAME_ALIAS + '<br>Surface: ' + feature.properties.Runway_Typ + 'Elevation: ' + feature.properties.ELEVATION;
    } else if (target == 20) {
        return 'Name: ' + feature.properties.NAME_ALIAS + '<br>Surface: ' + feature.properties.Runway_Typ + 'Length (ft)' + feature.properties.Runway_Len + 'Status: ' + feature.properties.STATUS + 'Accessible: ' + feature.properties.Accessible;
    } else if (target == 15) {
        return 'Name: ' + feature.properties.NAME + '<br>Address: ' + feature.properties.ADDRESS + '<br>City: ' + feature.properties.CITY + '<br>Postal Code: ' + feature.properties.POST_CODE + '<br>Phone: ' + feature.properties.PHONE + '<br>Elevation: ' + feature.properties.ELEVATION;
    } else if (target == 7) {
        var attachmentUrl = url[3] + "/" + feature.properties.OBJECTID + "/attachments?f=html&token=";
        return 'Name: ' + feature.properties.Name + '<br>Date: ' + Date(feature.properties.Date) + '<br>Location: ' + feature.properties.Location + '<br>Comments: ' + feature.properties.Comments + '<br><button class="getAttachment" onclick="window.open(\'' + attachmentUrl + '\');">Click to Get Attachments</button>'
    } else if (target == 17) {
        var sog, cloud, snowball;
        if (feature.properties.SOG == "Y") {
            sog = "Yes";
        } else {
            sog = "No";
        }
        if (feature.properties.clouds == "full_sun") {
            cloud = "Full Sun / Clear Sky";
        } else if (feature.properties.clouds == "mix") {
            cloud = "Mix of Sun and Cloud";
        } else {
            cloud = "Full Cloud Cover";
        }
        if (feature.properties.SNOWBALL == "N_NOSNOW") {
            snowball = "No, there is not enough snow.";
        } else if (feature.properties.SNOWBALL == "N_FROZEN") {
            snowball = "No, the snow is too icy / hard.";
        } else if (feature.properties.SNOWBALL == "N_DRY") {
            snowball = "No, it's too dry (the snow is very fluffy)";
        } else if (feature.properties.SNOWBALL == "NY_MOIST") {
            snowball = "Somewhat, parts of the snowballl stick together, others fall apart (the snow  is moist).";
        } else if (feature.properties.SNOWBALL == "Y_WET") {
            snowball = "Yes, the perfect snowball!";
        } else if (feature.properties.SNOWBALL == "Y_VERYWET") {
            snowball = "Yes, the snowball is very wet and some water is pressed out.";
        } else if (feature.properties.SNOWBALL == "Y_SOAKED") {
            snowball = "Yes, but it melts in my hands. My hands are soaked!";
        }
        return ('Date/Time of Observation: <span class="bold">' + Date(feature.properties.Date_Time) + '</span><br>Air temperature (°C): <span class="bold">' + feature.properties.SAT + '</span><br>Snow on the Ground: <span class="bold">' + sog + '</span><br>Snow depth (cm): <span class="bold">' + feature.properties.SD + '</span><br>Clouds: <span class="bold">' + cloud + '</span><br>Can you make a snow ball: <span class="bold">' + snowball + '</span>');
    } else if (target == 9) {
        return 'ID: ' + feature.properties.ID + '<br>Park Name: ' + feature.properties.PARK_LABEL;
    } else if (target == 10) {
        return 'ID: ' + feature.properties.ID + '<br>First Nation Territory: ' + feature.properties.FN_TERR + '<br>Rights: ' + feature.properties.SL_CATEGOR + '<br>Hunting: ' + translateInput(feature.properties.HUNTING) + '<br>Mining: ' + translateInput(feature.properties.MINING) + '<br>Water Row: ' + translateInput(feature.properties.WATER_ROW);
    } else if (target == 25) {
        return 'Name: ' + feature.properties.NAME_EN + '<br>Land Type: ' + feature.properties.LAND_TYPE + '<br>Municipality: ' + feature.properties.MUNICIPAL;
    }
}

function translateInput(input) {
    if (input == 'N') {
        return 'No';
    } else if (input == "Y") {
        return 'Yes';
    } else if (input == "F") {
        return 'No';
    } else if (input == "T") {
        return 'Yes';
    } else if (input == "B") {
        return 'No';
    } else {
        return input;
    }
}

function airportPopup(source, input, i) {
    if (input == 0) {
        return "Name: " + source[input][i].Name + "<br>Elevation: " + source[input][i].elevation + "<br>Length (ft): " + source[input][i].length;
    } else if (input == 1) {
        return "Name: " + source[input][i].Name + "<br>Elevation: " + source[input][i].elevation;
    } else {
        return "Name: " + source[input][i].Name + "<br>Length (ft): " + source[input][i].length;
    }
}

function setClusterMarkers(input) {
    var source = [airportYukon, airportNWT, airportNU, medNU, portCommuNWT, poi];
    if (input < 3) {
        for (var i = 0; i < source[input].length; i++) {
            if (source[input][i].surface == "Pavement") {
                new L.marker([source[input][i].lat, source[input][i].lng], {
                    icon: paved_airport_icon
                }).bindPopup(airportPopup(source, input, i), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            } else {
                new L.marker([source[input][i].lat, source[input][i].lng], {
                    icon: unpaved_airport_icon
                }).bindPopup(airportPopup(source, input, i), { offset: L.point([3, -13]) }).addTo(markersArray[input]);
            }
        }
    } else if (input < 4) {
        for (var i = 0; i < source[input].length; i++) {
            L.marker([source[input][i].lat, source[input][i].lng], {
                icon: hospital_icon
            }).bindPopup('Name: ' + source[input][i].Name, { offset: L.point([3, -13]) }).addTo(markersArray[input]);
        }
    } else if (input < 5) {
        for (var i = 0; i < source[input].length; i++) {
            L.marker([source[input][i].lat, source[input][i].lng], {
                icon: port_icon
            }).addTo(markersArray[input]);
        }
    } else if (input < 6) {
        markersArray[input].addLayer(L.esri.Cluster.featureLayer({
            url: url[4],
            onEachFeature: function(feature, layer) {
                layer.bindPopup(layerContent(18, feature));
            }
        }));
    } else {

    }
}

function setPolygon(i) {
    activeLayers[i] = L.esri.featureLayer({
        url: url[0] + mapLayers[i].layerNum,
        simplifyFactor: 0.5,
        precision: 5,
        style: { color: mapLayers[i].layerColor, weight: 2 },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(layerContent(i, feature));
        }
    }).addTo(map);
}

// Add feature layers
function setLayer(input) {
    var idArr = ["airportYukon", "airportNU", "airportNWT", "healthcareNU", "portCommNWT"];
    for (let i = 0; i < mapLayers.length; i++) {
        if (input == mapLayers[i].layerid) {
            if (activeLayers[i]) {
                if (i >= initLayers && i < initLayers + numOfClusterLayer) {
                    clusteredMarkers.removeLayer(markersArray[i - initLayers]);
                    activeLayers[i] = false;
                    toggleLegend(i)
                } else if (mapLayers[i].layerType == "polygon") {
                    document.getElementById(input + "Legend").classList.toggle("hide");
                    map.removeLayer(activeLayers[i]);
                } else if (mapLayers[i].layerNum == 23 || mapLayers[i].layerNum == 26) {
                    map.removeLayer(activeLayers[i]);
                    if (document.getElementById("roadNWT").checked) {
                        setPolylineLayer(2);
                    } else if (document.getElementById("localRoadNWT").checked) {
                        setPolylineLayer(3);
                    }
                } else if (mapLayers[i].layerNum == 3 || mapLayers[i].layerNum == 12) {
                    map.removeLayer(activeLayers[i]);
                    if (document.getElementById("roadYukon").checked) {
                        setPolylineLayer(1);
                    } else if (document.getElementById("localRoadYU").checked) {
                        setPolylineLayer(24);
                    }
                } else {
                    map.removeLayer(activeLayers[i]);
                }
                activeLayers[i] = false;
            } else if (mapLayers[i].layerType == "polyline") {
                setPolylineLayer(i);
            } else if (mapLayers[i].layerType == "polygon") {
                document.getElementById(input + "Legend").classList.toggle("hide");
                setPolygon(i);
            } else if (mapLayers[i].layerType == "data") {
                for (var j = 0; j < idArr.length; j++) {
                    if (document.getElementById(idArr[j]).checked == true) {
                        setLayerHelper(idArr[j]);
                    }
                }
                removePOI();
                if (mapLayers[i].layerNum == 7) {
                    activeLayers[i] = L.esri.Cluster.featureLayer({
                        url: url[3],
                        pointToLayer: function(geojson, latlng) {
                            var color;
                            if (geojson.properties.Category == 1) {
                                color = 'aqua';
                            } else if (geojson.properties.Category == 2) {
                                color = 'yellow';
                            } else if (geojson.properties.Category == 3) {
                                color = 'white';
                            } else if (geojson.properties.Category == 4) {
                                color = 'green';
                            } else if (geojson.properties.Category == 5) {
                                color = 'red';
                            }
                            return L.marker(latlng, {
                                icon: new L.DivIcon({
                                    html: '<svg height="15" width="15"><polygon points="0,0 0,15 15,15 15,0" style="fill:' + color + '" /></svg>'
                                })
                            });
                        },
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup(layerContent(i, feature));
                        }
                    }).addTo(map);
                } else {
                    activeLayers[i] = L.esri.Cluster.featureLayer({
                        url: url[6],
                        pointToLayer: function(geojson, latlng) {
                            if (latlng.lat > 58) {
                                return L.marker(latlng, {
                                    icon: larissa_marker
                                });
                            } else {
                                return L.marker(L.latLng(-100, 1500))
                            }
                        },
                        onEachFeature: function(feature, layer) {
                            layer.bindPopup(layerContent(i, feature));
                        }
                    }).addTo(map);
                }

            } else if (input == 'poiA') {
                for (var j = 0; j < idArr.length; j++) {
                    if (document.getElementById(idArr[j]).checked == true) {
                        setLayerHelper(idArr[j]);
                    }
                }
                removeData();
                clusteredMarkers.addLayer(markersArray[i - initLayers]);
                activeLayers[i] = true;
            } else {
                removePOI();
                removeData();
                clusteredMarkers.addLayer(markersArray[i - initLayers]);
                activeLayers[i] = true;
                toggleLegend(i);
            }
            break;
        }
    }
}

function toggleLegend(i) {
    if (i - initLayers < 3) {
        if (activeLayers[initLayers] != true && activeLayers[initLayers + 1] != true && activeLayers[initLayers + 2] != true) {
            document.getElementById("airportLegend").classList.toggle("hide");
        } else if (activeLayers[initLayers] == true || activeLayers[initLayers + 1] == true || activeLayers[initLayers + 2] == true) {
            if (document.getElementById("airportLegend").classList.contains("hide")) {
                document.getElementById("airportLegend").classList.toggle("hide");
            }
        }
    } else if (i - initLayers < 4) {
        document.getElementById("medLegend").classList.toggle("hide");
    } else {
        document.getElementById("portLegend").classList.toggle("hide");
    }
}

function showCity() {
    var latLng = this.getLatLng();
    for (var i = 0; i < cityInfo.length; i++) {
        if (!document.getElementById(cityInfo[i].cityId).classList.contains("hide")) {
            document.getElementById(cityInfo[i].cityId).classList.toggle("hide");
        }
        if (latLng.lat == cityInfo[i].lat && latLng.lng == cityInfo[i].lng) {
            document.getElementById(cityInfo[i].cityId).classList.toggle("hide");
        }
    }
    for (var i = 0; i < commuInfo.length; i++) {
        //console.log(commuInfo[i].cityId);
        try {
            if (!document.getElementById(commuInfo[i].cityId).classList.contains("hide")) {
                document.getElementById(commuInfo[i].cityId).classList.toggle("hide");
            }
        } catch (error) {

        }
        if (latLng.lat == commuInfo[i].lat && latLng.lng == commuInfo[i].lng) {
            document.getElementById(commuInfo[i].cityId).classList.toggle("hide");
        }
    }
}

function zoomHandler() {
    var currentZoom = map.getZoom();
    if (currentZoom < 6) {
        // show cities
        map.removeLayer(layer2);
        map.removeLayer(layer3);
        map.removeLayer(layer4);
        layer1.addTo(map);
    } else if (currentZoom < 7) {
        // show all commu
        map.removeLayer(layer1);
        map.removeLayer(layer3);
        map.removeLayer(layer4);
        layer2.addTo(map);
    } else if (currentZoom < 8) {
        // show all commu
        map.removeLayer(layer1);
        map.removeLayer(layer2);
        map.removeLayer(layer4);
        layer3.addTo(map);
    } else {
        map.removeLayer(layer1);
        map.removeLayer(layer2);
        map.removeLayer(layer3);
        layer4.addTo(map);
    }
}

function addFullMarker(info, i, target) {
    new L.Marker([info[i].lat, info[i].lng], {
        icon: new L.DivIcon({
            className: 'divIcon',
            html: '<i onclick="showCity("' + info[i].cityId + '")" class="far fa-circle" style="font-size: 15px;width: 200px;"><span style="font-family: \'Roboto\', sans-serif;">' + info[i].cityName + '</span></i>',
        })
    }).on('click', showCity).on('mouseover', function(e) {
        var arr = ["1", "2", "3", "4", "5"];
        var picArr = ["./gas-pump-solid.svg", "./hotel-solid.svg", "./utensils-solid.svg", "./hospital-symbol-solid.svg", "./police.png"];
        if (info[i].services == "") {
            document.getElementById('info-pane').innerHTML = 'No Services';
            return;
        }
        for (var k = 0; k < arr.length; k++) {
            if (info[i].services.includes(arr[k])) {
                if (k == 0) {
                    document.getElementById('info-pane').innerHTML = "";
                }
                assist(picArr[k]);
            }
        }
    }).on('mouseout', mouseOut).addTo(target);
}

function assist(src) {
    var img = document.createElement("img");
    img.src = src;
    img.classList.add('servicesLabel')
    document.getElementById('info-pane').appendChild(img);
}

function addCirMarker(info, i, target) {
    new L.Marker([info[i].lat, info[i].lng], {
        icon: new L.DivIcon({
            className: 'divIcon',
            html: '<i onclick="showCity("' + info[i].cityId + '")" class="far fa-circle" style="font-size: 15px;"></i>',
        })
    }).on('click', showCity).on('mouseover', function(e) {
        var arr = ["1", "2", "3", "4", "5"];
        var picArr = ["./gas-pump-solid.svg", "./hotel-solid.svg", "./utensils-solid.svg", "./hospital-symbol-solid.svg", "./police.png"];
        if (info[i].services == "") {
            document.getElementById('info-pane').innerHTML = 'No Services';
            return;
        }
        for (var k = 0; k < arr.length; k++) {
            if (info[i].services.includes(arr[k])) {
                if (k == 0) {
                    document.getElementById('info-pane').innerHTML = "";
                }
                assist(picArr[k]);
            }
        }
    }).on('mouseout', mouseOut).addTo(target);
}

function resetZoom() {
    map.setView([65, -103], 4);
}

function onLocationFound(e) {
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }
    var radius = e.accuracy / 2;
    current_position = L.circleMarker(e.latlng, { color: 'white', fillColor: '#3388ff', fillOpacity: 1 }).addTo(map);
    current_accuracy = L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message); //"Geolocation service does not work on your server. ");
}