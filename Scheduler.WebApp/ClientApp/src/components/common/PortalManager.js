import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal, portalSelectors } from "../../ducks/portal";
import { Portal } from "semantic-ui-react";
import Draggable from "react-draggable";
import styled from "styled-components";

const Styles = styled.div`
  bottom: 10%;
  right: 10%;
  position: fixed;
  z-index: 100;
`;

const PortalManager = () => {
  const dispatch = useDispatch();
  const portal = useSelector(portalSelectors.selectComponent);

  if (!portal) return null;

  const { Component, props } = portal;

  const handleClose = () => dispatch(closePortal());

  return (
    <Portal open={true} onClose={handleClose}>
      <Draggable cancel=".field" bounds="parent">
        <Styles>
          <Component {...props} />
        </Styles>
      </Draggable>
    </Portal>
  );
};

export default PortalManager;
