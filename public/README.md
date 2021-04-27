Description:
This is a Web application built using ReactJS, giphy api, react hooks, react-dnd, material UI. The main idea of this UI is to allow the users search for gifs using giphy fetch api and to add them to coll.

UI Layout:
The UI is built to provide the following input elements:
1. Input to enter search term
2. Image gallery to display the fetched collection of search results.
3. Drop zone to drag and drop the selected images from the gallery to collection
4. UI is responsive and is created to work well on both browser and mobile devices


Implementation details as per the acceptance criteria:

1. Used the giphy api using the public beta key
2. To make the search efficient, created a custom debounce functionality to trigger the api after the user finishes searching instead of making multiple calls while the user keep typing
3. Since the @giphy/react-components Carousel component didn't work as expected with the debounced fetch, I created a custom image gallery and customized the look and feel and make use of most of the space available on UI. 
4. Populated the gallery with the fetched results.
5. Used Offset to Specify the starting position of the results and Limit to specify the maximum number of objects to 
   return.
6. Utilised provided react dnd library for implementing drag drop functionality to drag the images to the drop zone and 
   add them to the collection.
7. Used styling to inform the user when the image is to be dropped(khaki background) and when the image drop is active 
   green background)
8. Used flex layout and material UI components for a better user experience and to provide responsive styling.    
9. Error Handling: Application provides a way to gracefully handle errors by maintaining the state of fetch:
    Fetch is progress is indicating by a loading indicator, succesful Data Fetch displays the images in the gallery and Data Fetch failure displays an error message in red.
10. Duplicate drag and drop is restricted on the drop zone.



Working Screenshots:

Please refer to the Working-Screenshots folder for different scenarios

