import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
  GeoJSON,
} from "react-leaflet";
const defaultCenter = [-25.25, 133.4166]; // Middle of Australia

function SetViewOnClick() {
  const map = useMapEvent("click", e => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });

  return null;
}

const LeafletMap = () => {
  const [map, setMap] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  console.log({ searchResult });
  console.log({ map });

  const handleClick = () => {
    const url = `https://nominatim.openstreetmap.org/search.php?q=Nareena%20Hills&polygon_geojson=1&format=jsonv2`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setSearchResult(data);
        map.setView([data[0].lat, data[0].lon], 17);
      })
      .catch(console.log);
  };

  return (
    <>
      <button onClick={handleClick}>FETCH DATA</button>
      {searchResult ? <p>{searchResult[0].display_name}</p> : <p>Nothing</p>}
      <MapContainer
        center={defaultCenter}
        zoom={4}
        scrollWheelZoom={true}
        whenCreated={setMap}
        style={{ height: 600, margin: "1em" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchResult ? (
          <GeoJSON key={searchResult[0].place_id} data={searchResult[0].geojson} />
        ) : null}
        <Marker position={defaultCenter}>
          <Popup>Custom Link goes here</Popup>
        </Marker>
        <SetViewOnClick />
      </MapContainer>
    </>
  );
};

export default LeafletMap;
