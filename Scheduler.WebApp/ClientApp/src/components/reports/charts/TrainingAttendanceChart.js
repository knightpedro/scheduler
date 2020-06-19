import React from "react";
import { useSelector } from "react-redux";
import { workerTrainingSelectors } from "../../../ducks/training";
import { ResponsiveBar } from "@nivo/bar";
import theme from "./theme";
import { qualitative as palette } from "../colours";
import ChartContainer from "./ChartContainer";

const TrainingAttendanceChart = ({ start, end }) => {
  const workerTrainingHours = useSelector((state) =>
    workerTrainingSelectors.selectTrainingHoursForPeriod(state, start, end)
  );

  return (
    <ChartContainer title="Staff Training">
      <ResponsiveBar
        data={workerTrainingHours}
        theme={theme}
        colors={palette[1]}
        keys={["training"]}
        indexBy="name"
        margin={{ top: 30, right: 20, bottom: 120, left: 60 }}
        padding={0.3}
        tooltipFormat={(value) => `${value} hours`}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Hours",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        enableLabel={false}
      />
    </ChartContainer>
  );
};

export default TrainingAttendanceChart;
