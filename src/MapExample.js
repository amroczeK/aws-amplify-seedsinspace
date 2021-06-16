import { useState } from "react";
import LocationSearch from "./components/map/LocationSearch";
import LeafletMap from "./components/map/LeafletMap";

const MapExample = () => {
  const [map, setMap] = useState(null);
  const [selected, setSelected] = useState(null);

  function onSelected(value) {
    map.setView([value.lat, value.lon], 16);
    setSelected(value);
  }

  return (
    <>
      <LocationSearch onSelected={onSelected} />
      <LeafletMap selected={selected} setMap={setMap} />
    </>
  );
};

export default MapExample;
