import {useEffect,useRef, useState} from 'react';
import loadData from './MapFunctions';
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadModules } from "esri-loader";
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
        <Modal show={modalIsOpen} onHide={closeModal} size="lg" centered>
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
          <Modal.Footer>
            <button variant="secondary" onClick={closeModal}>
              Close
            </button>
          </Modal.Footer>
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
        let uniqueKey = -1, territory = null;

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
          if (
            isWithinRange(
              northWestCoordinates[northKey][1],
              longitude - 0.01,
              longitude + 0.01
            ) &&
            isWithinRange(northWestCoordinates[northKey][0], latitude - 0.01, latitude + 0.01)
          ) {
            console.log(northKey);
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

    

    // mapLinks.map((link) => {
    //   const featureLayer = new FeatureLayer(
    //     {url: link} , // Specify the URL of the feature layer
    //   );
    //   map.add(featureLayer);
    //   }
    // );
    
    //////////INSERT SWOB REAL TIME SCRIPT HERE

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
