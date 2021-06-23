import { useState, useEffect, useContext } from "react";
import Plotly from "../components/charts/Plotly";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MultiSelect from "../components/selects/MultiSelect";
import ClearFiltersBtn from "../components/inputs/Button";
import {
  lineAndScatterPlot,
  dataLabelsHover,
  groupedBars,
  stackedBars,
} from "../components/charts/chartMockData";
import { DataContext } from "../components/context/Data";
import { S3BucketContext } from "../components/context/S3Bucket";
import { UserContext } from "../components/context/User";
import { getChartData } from "../components/charts/PlotlyAdaptor";
import styled from "styled-components";

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

const selections = [
  "All Seeds",
  "Type",
  "Height",
  "Leaf Count",
  "Leaf Length",
  "Leaf Width",
  "Leaf Colour",
];

const Home = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(["All Seeds"]);

  const classes = useStyles();

  const lineChart = lineAndScatterPlot();
  const dataLabelChart = dataLabelsHover();
  const groupedBarsChart = groupedBars();
  const stackedBarsChart = stackedBars();

  const { seedData, loading, error } = useContext(DataContext);
  const { fetchProfileImage } = useContext(S3BucketContext);
  const { userData, loggedIn } = useContext(UserContext);

  const selecedFiltesrHandler = event => {
    setSelectedFilters(event.target.value);
  };

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

  return (
    <Container maxWidth="xl">
      <h1>HOME</h1>
      <img src={profileImage} alt="profile" />
      <div className={classes.root}>
        <SelectContainer>
          <MultiSelect
            title={"Seed Filters"}
            selections={selections}
            selectedFilters={selectedFilters}
            onChange={selecedFiltesrHandler}
          />
          <ClearFiltersBtn
            title={"Clear"}
            onClickHandler={() => {
              setSelectedFilters(["All Seeds"]);
            }}
          />
        </SelectContainer>
        <Paper className={classes.paper}>
          <Plotly {...getChartData({ type: "scatter", data: seedData })} />
        </Paper>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <Plotly {...getChartData({ type: "scatter", data: seedData })} />
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
        </Grid> */}
      </div>
    </Container>
  );
};

export default Home;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
`;
