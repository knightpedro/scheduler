import React from "react";
import styled from "styled-components";
import { Segment, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const getIcon = (status) => {
  if (status === "pending") return <Icon name="circle notch" loading />;
  if (status === "fulfilled") return <Icon name="check" />;
  if (status === "rejected") return <Icon name="exclamation triangle" />;
};

const StatusBar = () => {
  const { request, status } = useSelector((state) => state.requests);
  return (
    <Footer>
      <Segment basic size="small" inverted color="blue">
        {getIcon(status)}
        {request}
      </Segment>
    </Footer>
  );
};

export default StatusBar;
