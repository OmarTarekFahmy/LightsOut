import React from "react";

function Cell({ className, flipFunc }) {
  return (
    <td
      className={className}
      onClick={(e) => {
        flipFunc();
      }}
    ></td>
  );
}

export default Cell;
