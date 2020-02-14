import React, { useRef } from "react";
import useBarChart from "./useBarChart";
import ChartWrapper from "./ChartWrapper";

const TITLE = "";
const X_LABEL = "Coordinators";
const Y_LABEL = "Jobs";

const CoordinatorWorkLoadChart = ({ data }) => {
    const chartSvg = useRef(null);

    useBarChart(chartSvg, data, TITLE, X_LABEL, Y_LABEL);

    return (
        <ChartWrapper>
            <svg ref={chartSvg} />
        </ChartWrapper>
    );
};

export default CoordinatorWorkLoadChart;
