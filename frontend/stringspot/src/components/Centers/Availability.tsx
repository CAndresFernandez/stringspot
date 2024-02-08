import React from "react";
import DateSelect from "./DateSelect";

type AvailabilityProps = {
  city: string;
};

const Availability: React.FC<AvailabilityProps> = ({ city }) => {
  return (
    <>
      <DateSelect city={city} />
      <div className="availabilities-wrapper"></div>
    </>
  );
};

export default Availability;
