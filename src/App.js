import React, { useState, useCallback } from "react";
import _ from "lodash";

import { DndProvider } from "react-dnd";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { NativeTypes, HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { CircularProgress, Typography, AppBar, Toolbar, Container, makeStyles, Box} from "@material-ui/core";

// Custom components
import { DropZone } from "./components/DropZone";
import useFetchDebounce from "./components/useFetchDebounce";
import ImageGallery from "./components/ImageGallery";


const PUBLIC_API_KEY = "dc6zaTOxFJmzC"; // Giphy API public beta key

export const ItemTypes = {
  Image: "image",
};

const App = () => {

  // Dropzone accepts image type 
  const [dropzone, setDropzone] = useState([
    {
      accepts: [ItemTypes.Image, NativeTypes.URL],
      lastDroppedItem: null,
    },
  ]);

  // List of dropped images dropped into the collection
  const [droppedImgs, setDroppedImgs] = useState([]);

  function isDropped(imgName) {
    return droppedImgs.indexOf(imgName) > -1;
  }

  // Utility function to handle the drag drop functionality
  const handleDrop = useCallback(
    (index, item) => {
      const name = item.urls[0];
      if (!isDropped(name)) {
        setDroppedImgs([...droppedImgs, name]);
      } else {
        console.log("Image already dropped!!");
      }

      console.log("droppedImgs ", droppedImgs);

      setDropzone(
        update(dropzone, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedImgs, dropzone]
  );

  const [results, setResults] = useState([]); // List of images fetched from the giphy fetch api
  
  // List of variables to indicate the fetch status
  const [isLoading, setIsLoading] = useState(false); // Api is still fetching
  const [isError, setIsError] = useState(false); // Api errored out
  const [isFetchSuccess, setIsFetchSuccess] = useState(false); // Fetch is successful

  let fetchGifs;

  // This method gets triggered on change of the search input
  const onChange = (searchItem) => {
    if (!_.isEmpty(searchItem)) {
      const giphyFetch = new GiphyFetch(PUBLIC_API_KEY); // Using Public beta key

      setIsLoading(true);
      // Offset: Specifies the starting position of the results.
      // Limit: The maximum number of objects to return.

      // invoke the giphy api with search item, offset and limit
      fetchGifs = giphyFetch.search(searchItem, { offset: 0, limit: 15 }); 
      

      // Trigger the api call 
      fetchGifs
        .then((res) => {
          // Success response
          console.log("Fetched gifs => ", res.data);
          // Set the results returned by the fetch
          setResults(res.data);
          setIsFetchSuccess(true);
          setIsLoading(false);
          setIsError(false);
        })
        .catch((err) => {
          // Error handling scenario
          console.log("Error fetching gifs: ", err);
          setIsError(true);
          setIsLoading(false);
        });
    }
  };


  // Debounced fetch makes search requests efficient by avoiding multiple calls being made as user types in each letter, 
  // instead waits for the user to finish typing and then triggers the search api
  
  const debounceOnChange = useCallback(useFetchDebounce(onChange, 700), []);

  return (
    /*Create an area to search and display images from giphy api*/
    <DndProvider backend={HTML5Backend}>
      <AppBar>
      <Toolbar>
          <Typography variant="h6">Giphy Image Gallery With Drag And Drop</Typography>
        </Toolbar>
     </AppBar>
        
        <Container>
        <Box my={15} color="text.primary" >

          <div style={{ justifyContent: "center" }}>
            {/* Input text element for entering in search term to search the giphy api */}
            <span> Image Search : </span>
            <input
              placeholder="Search for an image..."
              onChange={(e) => debounceOnChange(e.target.value)} // debounced search 
            ></input>
          </div>
          <div>
            {/* Error handling scenarios for fetch */}
            {isError && <label style={{ color: 'red', fontSize:17 }}> Error fetching gifs </label> }
            {isLoading && <CircularProgress size={20}/>}
            {isFetchSuccess && <ImageGallery images={results}> </ImageGallery>}
          </div>
          <h2> Drag Into the Dropzone </h2>
          <div style={{ clear: "both" }}>
            {dropzone.map(({ accepts, lastDroppedItem }, index) => (
              // Drop zone that accepts images and adds them to collection
              <DropZone
                accept={accepts}
                lastDroppedItem={lastDroppedItem}
                droppedImgs={droppedImgs}
                onDrop={(item) => handleDrop(index, item)}
                key={index}
              ></DropZone>
            ))}
          </div>
          </Box>
        </Container>
    </DndProvider>
  );
};

export default App;
