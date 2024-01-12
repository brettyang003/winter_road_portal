function myFunction(id) {
    if (id == "myDropdown") {
        document.getElementById('myDropdown').classList.toggle("hide");
    } else {
        document.getElementById('legends').classList.toggle("hide");
        document.getElementById("openbtn").classList.toggle("hide");
        document.getElementById("closebtn").classList.toggle("hide");
    }

}

function setLayerHelper(id) {
    setLayer(id);
    if (document.getElementById(id).checked == true) {
        document.getElementById(id).checked = false;
    } else {
        document.getElementById(id).checked = true;
    }
}

function removePOI() {
    if (document.getElementById("poiA").checked == true) {
        setLayerHelper("poiA");
    }
}

function removeData() {
    if (document.getElementById("real_time_data").checked == true) {
        setLayerHelper("real_time_data");
    }
}

var menuTF = [false, false, false, false, false, false, false, false, false, false, false, false];

function toSub(index) {
    var menuID = ['basemap', 'road', 'other_trail', 'data', 'airport', 'healthcare', 'communities', 'poi', 'boundaries', 'skdata', 'satellite', 'railways'];
    var menuName = [' Basemap Gallery', ' Roads', ' Themed Routes', ' Climate Data', ' Airport', ' Medical Services', ' Port Communities', ' Points of Interest', ' Others', ' SkNOWLEDGE Collective Data', ' Satellite Views', ' Railways'];
    if (menuTF[index] == false) {
        document.getElementById(menuID[index] + 'btn').innerHTML = '&#x25BC;' + menuName[index];
        menuTF[index] = true;
    } else {
        document.getElementById(menuID[index] + 'btn').innerHTML = '&#x25B2;' + menuName[index];
        menuTF[index] = false;
    }
    document.getElementById(menuID[index]).classList.toggle("hide");
}

function hideId(id) {
    document.getElementById(id).classList.toggle("hide");
}

function showLarissa() {
    document.getElementById("synopsis").classList.toggle("hide");

}