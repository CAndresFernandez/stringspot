import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { getFromLocalStorage } from "../../localStorage/localStorage";

const NewReservation = () => {
  const { court, center, startTime, endTime } = useSelector(
    (state: RootState) => state.reservation
  );
  const [formattedStartTime, setFormattedStartTime] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");
  const navigate = useNavigate();
  const storeUser = getFromLocalStorage("auth");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (court === undefined) {
      navigate(`/`);
    }

    if (startTime) {
      const dateTime = new Date(startTime);
      setFormattedStartTime(dateTime.getHours().toLocaleString());
      setFormattedDate(dateTime.toLocaleDateString());
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
  }, [court, startTime, endTime, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    try {
      const response = await API.post(
        `reservations`,
        {
          start_time: startTime,
          end_time: endTime,
          res_type: "user",
          active: true,
          court: `/api/courts/${court?.id}`,
          user: `/api/users/${storeUser.id}`,
        },
        {
          headers: { "Content-Type": "application/ld+json" },
        }
      );

      console.log("reservation created", response.data);

      if (response.status === 201) {
        setSuccessMessage("Reservation confirmed!");
      }
    } catch (error) {
      console.log("error creating reservation", error);
      setError("Couldn't confirm the reservation. Please try again");
    }
  };

  return (
    <div className="main-box">
      <form onSubmit={handleSubmit}>
        <div className="res-conf">
          <h4 className="h4-dark">Reservation Confirmation</h4>
          <p>Center: {center?.name}</p>
          <p>
            Address: {center?.address},{" "}
            {center?.zone?.city + " " + center?.zone?.post_code}
          </p>
          <p>Court: {court?.number}</p>
          <p>Date: {formattedDate}</p>
          <p>Time: {formattedStartTime}h</p>
          <button className="res-conf-button button" onClick={handleSubmit}>
            Confirm Reservation
          </button>
          <div className="form-success-wrapper">
            <label className="form-success-label">{successMessage}</label>
          </div>
          <div className="form-error-wrapper">
            <label className="form-error-label">{error}</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewReservation;
