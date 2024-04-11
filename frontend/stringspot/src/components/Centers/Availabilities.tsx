import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import { ICenter } from "../../@types/center";
import { ICourt } from "../../@types/court";
import Accordion from "./Accordion";

const Availabilities: React.FC<{ timestamp: number }> = ({ timestamp }) => {
  const [center, setCenter] = useState<ICenter>();
  const centerId = useParams().centerId;
  const [courts, setCourts] = useState<ICourt[]>([]);

  useEffect(() => {
    API.get(`centers/${centerId}`).then((res) => {
      const responseCenter = res.data;
      if (center === undefined) {
        setCenter(responseCenter);
        const courts = responseCenter.courts;
        setCourts(courts);
      }
    });
  });

  return (
    <>
      {center &&
        courts.map((court) => (
          <Accordion
            court={court}
            startDate={timestamp}
            center={center}
            key={court.id}
          />
        ))}
    </>
  );
};

export default Availabilities;
