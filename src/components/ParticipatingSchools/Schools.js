import React, { useState } from "react";
import LeafletMap from "../map/LeafletMap";
import SchoolsTable from "./SchoolsTable";
import styled from "styled-components";

const Schools = ({ schools, setSelectedSchool, setStep, loading = false, error = false }) => {
  const [coordinates, setCoordinates] = useState([]);

  const handleViewProfileClick = school => {
    setSelectedSchool(school);
    setStep(1);
  };

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
      <Content>
        <p>We have over 250 participating groups from all around Australia, including primary schools, high schools and scout groups.</p>
        <p>
          Zoom in to the map to take a look at the participating groups. You can click on their marker to see their seed data, or alternatively, you
          can click “View Profile” in the table below.
        </p>
      </Content>
      <LeafletMap mapData={schools} handlePopupClick={handleSchoolClick} coordinates={coordinates} />
      <p>Select the group name to see the group’s profile and their seed data.</p>
      <SchoolsTable data={schools} error={error} loading={loading} handleRowClick={handleRowClick} handleViewProfileClick={handleViewProfileClick} />
    </>
  );
};

export default Schools;

const Content = styled.div`
  p {
    white-space: wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 1000px;
  }
`;
