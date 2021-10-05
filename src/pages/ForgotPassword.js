import Container from "@material-ui/core/Container";
import ResetPasswordStepper from "../components/ForgotPassword"

const PasswordReset = ({title}) => {
  return (
    <Container>
      <ResetPasswordStepper title={title}/>
    </Container>
  );
};

export default PasswordReset;