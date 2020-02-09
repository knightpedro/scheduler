import React, { useRef } from "react";
import useDonut from "../useDonut";
import ChartWrapper from "../ChartWrapper";

const OutOfServiceWidget = ({ data, unit }) => {
  const chartSvg = useRef(null);
  useDonut(chartSvg, data, unit);

  return (
    <ChartWrapper>
      <svg ref={chartSvg} />
    </ChartWrapper>
  );
};

export default OutOfServiceWidget;
