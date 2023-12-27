import React from "react";

function Reservations() {
  return (
    <div className="row dashboard-wrapper">
      <div className="row res-active-wrapper">
        <h4 className="h4-dark table-header">Reservations</h4>
        <table className="table table-custom">
          <thead className="thead-dark">
            <tr className="table-columns">
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Center</th>
              <th scope="col">Court</th>
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
        <h4 className="h4-dark table-header">Past Reservations</h4>
        <table className="table table-striped table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th>Date</th>
              <th>Time</th>
              <th>Center</th>
              <th>Court</th>
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
}

export default Reservations;
