import React, { useEffect, useState } from "react";
import { ICourt, IReservation } from "../../@types/reservation";
import API from "axios";
import { Link } from "react-router-dom";

interface TimeSlot {
  startTime: Date;
  endTime: Date;
}

const generateTimeSlots = (): TimeSlot[] => {
  const timeSlots: TimeSlot[] = [];
  const startHour = 8;
  const endHour = 21;

  for (let hour = startHour; hour <= endHour; hour++) {
    const startTime = new Date();
    startTime.setHours(hour);

    const endTime = new Date();
    endTime.setMinutes(59);

    timeSlots.push({
      startTime,
      endTime,
    });
  }

  return timeSlots;
};

const Accordion: React.FC<{
  court: ICourt;
  startDate: number;
  centerId: number;
}> = ({ court, startDate, centerId }) => {
  const [isActive, setIsActive] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await API.get(`reservations`, {
          params: { centerId, startDate },
        });
        if (response.data["hydra:member"] !== undefined) {
          setReservations(response.data["hydra:member"]);
        }
      } catch (error) {
        console.error("Error fetching reservations", error);
      }
    };
    fetchReservations();
  });

  useEffect(() => {
    const timeSlots = generateTimeSlots();
    const availableSlots = timeSlots.filter(
      (slot) =>
        !reservations.some(
          (reservation) =>
            reservation.startTime.getTime() === slot.startTime.getTime()
        )
    );
    setAvailableSlots(availableSlots);
  }, [reservations]);

  const onClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onClick}>
        <div>
          Court {court.number} - {court.type.toUpperCase()}
        </div>
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
        <ul>
          {availableSlots.map((slot, index) => (
            <li className="accordion-content-item" key={index}>
              <p>{slot.startTime.getHours()}h</p>
              <Link to={`/reservation`}>
                <button type="submit" className="reserve-button button">
                  Reserve
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
