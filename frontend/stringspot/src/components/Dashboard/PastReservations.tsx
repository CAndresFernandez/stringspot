import React from "react";

function PastReservations() {
  return (
    <div className="row reservations">
      <h4>Past reservations</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Center</th>
            <th>Court</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>21/3</td>
            <td>15:00</td>
            <td>Philippe Auguste</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PastReservations;
