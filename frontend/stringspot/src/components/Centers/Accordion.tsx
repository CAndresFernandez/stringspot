import React, { useState } from "react";

const Accordion: React.FC<{ title: string }> = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        <div>{title}</div>
        <div>{isActive ? "-" : "+"}</div>
      </div>
      <div
        className={`accordion-content ${isActive ? "expanded" : "collapsed"}`}
      >
        <p>content</p>
      </div>
    </div>
  );
};

export default Accordion;
