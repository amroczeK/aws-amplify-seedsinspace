import React, { useState } from "react";
import PasswordResetRequest from "./PasswordResetRequest";
import PasswordResetConfirm from "./PasswordResetConfirm";

const ForgotPasswordStepper = ({title}) => {
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");

  const stepContent = () => {
    return {
      0: <PasswordResetRequest setStep={setStep} setUsername={setUsername} title={title} />,
      1: <PasswordResetConfirm username={username} />,
    }[step];
  };

  return stepContent();
};

export default ForgotPasswordStepper;
