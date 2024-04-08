import API from "axios";
import { useSelector } from "react-redux";
import { ReservationRootState } from "../../store/reducers/reservationReducer";
import { useEffect } from "react";

const NewReservation = () => {
  const court = useSelector((state: ReservationRootState) => state.court);
  const startTime = useSelector(
    (state: ReservationRootState) => state.start_time
  );
  const endTime = useSelector((state: ReservationRootState) => state.end_time);

  useEffect(() => {
    console.log("Court:", court);
    console.log("Start time:", startTime);
    console.log("End time:", endTime);
  });

  return <div></div>;
};

export default NewReservation;
