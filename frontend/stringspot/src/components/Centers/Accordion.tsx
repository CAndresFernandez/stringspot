import React, { useEffect, useState } from "react";
import { IReservation } from "../../@types/reservation";
import API from "axios";
import { Link } from "react-router-dom";
import ReserveButton from "./ReserveButton";
import { ICourt } from "../../@types/court";
import { ICenter } from "../../@types/center";

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
    startTime.setHours(hour, 0, 0);

    const endTime = new Date();
    endTime.setHours(hour, 59, 59);

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
  center: ICenter;
}> = ({ court, startDate, center }) => {
  const [isActive, setIsActive] = useState(false);
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    const centerId = center.id;
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

  const onAccordionClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={onAccordionClick}>
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
              <Link to={`/new-reservation`}>
                <ReserveButton
                  court={court}
                  center={center}
                  startTime={slot.startTime.toISOString()}
                  endTime={slot.endTime.toISOString()}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Accordion;
