import React from "react";

const DotList = ({ items = [] }) => {
  return (
    <ul className="dot-list">
      {items.map((item, idx) => (
        <li key={idx} className="dot-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
};

export default DotList;