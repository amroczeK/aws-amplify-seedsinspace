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
      <h1>Our community</h1>
      <p>
        We have over 250 participating groups from all around Australia, including primary
        schools, high schools and scout groups.
      </p>
      <p>
        Zoom in to the map to take a look at the participating groups and their seed data.
      </p>
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
