import React, { useState } from "react";
import Schools from "./Schools";
import ParticipantProfile from "./ParticipantProfile";

const StepperContent = ({ schools, loading, error }) => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [step, setStep] = useState(0);

  const stepContent = () => {
    return {
      0: <Schools schools={schools} setSelectedSchool={setSelectedSchool} setStep={setStep} loading={loading} error={error} />,
      1: <ParticipantProfile school={selectedSchool} setStep={setStep} />,
    }[step];
  };

  return stepContent();
};

export default StepperContent;
