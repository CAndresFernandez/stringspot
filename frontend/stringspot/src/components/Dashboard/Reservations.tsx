import React from "react";

const Reservations = () => {
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
          <tbody>
            <tr className="table-row">
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr className="table-row">
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
            <tr className="table-row">
              <td>a</td>
              <td>b</td>
              <td>c</td>
              <td>d</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
