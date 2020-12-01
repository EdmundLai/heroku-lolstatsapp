import React from "react";
import { Line } from "react-chartjs-2";
import ArrayUtil from "../../utils/array";
import DataUtil from "../../utils/data";
import GraphUtil from "../../utils/graph";
import "./StatsGraph.css";

class StatsGraph extends React.Component {
  render() {
    const playerTimelineData = this.props.statsObj.timelineData
      .playerTimelineData;
    // console.log(this.props.statsObj.timelineData);
    // console.log(timeline);
    const gameStats = this.props.statsObj.playerStats;
    const gameLength = this.props.statsObj.gameLength;
    const dataForGraphs = DataUtil.processTimelineData(playerTimelineData);

    const avgXpPerMin = DataUtil.calculateAvgXpPerMin(
      playerTimelineData,
      gameLength
    );

    const deltasData = DataUtil.calculateDeltasPerMin(dataForGraphs);

    // let xpData = {
    //   labels: dataForGraphs.time,
    //   datasets: [{
    //     label: "Experience",
    //     fill: false,
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: dataForGraphs.xp,
    //   }]
    // }

    // let goldData = {
    //   labels: dataForGraphs.time,
    //   datasets: [{
    //     label: "Total Gold",
    //     fill: false,
    //     backgroundColor: 'rgb(255, 99, 132)',
    //     borderColor: 'rgb(255, 99, 132)',
    //     data: dataForGraphs.totalGold,
    //   }]
    // }

    const gpmAvgArray = ArrayUtil.fillArray(
      deltasData.timeDeltas.length,
      gameStats.goldPerMin
    );
    const xppmAvgArray = ArrayUtil.fillArray(
      deltasData.timeDeltas.length,
      avgXpPerMin
    );

    function createDataObject(
      normalDataTitle,
      normalData,
      averageDataTitle,
      averageData
    ) {
      return {
        labels: deltasData.timeDeltas,
        datasets: [
          GraphUtil.createNormalDataSet(normalDataTitle, normalData),
          GraphUtil.createAverageDataSet(averageDataTitle, averageData),
        ],
      };
    }

    const xpDeltaData = createDataObject(
      "Experience Per Min",
      deltasData.xpDeltas,
      "Experience Per Minute Average",
      xppmAvgArray
    );

    const goldDeltaData = createDataObject(
      "Gold Per Min",
      deltasData.goldDeltas,
      "Gold Per Minute Average",
      gpmAvgArray
    );

    const goldChartOptions = GraphUtil.createChartOptions("Gold Per Min");
    const expChartOptions = GraphUtil.createChartOptions("EXP Per Min");

    let displayedGraph;

    if (this.props.type === "gold") {
      displayedGraph = <Line data={goldDeltaData} options={goldChartOptions} />;
    } else {
      displayedGraph = <Line data={xpDeltaData} options={expChartOptions} />;
    }

    return <div className="StatsGraph">{displayedGraph}</div>;
  }
}

export default StatsGraph;
