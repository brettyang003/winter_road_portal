var url = [
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/Edited_VLi_Feature_Map/FeatureServer/',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/VLi_NWT_Proposed_Roads/FeatureServer/0',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/VLi_NWT_Road_V3/FeatureServer/0',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/QuickCap_Data/FeatureServer/0',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/EnhancedPOI/FeatureServer/0',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/arcgis/rest/services/VLi_Yukon_Road/FeatureServer/0',
    'https://services1.arcgis.com/9NvE8jKNWWlDGsUJ/ArcGIS/rest/services/survey123_57f3268779704f019d656056b7e012b4_stakeholder/FeatureServer/0'
];

// length = how many possible active layers
var activeLayers = new Array(27);
let mapLayers = [
    // usable: 18, 19, 
    { "layerid": "iceYukon", "layerNum": 1, "layerType": "polyline", "layerColor": "rgb(0, 0, 219)" },
    { "layerid": "roadYukon", "layerNum": 3, "layerType": "polyline", "layerColor": "black" },
    { "layerid": "roadNWT", "layerNum": 23, "layerType": "polyline", "layerColor": "black" },
    { "layerid": "localRoadNWT", "layerNum": 26, "layerType": "polyline", "layerColor": "green" },
    { "layerid": "iceNWT", "layerNum": 22, "layerType": "polyline", "layerColor": "rgb(0, 0, 219)" },
    { "layerid": "ferry", "layerNum": 21, "layerType": "polyline", "layerColor": "aqua" },
    { "layerid": "propRoadNWT", "layerNum": 27, "layerType": "polyline", "layerColor": "lightgreen" },
    { "layerid": "roadNU", "layerNum": 16, "layerType": "polyline", "layerColor": "black" },
    { "layerid": "railYukon", "layerNum": 4, "layerType": "polyline", "layerColor": "gray" },
    { "layerid": "railNWT", "layerNum": 24, "layerType": "polyline", "layerColor": "gray" },
    { "layerid": "water", "layerNum": 2, "layerType": "polyline", "layerColor": "skyblue" },
    { "layerid": "FNHR", "layerNum": 5, "layerType": "polyline", "layerColor": "brown" },
    { "layerid": "WTT", "layerNum": 6, "layerType": "polyline", "layerColor": "orange" },
    { "layerid": "real_time_data", "layerNum": 7, "layerType": "data" },
    { "layerid": "airportYukon", "layerNum": 0, "layerType": "airpo" },
    { "layerid": "airportNU", "layerNum": 14, "layerType": "airpo" },
    { "layerid": "airportNWT", "layerNum": 20, "layerType": "airpo" },
    { "layerid": "healthcareNU", "layerNum": 13, "layerType": "health" },
    { "layerid": "portCommNWT", "layerNum": 11, "layerType": "commu" },
    { "layerid": "poiA", "layerNum": 15, "layerType": "poi" },
    { "layerid": "sk_data", "layerNum": 17, "layerType": "data" },
    { "layerid": "PPA", "layerNum": 9, "layerType": "polygon", "layerColor": "lawngreen" },
    //{ "layerid": "FNSL", "layerNum": 10, "layerType": "polygon", "layerColor": "darkred" },
    { "layerid": "modis", "layerNum": 8, "layerType": "polyline" },
    { "layerid": "viirs", "layerNum": 10, "layerType": "polyline" },
    { "layerid": "localRoadYU", "layerNum": 12, "layerType": "polyline", "layerColor": "black" },
    { "layerid": "AB", "layerNum": 25, "layerType": "polygon", "layerColor": "coral" }
];

