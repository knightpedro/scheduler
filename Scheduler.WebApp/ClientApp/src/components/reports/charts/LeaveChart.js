import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";
import { leaveSelectors } from "../../../ducks/leave";
import theme from "./theme";
import { qualitative as palette } from "../colours";
import ChartContainer from "./ChartContainer";

const LeaveChart = ({ start, end }) => {
  const workerLeaveTaken = useSelector((state) =>
    leaveSelectors.selectLeaveTakenForPeriod(state, start, end)
  );
  return (
    <ChartContainer title="Staff Leave">
      <ResponsiveBar
        data={workerLeaveTaken}
        theme={theme}
        colors={palette[2]}
        keys={["leave"]}
        indexBy="name"
        tooltipFormat={(value) => `${value} days`}
        margin={{ top: 30, right: 20, bottom: 120, left: 60 }}
        padding={0.3}
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
          legend: "Days",
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

export default LeaveChart;
