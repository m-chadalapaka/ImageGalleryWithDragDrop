import React, { memo } from "react";
import { useDrop } from "react-dnd";

import { Card, CardActionArea, CardMedia, makeStyles } from "@material-ui/core";


// Custom styling
const style = {
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  border: "ridge darkgray",
};

const useStyles = makeStyles({
  root: {
    maxWidth: 100,
    maxHeight: 100
  },
});

export const DropZone = memo(function DropZone({
  accept,
  lastDroppedItem,
  droppedImgs,
  onDrop,
}) {
  const classes = useStyles();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = isOver && canDrop;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "darkgreen"; // When the background turns green, then it is ready to accept the image
  } else if (canDrop) {
    backgroundColor = "darkkhaki"; 
  }
  return (
    <div
      ref={drop}
      role="DropZone"
      style={{ ...style, backgroundColor, display: "flex", flexWrap:"wrap", width: "100%", height:"100%" }}
    >
        {/* Adding the dropped images to collection and to display in the drop zone */}
      {droppedImgs.map((img, idx) => (
        <Card className={classes.root} key={idx}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={img}
              alt={idx}
              style={{ width: 100, height: 100, margin: 5 }}
            />
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
});
