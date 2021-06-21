import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

const LeafletMap = ({ mapData, setMap, selected }) => {
  const mapStyles = {
    height: 600,
    margin: "1em",
  };

  const defaultCenter = [-25.25, 133.4166]; // Middle of Australia

  return (
    <MapContainer
      zoom={4}
      scrollWheelZoom={true}
      center={defaultCenter}
      whenCreated={setMap}
      style={mapStyles}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selected && <GeoJSON key={selected.place_id} data={selected.geojson} />}
      <Marker position={defaultCenter}>
        <Popup>Custom Link goes here</Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;
