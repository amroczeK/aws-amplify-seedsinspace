import { useState, useEffect } from "react";
import * as API from "../../apis";
import Graph from "./Graph";
import Table from "./Table";
import Alert from "@material-ui/lab/Alert";

const SchoolData = ({ schoolSub }) => {
  const [seedData, setSeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const queryHandler = async sub => {
    setLoading(true);
    let req = { Pk: sub };
    let data = await API.getUsersSeeds(req).catch(error => {
      console.log(error?.message);
      setError({ message: error?.message });
    });
    if (data) {
      setSeedData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    queryHandler(schoolSub);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {error?.message && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error.message}
        </Alert>
      )}
      <Graph data={seedData} loading={loading} />
      <Table data={seedData} loading={loading} error={error} />
    </>
  );
};

export default SchoolData;
