import { useEffect, useContext } from "react";
import { ThemeContext } from "styled-components";
import * as d3 from "d3";

const WIDTH = 300;
const HEIGHT = 300;
const MARGIN = 40;
const LEGEND_HEIGHT = 100;
const KEY = 20;
const KEY_MARGIN = 5;
const RADIUS = Math.min(WIDTH, HEIGHT) / 2;

const useDonut = (ref, data, unit = "day") => {
    const themeContext = useContext(ThemeContext);
    useEffect(() => {
        const colorScale = d3.scaleOrdinal(themeContext.colours.visualisation);

        const total = Math.round(
            data.reduce((acc, current) => acc + current.value, 0)
        );

        d3.select(ref.current)
            .selectAll("*")
            .remove();

        const svg = d3
            .select(ref.current)
            .attr(
                "viewBox",
                `0 0 ${WIDTH + 2 * MARGIN} ${HEIGHT +
                    3 * MARGIN +
                    LEGEND_HEIGHT}`
            );

        const chart = svg
            .append("g")
            .attr(
                "transform",
                `translate(${WIDTH / 2 + MARGIN}, ${HEIGHT / 2 + MARGIN})`
            );

        const pie = d3.pie().sort(null)(data.map(d => d.value));

        const arc = d3
            .arc()
            .innerRadius(90)
            .outerRadius(RADIUS);

        const arcs = chart
            .selectAll("arc")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("fill", (d, i) => colorScale(i))
            .transition()
            .delay((d, i) => i * 300)
            .duration(300)
            .attrTween("d", d => {
                const interpolator = d3.interpolate(d.startAngle, d.endAngle);
                return t => {
                    d.endAngle = interpolator(t);
                    return arc(d);
                };
            });

        chart
            .append("text")
            .attr("class", "total")
            .attr("y", 10)
            .attr("text-anchor", "middle")
            .text(`${total} ${total === 1 ? unit : unit + "s"}`);

        const legend = svg
            .append("g")
            .attr("transform", `translate(${MARGIN}, ${HEIGHT + 2 * MARGIN})`);

        legend
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("y", (d, i) => i * (KEY + KEY_MARGIN))
            .attr("width", KEY)
            .attr("height", KEY)
            .attr("fill", (_, i) => colorScale(i));

        legend
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("x", KEY + 2 * KEY_MARGIN)
            .attr("y", (_, i) => i * (KEY + KEY_MARGIN) + 15)
            .attr("text-anchor", "start")
            .text(d => d.label);
    }, [ref, data, unit]);
};

export default useDonut;
