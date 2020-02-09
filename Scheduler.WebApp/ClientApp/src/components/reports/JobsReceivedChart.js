import React, { useRef } from "react";
import useBarChart from "./useBarChart";
import ChartWrapper from "./ChartWrapper";

const TITLE = "";
const Y_LABEL = "Jobs";

const JobsReceivedChart = ({ data, xLabel }) => {
  const chartSvg = useRef(null);

  useBarChart(chartSvg, data, TITLE, xLabel, Y_LABEL);

  return (
    <ChartWrapper>
      <svg ref={chartSvg} />
    </ChartWrapper>
  );
};

export default JobsReceivedChart;
