import React from "react";
import { useSelector } from "react-redux";
import { ResponsiveBar } from "@nivo/bar";
import { outOfServiceSelectors } from "../../../ducks/outOfServices";
import theme from "./theme";
import { qualitative as palette } from "../colours";
import ChartContainer from "./ChartContainer";

const OutOfServiceChart = ({ start, end }) => {
  const outOfServices = useSelector((state) =>
    outOfServiceSelectors.selectOutOfServiceHoursForPeriod(state, start, end)
  );

  return (
    <ChartContainer title="Plant Downtime">
      <ResponsiveBar
        data={outOfServices}
        theme={theme}
        colors={palette[3]}
        keys={["downtime"]}
        indexBy="name"
        tooltipFormat={(value) => `${value} hours`}
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

export default OutOfServiceChart;
