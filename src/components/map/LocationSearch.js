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
  const [location, setLocation] = useState(); // This is turning the uncontrolled text field into a controlled component (fine, but maybe no necessary)
  const searchRef = useRef(null); // searchRef is currently used to store the value in the text field, use this with update.

  const handleKeyChange = e => {
    clearTimeout(typingTimer);
    if (e.target.value) {
      setLoading(true);
      typingTimer = setTimeout(search, 2000);
    } else setLoading(false);

    setSearchResults([]);
  };

  // You're capturing multiple events and doing different things with them
  // which is a little dangerous, consider whether you need this
  // const handleChange = e => {
  //   setLocation(e.target.value);
  // };

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
    // .finally() use me!
    setLoading(false);
  }

  /**
   * This function should:
   * 1. Pass value back to the onSelected callback
   * 2. Set the value of the text field (look at using the ref that is passed, try console.log searchRef.current)
   * 3. Remove the results list to stop it showing
   * @param {*} value used to pass back to onSelected and to set the text field value (value.display_name)
   */

  // function onResultSelection (value) {}
  // const onResultSelection = (value) => {}

  const mappedResults = () => {
    if (searchResults.length !== 0) {
      const mappedData = searchResults.map((value, index) => {
        const [name, ...location] = value.display_name.split(",");
        return (
          <ResultContainer
            key={value.place_id}
            onClick={() => {
              // Split this into a seperate function, see above
              onSelected(value);
              setSearchResults([]);
              setLocation(value.display_name);
              setLoading(false);
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
        inputRef={searchRef} // Can we use this?? We can... haha
        value={location} // By explicitly setting value we're making this a controlled component. Do we need to do this?
        // onChange={handleChange} // We're already capturing the key event below
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
