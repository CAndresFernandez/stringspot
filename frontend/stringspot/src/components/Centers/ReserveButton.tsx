import React from "react";
import { Link } from "react-router-dom";
import { ICourt } from "../../@types/reservation";
import { useDispatch } from "react-redux";
import { setReservation } from "../../store/reducers/reservationReducer";

interface ReserveButtonProps {
  court: ICourt;
  startTime: string;
  endTime: string;
}

const ReserveButton: React.FC<ReserveButtonProps> = ({
  court,
  startTime,
  endTime,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (court && startTime && endTime) {
      dispatch(
        setReservation({ court, start_time: startTime, end_time: endTime })
      );
    } else {
      console.log("Missing reservation data.");
    }
  };

  return (
    <Link to={`/new-reservation`}>
      <button className="reserve-button button" onClick={handleClick}>
        Reserve
      </button>
    </Link>
  );
};

export default ReserveButton;
