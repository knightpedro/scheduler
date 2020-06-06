import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal, portalSelectors } from "../../ducks/portal";
import { Portal, Segment } from "semantic-ui-react";
import Draggable from "react-draggable";
import styled from "styled-components";

const Styles = styled.div`
  left: 50%;
  top: 50%;
  position: fixed;
  transform: translate(-50%, 0);
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
      <Draggable>
        <Styles>
          <Segment raised padded>
            <Component {...props} />
          </Segment>
        </Styles>
      </Draggable>
    </Portal>
  );
};

export default PortalManager;
