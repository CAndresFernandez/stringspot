import React from "react";

function Preferences() {
  return (
    <div className="row prefs">
      <h4>Account Settings</h4>
      <div className="acct-info">
        <table className="table table-hover">
          <tbody>
            <tr>
              <th scope="col" className="col-1">
                First Name
              </th>
              <td></td>
            </tr>
            <tr>
              <th scope="col" className="col-1">
                Last Name
              </th>
              <td></td>
            </tr>
            <tr>
              <th scope="col" className="col-1">
                E-mail address
              </th>
              <td></td>
            </tr>
            <tr>
              <th scope="col" className="col-1">
                Password
              </th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="options">
        <ul className="prefs-list">
          <li className="prefs-list-item">Edit Account information</li>
          <li className="prefs-list-item">Delete account</li>
        </ul>
      </div>
    </div>
  );
}

export default Preferences;
