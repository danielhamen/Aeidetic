import React, { ComponentProps, useState } from "react";

export interface ResizeHandleProps extends ComponentProps<"div"> {
  /** Direction that the handle should be placed */
  orientation?: "horizontal" | "vertical";

  /** Additional padding around the handle that the cursor can grab */
  padding?: number;

  /** Size of the handle */
  size?: number;
}

export function ResizeHandle({
  orientation = "horizontal",
  padding = 4,
  size = 4,
  ...props
}: ResizeHandleProps) {
  const [actualSize] = useState(size + padding * 2);
  const [grabbing, setGrabbing] = useState(false);
  return (
    <div
      {...props}
      style={{
        ...(orientation === "vertical"
          ? {
              minWidth: actualSize,
              width: actualSize,
              maxWidth: actualSize,
              height: "100%",
            }
          : {
              minHeight: actualSize,
              height: actualSize,
              maxHeight: actualSize,
              width: "100%",
            }),
        display: "flex",
        ...props.style,
      }}
      onMouseDown={(e) => {
        setGrabbing(true);
      }}
      onMouseUp={(e) => {
        setGrabbing(false);
      }}
    >
      {/* Actual handle */}
      <div
        style={{
          width: "100%",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          // position: "relative",
          cursor: grabbing ? "grabbing" : "grab",
          // left: padding,
        }}
      >
        <div
          className="bg-gray-300"
          style={{ minWidth: size, width: size, maxWidth: size, flexGrow: 1 }}
        ></div>
      </div>
    </div>
  );
}
