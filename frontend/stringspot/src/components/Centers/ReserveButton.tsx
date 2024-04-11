import React from "react";
import { ICourt } from "../../@types/court";
import { useDispatch } from "react-redux";
import { setReservation } from "../../store/reducers/reservationReducer";
import { ICenter } from "../../@types/center";

interface ReserveButtonProps {
  court: ICourt;
  center: ICenter;
  startTime: string;
  endTime: string;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({
  court,
  center,
  startTime,
  endTime,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (court && center && startTime && endTime) {
      dispatch(
        setReservation({
          court,
          center,
          startTime: startTime,
          endTime: endTime,
        })
      );
    } else {
      console.log("Missing reservation data.");
    }
  };

  return (
    <button className="reserve-button button" onClick={handleClick}>
      Reserve
    </button>
  );
};

export default ReserveButton;
