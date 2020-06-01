import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closePortal } from "../../ducks/portal";
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
  const content = useSelector((state) => state.portal);

  if (!content) return null;

  const handleClose = () => dispatch(closePortal());

  return (
    <Portal open={true} onClose={handleClose}>
      <Draggable>
        <Styles>
          <Segment raised padded>
            {content}
          </Segment>
        </Styles>
      </Draggable>
    </Portal>
  );
};

export default PortalManager;
