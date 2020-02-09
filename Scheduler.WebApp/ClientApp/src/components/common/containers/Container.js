import Container from "react-bootstrap/Container";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  padding: 50px 100px;
  background: ${props => props.theme.colours.body};
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (min-width: 1690px) {
    max-width: 1600px;
  }
`;

export default StyledContainer;
