import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams } from "react-router-dom";
import { ICenter } from "../../@types/center";
import "../../styles/center.css";
import { IZone } from "../../@types/zone";

function CenterPage() {
  const centerId = useParams().centerId;
  const [center, setCenter] = useState<ICenter>();
  const [zone, setZone] = useState<IZone>();

  useEffect(() => {
    API.get(`centers/${centerId}`).then((res) => {
      const responseCenter = res.data;
      if (center === undefined && zone === undefined) {
        setCenter(responseCenter);
        setZone(responseCenter.zone);
      }
    });
  });

  return (
    <>
      <div className="main-box">
        <h4 className="h4-dark standard-table-header">{center?.name}</h4>
        <div className="center-wrapper">
          <div className="half-wrapper left">
            <p className="res-block-header">Reserve</p>
          </div>
          <div className="half-wrapper right">
            <div className="content-box img">
              <img
                src="../src/assets/tenniscourtimg.jpeg"
                alt="center image"
                className="court-img"
              />
            </div>
            <div className="content-box text">
              <table className="table table-hover">
                <tbody>
                  <tr>
                    <th scope="row" className="col-4">
                      Address
                    </th>
                    <td className="td col-8">{center?.address}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Postal Code
                    </th>
                    <td className="td col-8">{zone?.post_code}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      City
                    </th>
                    <td className="td col-8">{zone?.city}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Country
                    </th>
                    <td className="td col-8">{zone?.country.name}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      # of Courts
                    </th>
                    <td className="td col-8">{center?.number_courts}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="col-4">
                      Courts
                    </th>
                    <td>
                      <table>
                        <tbody>
                          {center?.courts.map((court) => (
                            <>
                              <tr>
                                <td className="td col-6">
                                  Court {court.number}:
                                </td>
                                <td className="td col-6">
                                  {court.type.toUpperCase()}
                                </td>
                              </tr>
                            </>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CenterPage;
