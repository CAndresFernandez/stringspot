import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useAppSelector } from "../../hooks/redux";
import { getFromLocalStorage } from "../../localStorage/localStorage";
import { IUser } from "../../@types/user";

function Profile() {
  const [user, setUser] = useState<IUser>();
  const storeUser = getFromLocalStorage("auth");

  useEffect(() => {
    API.get(`users/${storeUser?.id}`, {
      headers: { Authorization: `Bearer ${storeUser?.token}` },
    }).then((res) => {
      const user = res.data;
      setUser(user);
    });
  });

  // todo: write these handleClick functions for editing a user and deleting an account
  const handleClickEdit = () => {};

  const handleClickDelete = () => {};

  return (
    <div className="row dashboard-wrapper">
      <div className="row acct-info-wrapper">
        <h4 className="h4-dark options-table-header">Account Information</h4>
        <table className="table table-hover acct-info-table-custom">
          <tbody>
            <tr>
              <th scope="row" className="col-4">
                First Name
              </th>
              <td className="td col-8">{user?.first_name}</td>
            </tr>
            <tr>
              <th scope="row" className="col-4">
                Last Name
              </th>
              <td className="td col-8">{user?.last_name}</td>
            </tr>
            <tr>
              <th scope="row" className="col-4">
                E-mail address
              </th>
              <td className="td col-8">{user?.email}</td>
            </tr>
            <tr>
              <th scope="row" className="col-4">
                Password
              </th>
              <td className="td col-8">********</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="options-wrapper">
        <ul className="options-list">
          <li className="options-list-item">
            <a className="options-link link-edit">Edit account information</a>
          </li>
          <li className="options-list-item">
            <a className="options-link link-delete">Delete account</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Profile;
