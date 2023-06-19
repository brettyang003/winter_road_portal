import {useEffect,useRef} from 'react';
import loadData from './MapFunctions';
function WeatherMap() {
    const weatherData = useRef(null);
    const MapElement = useRef(null);
    
    useEffect(() => {
      loadData(weatherData,MapElement)
    });

    return (
      <div style={{ height: "84vh", border: "none" }} ref={MapElement}>
        {" "}
      </div>
    );
}

export default WeatherMap;
