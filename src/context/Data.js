import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [seedData, setSeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [graphTitle, setGraphTitle] = useState(null);

  const location = useLocation();

  // Reset seedData on route/location change to prevent data loaded on another page e.g. Community profile
  // appearing on the Dashboard page and vice versa
  useEffect(() => {
    setSeedData([]);
    // eslint-disable-next-line
  }, [location]);

  const values = {
    seedData,
    setSeedData,
    loading,
    setLoading,
    error,
    setError,
    graphTitle,
    setGraphTitle,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
