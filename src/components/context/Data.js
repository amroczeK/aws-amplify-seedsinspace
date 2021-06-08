import React, { useState, useEffect } from "react";

export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [earthSeedData, setEarthSeedData] = useState(null);
  const [spaceSeedData, setSpaceSeedData] = useState(null);

  useEffect(() => {}, []);

  const values = {
    earthSeedData,
    setEarthSeedData,
    spaceSeedData,
    setSpaceSeedData,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
