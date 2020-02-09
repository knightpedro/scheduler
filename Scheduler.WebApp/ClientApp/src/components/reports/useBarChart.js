import { useEffect } from "react";
import * as d3 from "d3";

const MARGIN = 50;
const HEIGHT = 400 - 2 * MARGIN;
const WIDTH = 500 - 2 * MARGIN;

const useBarChart = (ref, data, title, xLabel, yLabel) => {
  useEffect(() => {
    d3.select(ref.current)
      .selectAll("*")
      .remove();

    const svg = d3
      .select(ref.current)
      .attr("viewBox", `0 0 ${WIDTH + 2 * MARGIN} ${HEIGHT + 2 * MARGIN}`);

    const chart = svg
      .append("g")
      .attr("transform", `translate(${MARGIN}, ${MARGIN})`);

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, WIDTH])
      .padding(0.2);

    chart
      .append("g")
      .attr("transform", `translate(0, ${HEIGHT})`)
      .call(d3.axisBottom(xScale));

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data.map(d => d.value))])
      .range([HEIGHT, 0]);

    chart.append("g").call(d3.axisLeft(yScale));

    chart
      .selectAll()
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.label))
      .attr("y", HEIGHT)
      .attr("width", xScale.bandwidth())
      .attr("height", 0)
      .attr("fill", "#5ebcd2")
      .transition()
      .duration(1000)
      .delay((_, i) => i * 200)
      .attr("height", d => HEIGHT - yScale(d.value))
      .attr("y", d => yScale(d.value));

    svg
      .append("text")
      .attr("x", WIDTH / 2 + MARGIN)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(title);

    svg
      .append("text")
      .attr("x", WIDTH / 2 + MARGIN)
      .attr("y", HEIGHT + MARGIN * 1.9)
      .attr("text-anchor", "middle")
      .text(xLabel);

    svg
      .append("text")
      .attr("x", -(HEIGHT / 2) - MARGIN)
      .attr("y", MARGIN / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(yLabel);
  }, [ref, data, title, xLabel, yLabel]);
};

export default useBarChart;
