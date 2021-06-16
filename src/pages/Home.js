import { useState, useEffect, useContext } from "react";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  lineAndScatterPlot,
  dataLabelsHover,
  groupedBars,
  stackedBars,
} from "../components/charts/chartMockData";
import { S3BucketContext } from "../components/context/S3Bucket";
import { UserContext } from "../components/context/User";
import { API, Auth } from "aws-amplify";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0.5),
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);

  const classes = useStyles();

  const lineChart = lineAndScatterPlot();
  const dataLabelChart = dataLabelsHover();
  const groupedBarsChart = groupedBars();
  const stackedBarsChart = stackedBars();

  const { fetchProfileImage } = useContext(S3BucketContext);
  const { userData, loggedIn } = useContext(UserContext);

  const getProfileImage = async () => {
    console.log(userData);
    try {
      let profileImageURL = await fetchProfileImage({
        path: "AME Swirl Colour.png",
        level: "private", // Retrieve profile image from users private folder
      });
      console.log(profileImageURL);
      setProfileImage(profileImageURL);
    } catch (error) {
      console.log(error);
    }
  };

  // Set user profile image on component mount if authenticated
  useEffect(() => {
    if (loggedIn && userData) {
      getProfileImage();
    }
    // eslint-disable-next-line
  }, []);

  const callAPI = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    console.log({ token });

    // const requestInfo = {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     Authorization: token,
    //   },
    // };
    try {
      const data = await API.get("SeedsAPI", "/seeds", {});
      console.log({ data });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Container maxWidth="xl">
      <h1>HOME</h1>
      <button onClick={callAPI}>API CALL</button>
      <img src={profileImage} alt="profile" />
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...lineChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...dataLabelChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...groupedBarsChart} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...stackedBarsChart} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Home;
