import {useEffect,useRef, useState} from 'react';
import loadData from './MapFunctions';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadModules } from "esri-loader";
import "./styles.css"
import {
  mapLinks,
  northWestCoordinates,
  nunavutCoordinates,
  yukonCoordinates,
} from "./Data.js";

function WeatherMap() {
    const weatherData = useRef(null);
    const MapElement = useRef(null);
    const [territory,setTerritory] = useState(null);
    const [key, setKey] = useState(null);

    // State to control modal visibility
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    useEffect(() => {
      loadData(weatherData,MapElement);
    },[]);

    // Function to close the modal
    function closeModal() {
      setModalIsOpen(false);
    }

    return (
      <div style={{ height: "84vh", border: "none" }} ref={MapElement}>
        <Modal
          show={modalIsOpen}
          onHide={closeModal}
          size="lg"
          dialogClassName="right-half-modal"
          end
        >
          <Modal.Header closeButton>
            <Modal.Title> Weather</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <iframe
              title="Environment Canada Weather"
              width="450"
              height="285"
              src={`https://weather.gc.ca/wxlink/wxlink.html?cityCode=${territory}-${key}&amp;lang=e`}
              allowtransparency="true"
            ></iframe>
          </Modal.Body>
         
        </Modal>
      </div>
    );

    function loadData(weatherData,MapElement) {
  
  loadModules(
    [
      "esri/views/MapView",
      "esri/layers/FeatureLayer",
      "esri/layers/GraphicsLayer",
      "esri/Map",
      "esri/config",
      "esri/Graphic",
      "esri/widgets/Popup",
      "esri/PopupTemplate",
    ],
    {
      css: true,
    }
  ).then(([MapView, FeatureLayer, GraphicsLayer, Map, esriConfig, Graphic, Popup, PopupTemplate]) => {
    esriConfig.apiKey =
      "AAPK523b3670e87d4504aa86c87ef22885f8B2U9Y_GAGwSmQV3HOq8d7NqRWn09tIR1BIMKvA6lf3581mq2wW2RuKOxPy75ccle";
    const map = new Map({ basemap: "arcgis-topographic" });
    const view = new MapView({
      container: MapElement.current,
      map: map,
      center: [-110, 68.027],
      zoom: 4.5,
    });
    
    async function createCityGraphic(coordinates, color, layer) {

      const pinCoordinates = {
        type: "point",
        longitude: coordinates[1],
        latitude: coordinates[0],
      };

      let newPointGraphic = new Graphic({
        symbol: {
          type: "simple-marker",
          color: color,
          size: "5px",
        },
        geometry: pinCoordinates,
        attributes: {
          cityName: "City Name",
          weatherDetails: "Weather Details",
        }
      });
      liveWeatherDataLayer.add(newPointGraphic);

      view.on("click", (event) => {
        let uniqueKey = -1,
          territory = null;
        const clickedPoint = event.mapPoint;
        const latitude = clickedPoint.latitude,
        longitude = clickedPoint.longitude;

        Object.keys(yukonCoordinates).every((yukonKey) => {
        if (
          isWithinRange(
            yukonCoordinates[yukonKey][1],
            longitude - 0.07,
            longitude + 0.07
          ) &&
          isWithinRange(
            yukonCoordinates[yukonKey][0],
            latitude - 0.07,
            latitude + 0.07
          )
        ) {
          uniqueKey = yukonKey;
          territory = "yt";
          return false;
        }
          return true;

        });

        Object.keys(northWestCoordinates).every((northKey) => {
          if(northKey===1 || northKey===24){
            if (
            isWithinRange(
              northWestCoordinates[northKey][1],
              longitude - 0.01,
              longitude + 0.01
            ) &&
            isWithinRange(northWestCoordinates[northKey][0], latitude - 0.01, latitude + 0.01)
          ) {
            uniqueKey = northKey;
            territory = "nt";
            return false
          }}
          else if (
            isWithinRange(
              northWestCoordinates[northKey][1],
              longitude - 0.07,
              longitude + 0.07
            ) &&
            isWithinRange(northWestCoordinates[northKey][0], latitude - 0.07, latitude + 0.07)
          ) {
            uniqueKey = northKey;
            territory = "nt";
          return false;
          }
          return true;

        });

        Object.keys(nunavutCoordinates).every((nunavutKey) => {
          if (
            isWithinRange(
              nunavutCoordinates[nunavutKey][1],
              longitude - 0.07,
              longitude + 0.07
            ) &&
            isWithinRange(
              nunavutCoordinates[nunavutKey][0],
              latitude - 0.07,
              latitude + 0.07
            )
          ) {
            uniqueKey = nunavutKey;
            territory = "nu";
            return false;
          }
          return true;
        });
        console.log(latitude);
        console.log(longitude);
         setKey((prevKey) => uniqueKey);
         console.log(uniqueKey);
         setTerritory((prevTerritory) => territory);
         setModalIsOpen(true);
         if(territory==null){
          setModalIsOpen(false);
         }
      });

    }

    

    mapLinks.map((link) => {
      const featureLayer = new FeatureLayer(
        {url: link} , // Specify the URL of the feature layer
      );
      map.add(featureLayer);
      }
    );
    
    //////////INSERT SWOB REAL TIME SCRIPT HERE
          const graphicsLayer = new GraphicsLayer();
          map.add(graphicsLayer);
          let url = `https:api.weather.gc.ca/collections/swob-realtime/items?&f=json`;
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              let snowDepth,
                airTemp,
                relativeHumidity,
                avgWindSpeed,
                retrievedTime,
                lastUpdatedTime;
              let newPointGraphic;
              weatherData.current = data.features;
              const popupTemplate = new PopupTemplate({
                title: "Station X",
                content: "<b>Air Temperature:</b> {airTemperature}",
              });
              weatherData.current.forEach((item) => {
                let coordinates = {
                  type: "point",
                  longitude: item.geometry.coordinates[0],
                  latitude: item.geometry.coordinates[1],
                };
                if (coordinates.latitude > 60) {
                  newPointGraphic = new Graphic({
                    symbol: {
                      type: "simple-marker",
                      color: "red",
                      size: "5px",
                    },
                    geometry: coordinates,
                    attributes: {
                      name: "New Point",
                      type: "Sample",
                    },
                    popupTemplate: popupTemplate,
                  });

                  graphicsLayer.add(newPointGraphic);
                }
              });

              //Gives instructions on what the point does when it is clicked
              view.popup = new Popup({ view: view });
              view.on("click", (event) => {
                const clickedPoint = event.mapPoint;
                const latitude = clickedPoint.latitude,
                  longitude = clickedPoint.longitude;

                //determines which point was clicked based on the coordiantes of the clicked point
                weatherData.current.forEach((item) => {
                  if (
                    isWithinRange(
                      item.geometry.coordinates[0],
                      longitude - 2,
                      longitude + 2
                    ) &&
                    isWithinRange(
                      item.geometry.coordinates[1],
                      latitude - 2,
                      latitude + 2
                    )
                  ) {
                    //retrieves the clicked point's information
                    snowDepth = item.properties.snw_dpth;
                    airTemp = item.properties.air_temp;
                    relativeHumidity = item.properties.rel_hum;
                    avgWindSpeed = item.properties.avg_wnd_spd_10m_pst1hr;
                    retrievedTime = new Date(item.properties["date_tm-value"]);
                    lastUpdatedTime = retrievedTime.toLocaleString();
                    newPointGraphic.popupTemplate.title = `Weather Details at ${item.properties["stn_nam-value"]}`;
                    //Modifies the popup template with the relevant information
                    newPointGraphic.popupTemplate.content = `<b>Snow Depth:</b> ${snowDepth}cm <br> <br>
                                                 <b>Air Temperature:</b> ${airTemp} °C <br><br>
                                                 <b>Relative Humidity:</b> ${relativeHumidity}% <br><br>
                                                 <b>Average Wind Speed:</b> ${avgWindSpeed} km/h <br><br>
                                                 <b>Last Updated:</b> ${lastUpdatedTime}<br><br> `;
                  }
                });
              });
            });
    

    const liveWeatherDataLayer = new GraphicsLayer();
    map.add(liveWeatherDataLayer);

    Object.keys(yukonCoordinates).forEach((key)=>{
      createCityGraphic(yukonCoordinates[key], "blue", liveWeatherDataLayer);
    });

    Object.keys(northWestCoordinates).forEach((key) => {
      createCityGraphic(northWestCoordinates[key], "blue", liveWeatherDataLayer);
    });
    Object.keys(nunavutCoordinates).forEach((key) => {
      createCityGraphic(nunavutCoordinates[key], "blue", liveWeatherDataLayer);
    });

    

      

});
}

function isWithinRange(number, min, max) {
return number >= min && number <= max;
}


}


export default WeatherMap;
