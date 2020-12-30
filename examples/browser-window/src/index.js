import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import { useVirtualWindow } from "react-virtual";

function App() {
  return (
    <div>
      <p>
        Rather than using an element for scrolling this uses the window object
        to control the scrolling.
      </p>
      <br />
      <br />
      <h3>Rows</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '500px 500px' }}>
        <RowVirtualizerWindow />
      </div>
    </div>
  );
}

function RowVirtualizerWindow() {
  const parentRef = React.useRef();
  const windowRef = React.useRef(window);

  const rowVirtualizer = useVirtualWindow({
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => 35, []),
    overscan: 5,
    windowRef,
  });

  return (
    <>
      <div
        className="List"
        style={{
          width: `400px`,
        }}
        ref={parentRef}
      >
        <div
          style={{
            height: `${rowVirtualizer.totalSize}px`,
            width: "100%",
            position: "relative"
          }}
        >
          {rowVirtualizer.virtualItems.map(virtualRow => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`
              }}
            >
              Row {virtualRow.index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
