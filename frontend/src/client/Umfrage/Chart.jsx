import React, { Component, useState } from "react";
import { useEffect } from "react";
import Chart from "react-apexcharts";
import Tooltip from "../_components/common/tooltip";
import { chartConfig, getUmfrageResult } from "./umfrageServices";

const ApexChart = (props) => {
  const [config, setConfig] = useState(chartConfig);
  const [participants, setParticipants] = useState(chartConfig);

  useEffect(() => {
    getParticipants();
  }, [props]);

  const getParticipants = async () => {
    const response = await getUmfrageResult();

    setParticipants(() => {
      return response.data.length;
    });
  };
  return (
    <div id="chart" className="w-75 mx-auto">
      {/* <p> {participants}</p> */}
      <Tooltip
        text={`Aktuell haben ${participants} Teilnehmer an der Umfrage teilgenommen, es wird jeweils der Ø-Wert nach Frage berechnet.`}
      />
      <Chart
        options={config.options}
        series={props.resultFragen}
        type="polarArea"
      />
    </div>
  );
};

export default ApexChart;
