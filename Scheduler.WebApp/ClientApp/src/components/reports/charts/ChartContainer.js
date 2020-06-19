import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Segment, Header, Button } from "semantic-ui-react";
import { saveSvgAsPng } from "save-svg-as-png";
import { useSpring, animated } from "react-spring";

const AnimatedButton = animated(Button);

const Heading = styled(Segment)`
  &&& {
    padding: 0.5em 1em;
  }

  display: flex;
  justify-content: space-between;

  .ui.header {
    margin: 0px;
    display: flex;
    align-self: center;
  }
`;

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
    <div
      onMouseEnter={() => setShowDownloadButton(true)}
      onMouseLeave={() => setShowDownloadButton(false)}
    >
      <Heading attached="top" secondary>
        <Header as="h5">{title}</Header>
        <AnimatedButton
          size="small"
          style={animation}
          icon="download"
          title="Download chart"
          onClick={handleDownload}
        />
      </Heading>
      <Segment attached="bottom" padded textAlign="center">
        <Container ref={chartRef}>{children}</Container>
      </Segment>
    </div>
  );
};

export default ChartContainer;
