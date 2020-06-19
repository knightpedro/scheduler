import React from "react";
import { useSelector } from "react-redux";
import { coordinatorsSelectors } from "../../../ducks/coordinators";
import { ResponsiveBar } from "@nivo/bar";
import theme from "./theme";
import { qualitative as palette } from "../colours";
import ChartContainer from "./ChartContainer";

const CoordinatorWorkLoadChart = ({ start, end }) => {
  const coordinators = useSelector((state) =>
    coordinatorsSelectors.selectWorkLoadsForPeriod(state, start, end)
  );

  return (
    <ChartContainer title="Coordinator Workload">
      <ResponsiveBar
        data={coordinators}
        theme={theme}
        colors={palette[0]}
        keys={["jobs"]}
        indexBy="name"
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
          legend: "Jobs",
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

export default CoordinatorWorkLoadChart;
