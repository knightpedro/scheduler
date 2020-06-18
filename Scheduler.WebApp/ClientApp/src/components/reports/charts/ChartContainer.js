import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Segment, Header, Button } from "semantic-ui-react";
import { saveSvgAsPng } from "save-svg-as-png";
import { useSpring, animated } from "react-spring";

const AnimatedButton = animated(Button);

const Container = styled.div`
  height: 600px;
`;

const ChartContainer = ({ title, children }) => {
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const animation = useSpring({ opacity: showDownloadButton ? 1 : 0 });
  const chartRef = useRef(null);

  const handleDownload = () => {
    const svg = chartRef.current.querySelector("svg");
    if (svg) {
      saveSvgAsPng(svg, "chart.png", { scale: 2 });
    }
  };

  return (
    <Segment
      padded
      raised
      textAlign="center"
      onMouseEnter={() => setShowDownloadButton(true)}
      onMouseLeave={() => setShowDownloadButton(false)}
    >
      <AnimatedButton
        style={animation}
        icon="download"
        floated="right"
        title="Download chart"
        onClick={handleDownload}
      />
      {title && <Header as="h3">{title}</Header>}
      <Container ref={chartRef}>{children}</Container>
    </Segment>
  );
};

export default ChartContainer;
