import React, { useEffect, useRef, useState } from "react";
import formContainerLookup from "../formContainerLookup";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import { appointmentTypes } from "../../../constants";
import { usePopper } from "react-popper";

const TIME_FORMAT = "h:mm a D/M";

const getEventColour = (type) => {
  switch (type) {
    case appointmentTypes.JOB_TASK:
      return "#2185d0";
    case appointmentTypes.LEAVE:
    case appointmentTypes.OUT_OF_SERVICE:
      return "#e03997";
    case appointmentTypes.TRAINING:
      return "#00b5ad";
    default:
      return "#000";
  }
};

const Container = styled.div`
  display: flex;
  grid-column-start: ${({ startDay, header }) =>
    header ? startDay + 1 : startDay};
  grid-column-end: ${({ daySpan }) => `span ${daySpan}`};
  padding: 0.2em 0.5em;
  margin: 0.25em 0;
  color: white;
  background: ${({ isConflicting }) =>
    isConflicting &&
    `repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 10px,
      rgba(0, 0, 0, 0.15) 10px,
      rgba(0, 0, 0, 0.15) 20px
    )`};
  background-color: ${({ appointmentType }) => getEventColour(appointmentType)};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;
  cursor: pointer;

  > div {
    flex: 1;
    overflow: hidden;
  }

  > i {
    margin: 0.2em;
  }

  ${({ starts }) =>
    starts &&
    `margin-left: 0.5em;
    border-top-left-radius: 0.3em;
    border-bottom-left-radius: 0.3em;`}

  ${({ ends }) =>
    ends &&
    `margin-right: 0.5em;
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;`}
`;

const Header = styled.div`
  font-size: 1rem;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Duration = styled.div`
  font-size: 0.9rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Popper = styled.div`
  z-index: 1000;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
`;

const Event = ({ appointment, ...props }) => {
  const { id, type, description, start, end, isConflicting } = appointment;
  const [showPopper, setShowPopper] = useState(false);
  const containerRef = useRef(null);
  const popperRef = useRef(null);
  const { styles, attributes, update } = usePopper(
    containerRef.current,
    popperRef.current,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  );

  useEffect(() => {
    if (update != null) update();
  }, [start, end, update]);

  const handleEventClick = () => {
    setShowPopper(true);
  };

  const handleOutsideClick = (e) => {
    if (
      popperRef.current.contains(e.target) ||
      containerRef.current.contains(e.target)
    )
      return;
    setShowPopper(false);
  };

  useEffect(() => {
    if (showPopper) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopper]);

  const renderFormContainer = () => {
    const FormContainer = formContainerLookup[type];
    if (FormContainer)
      return (
        <FormContainer
          id={id}
          closeForm={() => setShowPopper(false)}
          showDelete
          raised
        />
      );
    return null;
  };

  return (
    <>
      <Container
        key={id}
        ref={containerRef}
        appointmentType={type}
        isConflicting={isConflicting}
        onClick={handleEventClick}
        title={description}
        {...props}
      >
        <div>
          <Header>{description}</Header>
          <Duration>
            {start.format(TIME_FORMAT)} - {end.format(TIME_FORMAT)}
          </Duration>
        </div>
        {isConflicting && <Icon name="exclamation triangle" />}
      </Container>
      <Popper
        ref={popperRef}
        style={styles.popper}
        {...attributes.popper}
        show={showPopper}
      >
        {renderFormContainer()}
      </Popper>
    </>
  );
};

export default Event;
