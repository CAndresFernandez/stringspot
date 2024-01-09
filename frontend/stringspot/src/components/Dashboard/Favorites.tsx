import React from "react";

const Favorites = () => {
  return (
    <div className="row dashboard-wrapper">
      <div className="row favorites-wrapper">
        <h4 className="h4-dark spacious-table-header">
          Favorite Sports Centers
        </h4>
        <table className="table table-hover table-custom">
          <thead>
            <tr className="table-columns">
              <th scope="col" className="col-4">
                Center Name
              </th>
              <th scope="col" className="col-2">
                City
              </th>
              <th scope="col" className="col-1">
                Postal Code
              </th>
              <th scope="col" className="col-2">
                Actions
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

export default Favorites;
