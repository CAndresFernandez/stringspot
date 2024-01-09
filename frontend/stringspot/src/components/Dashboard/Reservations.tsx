import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { IUser } from "../../@types/user";
import { IReservation } from "../../@types/reservation";

const Reservations = () => {
  const [user, setUser] = useState<IUser>();
  const storeUser = getFromLocalStorage("auth");
  const [reservation, setReservation] = useState<IReservation>();
  //   const [formattedStartTime, setFormattedStartTime] = useState("");

  useEffect(() => {
    if (storeUser) {
      const fetchData = async () => {
        try {
          API.get(`users/${storeUser?.id}`).then((res) => {
            const user = res.data;
            if (user && user.reservation) {
              setUser(user);
              setReservation(user.reservation);
            }
            //   const startTime = user.reservation.startTime;
            //   const dateObject = startTime ? new Date(startTime.date) : null;
            //   const formattedStartTime = dateObject
            //     ? dateObject.toLocaleString()
            //     : "N/A";
            //   setFormattedStartTime(formattedStartTime);
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
        <h4 className="h4-dark res-table-header">Active Reservations</h4>
        <table className="table table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th scope="col" className="col-2">
                Date/Time
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
                {/* <td>{formattedStartTime}</td> */}
                <td></td>
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
        <h4 className="h4-dark res-table-header">Past Reservations</h4>
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
