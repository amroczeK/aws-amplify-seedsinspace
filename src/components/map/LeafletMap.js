import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";

const LeafletMap = ({ mapData, handlePopupClick, coordinates }) => {
  const [mapView, setMapView] = useState(null);

  const mapStyles = {
    zIndex: 1,
    marginTop: "1rem",
    height: 600,
    borderRadius: 10,
  };

  const defaultCenter = [-25.25, 133.4166]; // Middle of Australia

  const setNewMap = map => {
    setMapView(map);
  };

  useEffect(() => {
    if (Array.isArray(coordinates) && coordinates.length && mapView?.setView) {
      mapView.setView(coordinates, 16);
    }
  }, [coordinates, mapView]);

  return (
    <>
      <MapContainer zoom={3} scrollWheelZoom={true} center={defaultCenter} whenCreated={setNewMap} style={mapStyles}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData?.map((entry, index) => {
          if (entry.Lat && entry.Lon && entry.SchoolName) {
            return (
              <Marker
                riseOnHover
                key={index}
                position={[parseFloat(entry.Lat), parseFloat(entry.Lon)]}
                eventHandlers={{
                  click: e => {
                    e.target.openPopup();
                    mapView.setView([entry.Lat, entry.Lon], 16);
                  },
                  mouseover: e => e.target.openPopup(),
                }}
              >
                <Popup>
                  <Button style={{ textTransform: "none" }} onClick={() => handlePopupClick(index)}>
                    {entry.SchoolName}
                  </Button>
                </Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
