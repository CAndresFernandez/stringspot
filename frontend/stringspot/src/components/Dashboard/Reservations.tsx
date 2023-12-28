import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { IUser } from "../../@types/user";

const Reservations = () => {
  const [user, setUser] = useState<IUser>();
  const storeUser = getFromLocalStorage("auth");

  useEffect(() => {
    if (storeUser?.id && storeUser?.token) {
      API.get(`users/${storeUser?.id}`, {
        headers: { Authorization: `Bearer ${storeUser?.token}` },
      }).then((res) => {
        const user = res.data;
        setUser(user);
      });
    }
  }, [storeUser?.id, storeUser?.token]);

  return (
    <div className="row dashboard-wrapper">
      <div className="row res-active-wrapper">
        <h4 className="h4-dark res-table-header">Active Reservations</h4>
        <table className="table table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th scope="col" className="col-2">
                Date
              </th>
              <th scope="col" className="col-1">
                Time
              </th>
              <th scope="col" className="col-4">
                Center
              </th>
              <th scope="col" className="col-2">
                Court
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-row">
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
          </tbody>
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