let cityInfo = [
    { "cityId": "Yellowknife", "cityName": "Yellowknife", "lat": 62.454361, "lng": -114.372198, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Whitehorse", "cityName": "Whitehorse", "lat": 60.721188, "lng": -135.056850, "nameOnMap": 6 },
    { "cityId": "Iqaluit", "cityName": "Iqaluit", "lat": 63.7467, "lng": -68.5170, "nameOnMap": 6 }
];

let commuInfo = [
    { "cityId": "old_crow", "cityName": "Old Crow", "lat": 67.569600, "lng": -139.828800 },
    { "cityId": "teslin", "cityName": "Teslin", "lat": 60.1686, "lng": -132.7204, "nameOnMap": 6 },
    { "cityId": "ross_river", "cityName": "Ross River", "lat": 61.9791, "lng": -132.4485 },
    { "cityId": "faro", "cityName": "Faro", "lat": 62.2285, "lng": -133.3532, "nameOnMap": 6 },
    { "cityId": "watson_lake", "cityName": "Watson Lake", "lat": 60.0628, "lng": -128.7109, "nameOnMap": 6 },
    { "cityId": "carmacks", "cityName": "Carmacks", "lat": 62.0885, "lng": -136.2873, "nameOnMap": 6 },
    { "cityId": "pelly_crossing", "cityName": "Pelly Crossing", "lat": 62.8180, "lng": -136.5688 },
    { "cityId": "stewart_crossing", "cityName": "Stewart Crossing", "lat": 63.3752, "lng": -136.6780 },
    { "cityId": "keno_city", "cityName": "Keno City", "lat": 63.9083, "lng": -135.3035 },
    { "cityId": "mayo", "cityName": "Mayo", "lat": 63.5943, "lng": -135.8965, "nameOnMap": 6 },
    { "cityId": "dawson_city", "cityName": "Dawson City", "lat": 64.0601, "lng": -139.4320, "nameOnMap": 6 },
    { "cityId": "beaver_creek", "cityName": "Beaver Creek", "lat": 62.3838, "lng": -140.8753 },
    { "cityId": "burwash_landing", "cityName": "Burwash Landing", "lat": 61.3542, "lng": -138.9944 },
    { "cityId": "destruction_bay", "cityName": "Destruction Bay", "lat": 61.2525, "lng": -138.8008 },
    { "cityId": "haines_junction", "cityName": "Haines Junction", "lat": 60.7545, "lng": -137.5118, "nameOnMap": 6 },
    { "cityId": "carcross", "cityName": "Carcross", "lat": 60.1676, "lng": -134.7074 },
    { "cityId": "Sachs_Harbour", "cityName": "Sachs Harbour", "lat": 71.984968, "lng": -125.246796, "nameOnMap": 8 },
    { "cityId": "Ulukhaktok", "cityName": "Ulukhaktok", "lat": 70.736643, "lng": -117.770621, "nameOnMap": 8 },
    { "cityId": "Tuktoyaktuk", "cityName": "Tuktoyaktuk", "lat": 69.445401, "lng": -133.034298, "nameOnMap": 8, "services": "12345" },
    { "cityId": "Paulatuk", "cityName": "Paulatuk", "lat": 69.350899, "lng": -124.071101 },
    { "cityId": "Aklavik", "cityName": "Aklavik", "lat": 68.219965, "lng": -135.008094, "nameOnMap": 6, "services": "1245" },
    { "cityId": "Inuvik", "cityName": "Inuvik", "lat": 68.360650, "lng": -133.721210, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Fort_McPherson", "cityName": "Fort McPherson", "lat": 67.436325, "lng": -134.880824, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Tsiigehtchic", "cityName": "Tsiigehtchic", "lat": 67.441812, "lng": -133.743270, "services": "12" },
    { "cityId": "Colville_Lake", "cityName": "Colville Lake", "lat": 67.038426, "lng": -126.091179, "services": "1234" },
    { "cityId": "Fort_Good_Hope", "cityName": "Fort Good Hope", "lat": 66.255655, "lng": -128.634650, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Norman_Wells", "cityName": "Norman Wells", "lat": 65.281481, "lng": -126.829129, "nameOnMap": 8, "services": "12345" },
    { "cityId": "Deline", "cityName": "Déline", "lat": 65.188832, "lng": -123.423092, "nameOnMap": 8, "services": "12345" },
    { "cityId": "Tulita", "cityName": "Tulita", "lat": 64.903440, "lng": -125.573627, "services": "12345" },
    { "cityId": "Wrigley", "cityName": "Wrigley", "lat": 63.221542, "lng": -123.454922, "services": "12345" },
    { "cityId": "Fort_Simpson", "cityName": "Fort Simpson", "lat": 61.862790, "lng": -121.353062, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Jean_Marie_River", "cityName": "Jean Marie River", "lat": 61.525996, "lng": -120.624736, "services": "1234" },
    { "cityId": "Nahanni_Butte", "cityName": "Nahanni Butte", "lat": 61.033647, "lng": -123.383468, "services": "123" },
    { "cityId": "Fort_Liard", "cityName": "Fort Liard", "lat": 60.239182, "lng": -123.473848, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Sambaa_Ke", "cityName": "Sambaa K\'e", "lat": 60.440668, "lng": -121.244561, "services": "12" },
    { "cityId": "Kakisa", "cityName": "Kakisa", "lat": 60.932545, "lng": -117.421480, "services": "" },
    { "cityId": "Enterprise", "cityName": "Enterprise", "lat": 60.556989, "lng": -116.139964, "services": "123" },
    { "cityId": "Hay_River", "cityName": "Hay River", "lat": 60.816199, "lng": -115.785578, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Fort_Resolution", "cityName": "Fort Resolution", "lat": 61.172169, "lng": -113.673860, "services": "12345" },
    { "cityId": "Fort_Smith", "cityName": "Fort Smith", "lat": 60.006994, "lng": -111.894367, "nameOnMap": 6, "services": "12345" },
    { "cityId": "Fort_Providence", "cityName": "Fort Providence", "lat": 61.357636, "lng": -117.660693, "nameOnMap": 8, "services": "12345" },
    { "cityId": "Behchoko", "cityName": "Behchokǫ̀", "lat": 62.823025, "lng": -115.988376, "services": "12345" },
    { "cityId": "Dettah", "cityName": "Dettah", "lat": 62.412897, "lng": -114.309502, "services": "12345" },
    { "cityId": "Lutsel_Ke", "cityName": "Lutselk\'e", "lat": 62.405451, "lng": -110.737005, "services": "1245" },
    { "cityId": "Whati", "cityName": "Whatì", "lat": 63.143962, "lng": -117.269342, "nameOnMap": 8, "services": "12345" },
    { "cityId": "Wekweeti", "cityName": "Wekweètì", "lat": 64.190378, "lng": -114.183971, "services": "12" },
    { "cityId": "Gameti", "cityName": "Gamètì", "lat": 64.112192, "lng": -117.353984, "services": "1245" },
    { "cityId": "Kimmirut", "cityName": "Kimmirut", "lat": 62.8474, "lng": -69.8692, "nameOnMap": 8 },
    { "cityId": "Grise_Fiord", "cityName": "Grise Fiord", "lat": 76.4190, "lng": -82.9016, "nameOnMap": 7 },
    { "cityId": "Whale_Cove", "cityName": "Whale Cove", "lat": 62.2425, "lng": -92.6017, "nameOnMap": 9 },
    { "cityId": "Chesterfield_Inlet", "cityName": "Chesterfield Inlet", "lat": 63.3465, "lng": -90.7368, "nameOnMap": 6 },
    { "cityId": "Kugluktuk", "cityName": "Kugluktuk", "lat": 67.8252, "lng": -115.0966, "nameOnMap": 7 },
    { "cityId": "Coral_Harbour", "cityName": "Coral Harbour", "lat": 64.1388, "lng": -83.1699, "nameOnMap": 6 },
    { "cityId": "Qikiqtarjuaq", "cityName": "Qikiqtarjuaq", "lat": 67.5556, "lng": -64.0257, "nameOnMap": 9 },
    { "cityId": "Pond_Inlet", "cityName": "Pond Inlet", "lat": 72.7001, "lng": -77.9585, "nameOnMap": 6 },
    { "cityId": "Arctic_Bay", "cityName": "Arctic Bay", "lat": 73.0376, "lng": -85.1480, "nameOnMap": 6 },
    { "cityId": "Arviat", "cityName": "Arviat", "lat": 61.1078, "lng": -94.0624, "nameOnMap": 9 },
    { "cityId": "Clyde_River", "cityName": "Clyde River", "lat": 70.4764, "lng": -68.6013, "nameOnMap": 6 },
    { "cityId": "Taloyoak", "cityName": "Taloyoak", "lat": 69.5367, "lng": -93.5271, "nameOnMap": 8 },
    { "cityId": "Rankin_Inlet", "cityName": "Rankin Inlet", "lat": 62.8084, "lng": -92.0853, "nameOnMap": 6 },
    { "cityId": "Pangnirtung", "cityName": "Pangnirtung", "lat": 66.1466, "lng": -65.7012, "nameOnMap": 6 },
    { "cityId": "Cambridge_Bay", "cityName": "Cambridge Bay", "lat": 69.1169, "lng": -105.0597, "nameOnMap": 6 },
    { "cityId": "Kugaaruk", "cityName": "Kugaaruk", "lat": 68.5347, "lng": -89.8250, "nameOnMap": 7 },
    { "cityId": "Sanirajak", "cityName": "Sanirajak", "lat": 68.7727, "lng": -81.2352, "nameOnMap": 6 },
    { "cityId": "Gjoa_Haven", "cityName": "Gjoa Haven", "lat": 68.6356, "lng": -95.8497, "nameOnMap": 6 },
    { "cityId": "Cape_Smith", "cityName": "Cape Smith / Qikirtajuaq", "lat": 60.7460, "lng": -78.4601 },
    { "cityId": "Sanikiluaq", "cityName": "Sanikiluaq", "lat": 56.5408, "lng": -79.2232, "nameOnMap": 9 },
    { "cityId": "Resolute", "cityName": "Resolute", "lat": 74.6973, "lng": -94.8297, "nameOnMap": 6 },
    { "cityId": "Igloolik", "cityName": "Igloolik", "lat": 69.3725, "lng": -81.8246, "nameOnMap": 6 },
    { "cityId": "Alert", "cityName": "Alert", "lat": 82.5018, "lng": -62.3481, "nameOnMap": 7 },
    { "cityId": "Naujaat", "cityName": "Naujaat", "lat": 66.5283, "lng": -86.2447, "nameOnMap": 6 },
    { "cityId": "Eureka", "cityName": "Eureka", "lat": 79.9889, "lng": -85.9408, "nameOnMap": 7 },
    { "cityId": "Kinnagait", "cityName": "Kinnagait", "lat": 64.2304, "lng": -76.5410, "nameOnMap": 6 },
    { "cityId": "Baker_Lake", "cityName": "Baker Lake", "lat": 64.3176, "lng": -96.0220, "nameOnMap": 6 }
];

let airportYukon = [
    { "Name": "Wiley Airport", "lat": 66.4911, "lng": -136.5733, "surface": "Gravel", "elevation": "2365", "length": "2500" },
    { "Name": "Ogilvie Airport", "lat": 65.6717, "lng": -138.1211, "surface": "Gravel", "elevation": "1640", "length": "2500" },
    { "Name": "Mayo Airport", "lat": 63.615507, "lng": -135.879186, "surface": "Gravel", "elevation": "1653", "length": "4843" },
    { "Name": "McQuesten Airport", "lat": 63.6045, "lng": -137.5603, "surface": "Gravel/Turf", "elevation": "1500", "length": "2800" },
    { "Name": "Pelly Crossing Airport", "lat": 62.8385, "lng": -136.5415, "surface": "Gravel", "elevation": "1870", "length": "3305" },
    { "Name": "Minto Airport", "lat": 62.594048, "lng": -136.872544, "surface": "Turf", "elevation": "1519", "length": "3582" },
    { "Name": "Fort Selkirk Airport", "lat": 62.768, "lng": -137.3834, "surface": "Turf", "elevation": "1560", "length": "2000" },
    { "Name": "Carmacks Airport", "lat": 62.1151, "lng": -136.1925, "surface": "Gravel", "elevation": "1770", "length": "5000" },
    { "Name": "Braeburn Airport", "lat": 61.4848, "lng": -135.7764, "surface": "Gravel", "elevation": "2400", "length": "3000" },
    { "Name": "Cousins Airport", "lat": 60.8119, "lng": -135.1820, "surface": "Gravel", "elevation": "2200", "length": "3200" },
    { "Name": "Carcross Airport", "lat": 60.1748, "lng": -134.6918, "surface": "Gravel", "elevation": "2161", "length": "2200" },
    { "Name": "Erik Nielsen Whitehorse Airport", "lat": 60.7122, "lng": -135.07146, "surface": "Pavement", "elevation": "2317", "length": "9500" },
    { "Name": "Erik Nielsen Whitehorse Airport", "lat": 60.7095, "lng": -135.0674, "surface": "Pavement", "elevation": "2317", "length": "5317" },
    { "Name": "Erik Nielsen Whitehorse Airport", "lat": 60.71, "lng": -135.0644, "surface": "Pavement", "elevation": "2317", "length": "1798" },
    { "Name": "Beaver Creek Airport", "lat": 62.4075, "lng": -140.8628, "surface": "Gravel", "elevation": "2131", "length": "3745" },
    { "Name": "Chapman Airport", "lat": 64.9037, "lng": -138.2774, "surface": "Gravel", "elevation": "3100", "length": "3000" },
    { "Name": "Old Crow Airport", "lat": 67.5700, "lng": -139.8411, "surface": "Gravel", "elevation": "814", "length": "5020" },
    { "Name": "Burwash Airport", "lat": 61.3697, "lng": -139.0314, "surface": "Gravel", "elevation": "2645", "length": "5007" },
    { "Name": "Haines Junction Airport", "lat": 60.7906, "lng": -137.539706, "surface": "Gravel", "elevation": "2150", "length": "5002" },
    { "Name": "Teslin Airport", "lat": 60.1744, "lng": -132.7327, "surface": "Gravel", "elevation": "2313", "length": "5000" },
    { "Name": "Daughney Airport", "lat": 60.1030, "lng": -130.9331, "surface": "Gravel", "elevation": "3250", "length": "3000" },
    { "Name": "Watson Lake Airport", "lat": 60.1179, "lng": -128.8223, "surface": "Pavement", "elevation": "2255", "length": "5504" },
    { "Name": "Finlayson Airport", "lat": 61.69158, "lng": -130.77387, "surface": "Gravel", "elevation": "3094", "length": "1847" },
    { "Name": "Ross River Airport", "lat": 61.970135, "lng": -132.421174, "surface": "Gravel", "elevation": "2359", "length": "5113" },
    { "Name": "Twin Creeks Airport", "lat": 62.6193, "lng": -131.2701, "surface": "Gravel", "elevation": "2913", "length": "2917" },
    { "Name": "MacMillan Pass Airport", "lat": 63.1764, "lng": -130.2024, "surface": "Gravel", "elevation": "3810", "length": "4843" },
    { "Name": "Faro Airport", "lat": 62.2108, "lng": -133.3859, "surface": "Gravel", "elevation": "2351", "length": "4000" },
    { "Name": "Pine Lake Airport", "lat": 60.103000, "lng": -130.933129, "surface": "Gravel", "elevation": "3250", "length": "3000" },
    { "Name": "Mule Creek Airport", "lat": 59.7755, "lng": -136.5963, "surface": "Gravel", "elevation": "2900", "length": "2460" },
    { "Name": "Hyland Airport", "lat": 61.5241, "lng": -128.2696, "surface": "Gravel", "elevation": "2831", "length": "3297" },
    { "Name": "Dawson Airport", "lat": 64.0447, "lng": -139.1259, "surface": "Pavement", "elevation": "1215", "length": "5006" },
    { "Name": "Silver City Airport", "lat": 61.0265, "lng": -138.4110, "surface": "Gravel", "elevation": "2556", "length": "3000" }
];

let airportNWT = [
    { "Name": "TOMMY KOCHON AIRPORT", "lat": 67.02, "lng": -126.126, "surface": "Gravel", "elevation": "269.998" },
    { "Name": "PAULATUK (NORA ALIQATCHIALUK RUBEN) AIRPORT", "lat": 69.36083812, "lng": -124.07547, "surface": "Gravel", "elevation": "0.002" },
    { "Name": "RAE LAKES AIRPORT", "lat": 64.1160965, "lng": -117.3099976, "surface": "Gravel", "elevation": "218.001" },
    { "Name": "AKLAVIK AIRPORT", "lat": 68.223333, "lng": -135.005833, "surface": "Gravel", "elevation": "6.001" },
    { "Name": "FORT LIARD AIRPORT", "lat": 60.236152, "lng": -123.469778, "surface": "Gravel", "elevation": "216.001" },
    { "Name": "FORT RESOLUTION AIRPORT", "lat": 61.180248, "lng": -113.688943, "surface": "Gravel", "elevation": "158.995" },
    { "Name": "HOLMAN AIRPORT", "lat": 70.763925, "lng": -117.800115, "surface": "Gravel", "elevation": "32" },
    { "Name": "FORT PROVIDENCE AIRPORT", "lat": 61.31914, "lng": -117.606004, "surface": "Gravel", "elevation": "154.01" },
    { "Name": "HAY RIVER AIRPORT", "lat": 60.839649, "lng": -115.78462, "surface": "Pavement", "elevation": "158.996" },
    { "Name": "INUVIK (MIKE ZUBKO) AIRPORT", "lat": 68.305675, "lng": -133.479892, "surface": "Pavement", "elevation": "71.009" },
    { "Name": "FORT MCPHERSON AIRPORT", "lat": 67.407797, "lng": -134.859964, "surface": "Gravel", "elevation": "30" },
    { "Name": "FORT SIMPSON AIRPORT", "lat": 61.760379, "lng": -121.237001, "surface": "Pavement", "elevation": "171.001" },
    { "Name": "FORT SMITH AIRPORT", "lat": 60.020313, "lng": -111.961609, "surface": "Pavement", "elevation": "200.989" },
    { "Name": "NORMAN WELLS AIRPORT", "lat": 65.28225, "lng": -126.799232, "surface": "Pavement", "elevation": "65.006" },
    { "Name": "LUTSELK'E AIRPORT", "lat": 62.412232, "lng": -110.690292, "surface": "Gravel", "elevation": "171.004" },
    { "Name": "JEAN MARIE RIVER AIRPORT", "lat": 61.521398, "lng": -120.622228, "surface": "Gravel", "elevation": "139.003" },
    { "Name": "NAHANNI BUTTE AIRPORT", "lat": 61.030323, "lng": -123.388385, "surface": "Gravel", "elevation": "153.015" },
    { "Name": "SACHS HARBOUR AIRPORT", "lat": 71.994312, "lng": -125.253955, "surface": "Gravel", "elevation": "83.015" },
    { "Name": "TULITA AIRPORT", "lat": 64.909102, "lng": -125.567917, "surface": "Gravel", "elevation": "96.005" },
    { "Name": "YELLOWKNIFE AIRPORT", "lat": 62.463032, "lng": -114.442423, "surface": "Pavement", "elevation": "206.983" },
    { "Name": "TUKTOYAKTUK AIRPORT", "lat": 69.431431, "lng": -133.028386, "surface": "Gravel", "elevation": "0" },
    { "Name": "WEKWEÈTÃ¬ AIRPORT", "lat": 64.190804, "lng": -114.077002, "surface": "Gravel", "elevation": "370.622" },
    { "Name": "WHA TI AIRPORT", "lat": 63.13255, "lng": -117.242031, "surface": "Gravel", "elevation": "272.99" },
    { "Name": "WRIGLEY AIRPORT", "lat": 63.210952, "lng": -123.440071, "surface": "Gravel", "elevation": "138.002" },
    { "Name": "TROUT LAKE AIRPORT", "lat": 60.439444, "lng": -121.236667, "surface": "Gravel", "elevation": "497.004" },
    { "Name": "DELINÉ AIRPORT", "lat": 65.194022, "lng": -123.429593, "surface": "Gravel", "elevation": "180.086" },
    { "Name": "FORT GOOD HOPE AIRPORT", "lat": 66.26337, "lng": -128.606391, "surface": "Gravel", "elevation": "55.231" }
];

let airportNU = [
    { "Name": "CAMBRIDGE BAY AIRPORT", "lat": 69.1071, "lng": -105.1196, "surface": "Gravel", "length": "5076" },
    { "Name": "KUGLUKTUK AIRPORT", "lat": 67.8171, "lng": -115.1345, "surface": "Gravel", "length": "5502" },
    { "Name": "CHESTERFIELD INLET AIRPORT", "lat": 63.3465, "lng": -90.7368, "surface": "Gravel", "length": "3600" },
    { "Name": "CLYDE RIVER AIRPORT", "lat": 70.4853, "lng": -68.5126, "surface": "Gravel", "length": "3501" },
    { "Name": "ARVIAT AIRPORT", "lat": 61.0980, "lng": -94.0715, "surface": "Gravel", "length": "4004" },
    { "Name": "IGLOOLIK AIRPORT", "lat": 69.3690, "lng": -81.8171, "surface": "Gravel", "length": "4905" },
    { "Name": "GJOA HAVEN AIRPORT", "lat": 68.6327, "lng": -95.8486, "surface": "Gravel", "length": "4400" },
    { "Name": "SANIRAJAK AIRPORT", "lat": 68.7727, "lng": -81.2352, "surface": "Gravel", "length": "5410" },
    { "Name": "QIKIQTARJUAQ AIRPORT", "lat": 67.5515, "lng": -64.0266, "surface": "Gravel", "length": "3803" },
    { "Name": "WHALE COVE AIRPORT", "lat": 62.2369, "lng": -92.5976, "surface": "Gravel", "length": "3937" },
    { "Name": "PANGNIRTUNG AIRPORT", "lat": 66.1444, "lng": -65.7103, "surface": "Gravel", "length": "2920" },
    { "Name": "ARCTIC BAY AIRPORT", "lat": 73.0053, "lng": -85.0331, "surface": "Gravel", "length": "3935" },
    { "Name": "KUGAARUK AIRPORT", "lat": 68.5381, "lng": -89.7913, "surface": "Gravel", "length": "5000" },
    { "Name": "BAKER LAKE AIRPORT", "lat": 64.3044, "lng": -96.0759, "surface": "Gravel", "length": "4195" },
    { "Name": "EUREKA AIRPORT", "lat": 79.9949, "lng": -85.8420, "surface": "Gravel", "length": "4802" },
    { "Name": "IQALUIT AIRPORT", "lat": 63.7553, "lng": -68.5506, "surface": "Pavement", "length": "8605" },
    { "Name": "GRISE FIORD AIRPORT", "lat": 76.4253, "lng": -82.9072, "surface": "Gravel", "length": "1675" },
    { "Name": "POND INLET AIRPORT", "lat": 72.6952, "lng": -77.9555, "surface": "Gravel", "length": "4006" },
    { "Name": "KIMMIRUT AIRPORT", "lat": 62.8480, "lng": -69.8770, "surface": "Gravel", "length": "1899" },
    { "Name": "ALERT AIRPORT", "lat": 82.5199, "lng": -62.2606, "surface": "Gravel", "length": "5500" },
    { "Name": "RESOLUTE BAY AIRPORT", "lat": 74.7166, "lng": -94.9804, "surface": "Gravel", "length": "6504" },
    { "Name": "RANKIN INLET AIRPORT", "lat": 62.8100, "lng": -92.1026, "surface": "Pavement", "length": "6000" },
    { "Name": "SANIKILUAQ AIRPORT", "lat": 56.535981, "lng": -79.246447, "surface": "Gravel", "length": "3807" },
    { "Name": "CAPE DORSET AIRPORT", "lat": 64.2297, "lng": -76.5295, "surface": "Gravel", "length": "3988" },
    { "Name": "NAUJAAT AIRPORT", "lat": 66.5247, "lng": -86.2315, "surface": "Gravel", "length": "3400" },
    { "Name": "TALOYOAK AIRPORT", "lat": 69.5428, "lng": -93.5638, "surface": "Gravel", "length": "4014" },
    { "Name": "CORAL HARBOUR AIRPORT", "lat": 64.1938, "lng": -83.3600, "surface": "Gravel", "length": "5006" }
];

let medNU = [
    { "Name": "ST THERESE HOME", "lat": 63.3465, "lng": -90.7368 },
    { "Name": "ARVIAT HEALTH CENTRE", "lat": 61.11077865, "lng": -94.0673354 },
    { "Name": "CAMBRIDGE BAY HEALTH CENTRE", "lat": 69.1168, "lng": -105.1378 },
    { "Name": "CAPE DORSET HEALTH CENTRE", "lat": 64.232163, "lng": -76.542369 },
    { "Name": "CHESTERFIELD INLET HEALTH CENTRE", "lat": 63.3465, "lng": -90.7368 },
    { "Name": "GJOA HAVEN HEALTH CENTRE", "lat": 68.6356, "lng": -95.84975 },
    { "Name": "GRISE FIORD HEALTH CENTRE", "lat": 76.418140, "lng": -82.893389 },
    { "Name": "IGLOOLIK HEALTH CENTRE", "lat": 69.377002, "lng": -81.802331 },
    { "Name": "BAFFIN REGIONAL HOSPITAL", "lat": 63.7467, "lng": -68.517 },
    { "Name": "IQALUIT PUBLIC HEALTH UNIT", "lat": 63.7467, "lng": -68.517 },
    { "Name": "LAKE HARBOUR HEALTH CENTRE", "lat": 62.8467, "lng": -69.8692 },
    { "Name": "PANGNIRTUNG HEALTH CENTRE", "lat": 66.1395, "lng": -65.7175 },
    { "Name": "POND INLET", "lat": 72.7002, "lng": -77.9582 },
    { "Name": "REPULSE BAY HEALTH CENTRE", "lat": 66.5465, "lng": -86.1882 },
    { "Name": "SANIKILUAQ HEALTH CENTRE", "lat": 56.5392, "lng": -79.2322 },
    { "Name": "WHALE COVE HEALTH CENTRE", "lat": 62.242573, "lng": -92.602449 },
    { "Name": "KITIKMEOT HEALTH CENTRE", "lat": 69.1169, "lng": -105.1378 },
    { "Name": "COPPERMINE HEALTH CENTRE", "lat": 67.8155, "lng": -115.1524 },
    { "Name": "ARCTIC BAY HEALTH CENTRE", "lat": 73.0305, "lng": -85.1693 },
    { "Name": "BROUGHTON ISLAND HEALTH CENTRE", "lat": 67.5416, "lng": -63.8876 },
    { "Name": "CLYDE RIVER HEALTH CENTRE", "lat": 70.474274, "lng": -68.585733 },
    { "Name": "CORAL HARBOUR HEALTH CENTRE", "lat": 64.135821, "lng": -83.169275 },
    { "Name": "NANISIVIK HEALTH CENTRE", "lat": 72.9796, "lng": -84.6054 },
    { "Name": "RANKIN INLET HEALTH CENTRE", "lat": 62.815037, "lng": -92.086772 },
    { "Name": "RESOLUTE BAY HEALTH CENTRE", "lat": 74.698758, "lng": -94.831490 },
    { "Name": "TALOYOAK BAY HEALTH CENTRE", "lat": 69.5577, "lng": -93.488 }
];

let portCommuNWT = [
    { "cityName": "Hay River", "lat": 60.816199, "lng": -115.785578 },
    { "cityName": "Inuvik", "lat": 68.360650, "lng": -133.721210 },
    { "cityName": "Fort Simpson", "lat": 61.862790, "lng": -121.353062 },
    { "cityName": "Fort Good Hope", "lat": 66.255655, "lng": -128.634650 },
    { "cityName": "Aklavik", "lat": 68.219965, "lng": -135.008094 },
    { "cityName": "Tuktoyaktuk", "lat": 69.445401, "lng": -133.034298 },
    { "cityName": "Tulita", "lat": 64.903440, "lng": -125.573627 },
    { "cityName": "Sachs Harbour", "lat": 71.984968, "lng": -125.246796 },
    { "cityName": "Norman Wells", "lat": 65.281481, "lng": -126.829129 },
    { "cityName": "Paulatuk", "lat": 69.350899, "lng": -124.071101 },
    { "cityName": "Ulukhaktok", "lat": 70.736643, "lng": -117.770621 },
    { "cityName": "Lutselk\'e", "lat": 62.405451, "lng": -110.737005 }
];

// Add icons
var unpaved_airport_icon = L.icon({
    iconUrl: './airport_icon.png',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var paved_airport_icon = L.icon({
    iconUrl: './airport_icon2.png',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var hospital_icon = L.icon({
    iconUrl: './hospital.png',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var comm_icon = L.icon({
    iconUrl: './person.webp',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var port_icon = L.icon({
    iconUrl: './anchor.png',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var black_marker = L.icon({
    iconUrl: './black-marker.png',
    iconSize: [35, 42],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});
var larissa_marker = L.icon({
    iconUrl: './favicon-circle.png',
    iconSize: [35, 35],
    iconAnchor: [16, 35],
    popupAnchor: [0, -11]
});