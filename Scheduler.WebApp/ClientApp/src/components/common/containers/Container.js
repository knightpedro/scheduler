import Container from "react-bootstrap/Container";
import styled from "styled-components";

const StyledContainer = styled(Container).attrs(props => ({ fluid: true }))`
  background: ${props => props.theme.colours.body};
  padding: 20px;
  margin-bottom: 20px;

  @media (min-width: 1690px) {
    max-width: 1600px;
  }
`;

export default StyledContainer;
