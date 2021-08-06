import React, { useState } from "react";
import LeafletMap from "../map/LeafletMap";
import SchoolsTable from "./SchoolsTable";

const Schools = ({ schools, setSelectedSchool, setStep }) => {
  const [coordinates, setCoordinates] = useState([]);
  
  const handleSchoolClick = index => {
    setSelectedSchool(schools[index]);
    setStep(1);
  };

  const handleRowClick = ({ Lat, Lon }) => {
    if (Lat && Lon) {
      setCoordinates([Lat, Lon]);
    }
  };

  return (
    <>
      <LeafletMap
        mapData={schools}
        handlePopupClick={handleSchoolClick}
        coordinates={coordinates}
      />
      <p>
        Select the school name hovered over the marker to navigate to school profile and
        data.
      </p>
      <SchoolsTable
        data={schools}
        error={false}
        loading={false}
        handleRowClick={handleRowClick}
      />
    </>
  );
};

export default Schools;
