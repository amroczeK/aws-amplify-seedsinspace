import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const LeafletMap = ({ mapData, handlePopupClick }) => {
  const [mapView, setMapView] = useState(null);

  const mapStyles = {
    height: 600,
  };

  const defaultCenter = [-25.25, 133.4166]; // Middle of Australia

  const setNewMap = map => {
    setMapView(map);
  };

  return (
    <MapContainer
      zoom={3}
      scrollWheelZoom={true}
      center={defaultCenter}
      whenCreated={setNewMap}
      style={mapStyles}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.map((entry, index) => {
        if (entry.lat && entry.lon && entry.name) {
          return (
            <Marker
              riseOnHover
              key={index}
              position={[parseFloat(entry.lat), parseFloat(entry.lon)]}
              eventHandlers={{
                click: e => {
                  e.target.openPopup();
                  mapView.setView([entry.lat, entry.lon], 16);
                },
                mouseover: e => e.target.openPopup(),
              }}
            >
              <Popup>
                <Button
                  style={{ textTransform: "none" }}
                  onClick={() => handlePopupClick(index)}
                >
                  {entry.name}
                </Button>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default LeafletMap;
