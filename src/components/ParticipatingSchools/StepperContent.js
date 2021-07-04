import React, { useState } from "react";
import LeafletMap from "../map/LeafletMap";
import ParticipantProfile from "./ParticipantProfile";

const StepperContent = ({ schools }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [step, setStep] = useState(0);

  const handleSchoolClick = index => {
    setSelectedSchool(schools[index]);
    setStep(1);
  };

  const stepContent = () => {
    return {
      0: <LeafletMap mapData={schools} handlePopupClick={handleSchoolClick} />,
      1: <ParticipantProfile school={selectedSchool} setStep={setStep} />,
    }[step];
  };

  return stepContent();
};

export default StepperContent;
