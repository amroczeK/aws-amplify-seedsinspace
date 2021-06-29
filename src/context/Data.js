import { useState, useEffect, createContext } from "react";
import { getAllSeeds } from "../apis";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [seedData, setSeedData] = useState([]);

  // useEffect(() => {
  //   const fetchSeedData = async () => {
  //     try {
  //       let { body } = await getAllSeeds();
  //       setSeedData(JSON.parse(body));
  //       setLoading(false);
  //       setError(null);
  //     } catch (error) {
  //       console.log(error);
  //       setError({ message: error });
  //     }
  //   };

  //   if (seedData?.length === 0) {
  //     setLoading(true);
  //     fetchSeedData();
  //   }
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (seedData?.length) console.log(seedData);
  }, []);

  const values = {
    seedData,
    setSeedData,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
