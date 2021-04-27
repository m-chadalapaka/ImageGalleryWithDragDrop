import React, { memo } from "react";
import { useDrag } from "react-dnd";

// Custom styling

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};

// Using React memo to improve the user interface performance

// Custom Component to handle the useDrag functionality of react-dnd

export const DraggableGifImage = memo(function DraggableGifImage({
  name: url, // Url of the image to be dragged
  type, // Type is Image
  isDropped, // Flag to indicated if this is already dropped
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name: url },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [url, type]
  );
  return (
    <div ref={drag} role="DraggableGifImage" style={{ ...style, opacity }}>
      {isDropped ? <s>{url}</s> : url}
    </div>
  );
});
