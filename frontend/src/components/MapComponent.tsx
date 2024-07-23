import { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent: React.FC<{ latitude: number; longitude: number }> = ({
  latitude,
  longitude,
}) => {
  const position = [latitude, longitude];

  return (
    <MapContainer
      center={position as LatLngExpression}
      zoom={13}
      style={{ height: "300px", width: "90%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position as LatLngExpression}>
        <Popup>
          Latitude: {latitude} <br />
          Longitude: {longitude}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
