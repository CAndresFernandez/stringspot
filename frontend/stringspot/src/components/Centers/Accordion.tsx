import React, { useState } from "react";

const Accordion: React.FC<{ title: string }> = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        {/* <div>{title}</div> */}
        <div>court number</div>
        <div className="chev-wrapper">
          {isActive ? (
            <i className="fa-solid fa-chevron-up fa-sm"></i>
          ) : (
            <i className="fa-solid fa-chevron-down fa-sm"></i>
          )}
        </div>
      </div>
      <div
        className={`accordion-content ${isActive ? "expanded" : "collapsed"}`}
      >
        <p>available slots</p>
      </div>
    </div>
  );
};

export default Accordion;
