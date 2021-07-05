import { useState, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";

let typingTimer;

const ResultContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 4px;
  &:hover {
    background-color: rgb(224 223 223 / 30%);
  }
`;

const LocationSearch = ({ onSelected, defaultValue }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const handleKeyChange = e => {
    clearTimeout(typingTimer);
    if (e.target.value) {
      setLoading(true);
      typingTimer = setTimeout(search, 2000);
    } else setLoading(false);

    setSearchResults([]);
  };

  function search() {
    const searchUrl = new URL("https://nominatim.openstreetmap.org/search.php");
    searchUrl.searchParams.append("q", searchRef.current.value);
    searchUrl.searchParams.append("countrycodes", "au"); //Use this to restrict locations
    searchUrl.searchParams.append("polygon_geojson", 1);
    searchUrl.searchParams.append("addressdetails", 1);
    searchUrl.searchParams.append("format", "jsonv2");
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => setSearchResults(data))
      .catch(console.error);
    setLoading(false);
  }

  const mappedResults = () => {
    if (searchResults.length !== 0) {
      const mappedData = searchResults.map((value, index) => {
        const [name, ...location] = value.display_name.split(",");
        return (
          <ResultContainer
            key={value.place_id}
            onClick={() => {
              onSelected(value);
            }}
          >
            <p style={{ fontWeight: "bold" }}>{name}</p>
            <p>location: {location}</p>
          </ResultContainer>
        );
      });
      return mappedData;
    }
  };

  return (
    <>
      <TextField
        style={{ display: "flex" }}
        id="location search"
        variant="outlined"
        defaultValue={defaultValue}
        inputRef={searchRef}
        onKeyUp={handleKeyChange}
        InputProps={{
          endAdornment: (
            <>{loading ? <CircularProgress color="inherit" size={20} /> : null}</>
          ),
        }}
      />
      {mappedResults()}
    </>
  );
};

export default LocationSearch;
