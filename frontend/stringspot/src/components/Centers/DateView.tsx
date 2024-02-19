import React from "react";
import DateSelect from "./DateSelect";

type DateViewProps = {
  city: string;
};

const DateView: React.FC<DateViewProps> = ({ city }) => {
  return (
    <>
      <DateSelect city={city} />
    </>
  );
};

export default DateView;
