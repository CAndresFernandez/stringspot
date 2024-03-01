import React from "react";
import { Link } from "react-router-dom";

interface CenterLinkProps {
  centerId: number;
}

const CenterLinkButton: React.FC<CenterLinkProps> = ({ centerId }) => {
  return (
    <Link to={`/centers/${centerId}`}>
      <button className="reserve-button button">Reserve</button>
    </Link>
  );
};

export default CenterLinkButton;
