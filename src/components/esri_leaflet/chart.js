function returnChart(stationNum, chartData) {
    var fdd = new CanvasJS.Chart("chartContainer" + stationNum, {
        animationEnabled: true,
        theme: "light2",
        /* title: {
            text: "Freezing Degree Days 0 hmg"
        }, */
        axisX: {
            title: "Year",
            gridThickness: 1,
            tickLength: 10
        },
        axisY: {
            title: "FDD",
            gridThickness: 1,
            tickLength: 10,
            valueFormatString: "####"
        },
        data: [{
                type: "line",
                name: "",
                showInLegend: true,
                indexLabelFontSize: 16,
                xValueFormatString: "YYYY",
                dataPoints: window["ChartData" + stationNum],
                toolTipContent: "Year: {x}, FDD: {y} "
            },
            {
                type: "spline",
                name: "",
                showInLegend: true,
                indexLabelFontSize: 16,
                xValueFormatString: "YYYY",
                dataPoints: window["lowessData" + stationNum],
                markerType: "none",
                toolTipContent: null
            }
        ]
    });
    return fdd;
}

window.onload = setTimeout(function() {
    /* yellowknife, whitehorse, iqaluit, 
    dawson, mayo, carmacks, faro, teslin, watson lake, 
    fort mcpherson, fort good hope, fort simpson, fort liard, hay river, fort smith*/
    var stationNum = [
        "2204101", "2101310", "2402592",
        "2100LRP", "2100701", "2100301", "2100518", "2101102", "2101204",
        "2201601", "2201450", "2202102", "2201579", "2202402", "2202202"
    ];
    for (let i = 0; i < stationNum.length; i++) {
        returnChart(stationNum[i]).render();
    }
}, 5000)