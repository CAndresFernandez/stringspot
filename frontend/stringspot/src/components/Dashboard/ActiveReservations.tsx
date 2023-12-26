import React from "react";

function ActiveReservations() {
  return (
    <div className="row reservations">
      <h4>Active reservations</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Zone</th>
            <th># of Courts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>a</td>
            <td>b</td>
            <td>c</td>
            <td>d</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ActiveReservations;
