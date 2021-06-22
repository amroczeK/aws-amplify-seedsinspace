import React, { useState, useEffect } from "react";
import { getAllSeeds } from "../../apis";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [seedData, setSeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ isError: false, message: null });
  const [earthSeedData, setEarthSeedData] = useState(null);
  const [spaceSeedData, setSpaceSeedData] = useState(null);

  useEffect(() => {
    const fetchSeedData = async () => {
      try {
        let { body } = await getAllSeeds();
        setSeedData(JSON.parse(body));
        setLoading(false);
        setError({ isError: false, message: null });
      } catch (error) {
        console.log(error);
        setError({ isError: true, message: error.message });
      }
    };

    if (!seedData?.length) {
      setLoading(true);
      fetchSeedData();
    }
  }, [seedData]);

  const values = {
    seedData,
    loading,
    error,
    earthSeedData,
    setEarthSeedData,
    spaceSeedData,
    setSpaceSeedData,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
