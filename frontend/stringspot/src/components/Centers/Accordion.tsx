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
      {isActive && <div className="accordion-content">content</div>}
    </div>
  );
};

export default Accordion;
