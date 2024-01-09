import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { IUser } from "../../@types/user";
import { IReservation } from "../../@types/reservation";
import { DateTime } from "luxon";

const Reservations = () => {
  const storeUser = getFromLocalStorage("auth");
  const [user, setUser] = useState<IUser>();
  const [reservation, setReservation] = useState<IReservation>();
  const [formattedResDate, setFormattedResDate] = useState("");
  const [formattedResTime, setFormattedResTime] = useState("");
  //   const [formattedPastResDate, setFormattedPastResDate] = useState("");
  //   const [formattedPastResTime, setFormattedPastResTime] = useState("");

  useEffect(() => {
    if (user === undefined || reservation === undefined) {
      const fetchData = async () => {
        try {
          API.get(`users/${storeUser?.id}`).then((res) => {
            const userResponse = res.data;
            if (user === undefined) {
              setUser(userResponse);
              if (userResponse.reservation && userResponse.reservation) {
                setReservation(userResponse.reservation);
              }
            }
            const startTime = DateTime.fromISO(
              userResponse.reservation.start_time
            );
            const formattedResDate = startTime.toLocaleString(
              DateTime.DATE_SHORT
            );
            setFormattedResDate(formattedResDate);
            const formattedResTime = startTime.toLocaleString(
              DateTime.TIME_SIMPLE
            );
            setFormattedResTime(formattedResTime);
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  });

  return (
    <div className="row dashboard-wrapper">
      <div className="row res-active-wrapper">
        <h4 className="h4-dark standard-table-header">Active Reservations</h4>
        <table className="table table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th scope="col" className="col-2">
                Date
              </th>
              <th scope="col" className="col-2">
                Time
              </th>
              <th scope="col" className="col-4">
                Center
              </th>
              <th scope="col" className="col-1">
                Postal Code
              </th>
              <th scope="col" className="col-1">
                City
              </th>
            </tr>
          </thead>
          {reservation ? (
            <tbody>
              <tr className="table-row">
                <td>{formattedResDate}</td>
                <td>{formattedResTime}</td>
                <td>{reservation.court.center.name}</td>
                <td>{reservation?.court.center.zone?.post_code}</td>
                <td>{reservation?.court.center.zone?.city}</td>
              </tr>
            </tbody>
          ) : (
            ""
          )}
        </table>
      </div>
      <div className="row res-past-wrapper">
        <h4 className="h4-dark standard-table-header">Past Reservations</h4>
        <table className="table table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th className="col-2">Date</th>
              <th className="col-1">Time</th>
              <th className="col-4">Center</th>
              <th className="col-2">Court</th>
            </tr>
          </thead>
          {user?.pastRes
            ? user.pastRes.map((pastRes) => (
                <tbody>
                  <tr className="table-row">
                    <td>{pastRes.date}</td>
                    <td>{pastRes.time}</td>
                    <td>{pastRes.center}</td>
                    <td>{pastRes.court}</td>
                  </tr>
                </tbody>
              ))
            : ""}
        </table>
      </div>
    </div>
  );
};

export default Reservations;
