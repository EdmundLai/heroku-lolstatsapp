import React from "react";
import DataUtil from "../../utils/data";
import GraphUtil from "../../utils/graph";
import { Line } from "react-chartjs-2";

import "./GoldDiffContainer.css";

function GoldDiffContainer(props) {
  const teamGoldData = DataUtil.getTeamGoldData(props.currGameObj);

  // console.log(teamGoldData);

  let timeArr = [];
  let goldDiffArr = [];

  for (let minute = 0; minute < teamGoldData.goldDiff.length; minute++) {
    timeArr.push(minute);
    goldDiffArr.push(teamGoldData.goldDiff[minute]);
  }

  let goldDiffDataset = {
    labels: timeArr,
    datasets: [GraphUtil.createNormalDataSet("Gold difference", goldDiffArr)],
  };

  const lineOptions = {
    responsive: true,
  };

  const goldDiffContainer = (
    <div className="GoldDiffContainer">
      <h2>Gold Difference</h2>
      <Line data={goldDiffDataset} options={lineOptions} />
    </div>
  );

  return goldDiffContainer;
}

export default GoldDiffContainer;
