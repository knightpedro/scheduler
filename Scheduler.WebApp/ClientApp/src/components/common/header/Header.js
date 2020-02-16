import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Routes from "../../../routes";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LoginMenu } from "../../api-authorization/LoginMenu";

const StyledNavbar = styled(Navbar)`
    background-color: ${props => props.theme.colours.primary};
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

    .navbar-brand {
        font-size: 20px;
        font-weight: 500;
    }

    .dropdown-menu {
        background: ${props => props.theme.colours.primaryVariant};
    }

    &&& a {
        color: ${props => props.theme.colours.onPrimary};

        :hover,
        :focus {
            color: ${props => props.theme.colours.onPrimary};
            opacity: 80%;
            font-weight: 500;
        }
    }

    &&& a.dropdown-item {
        color: ${props => props.theme.colours.onPrimary};

        :hover,
        :focus {
            background: ${props => props.theme.colours.primary};
        }

        :hover {
            opacity: 100%;
        }
    }

    .navbar-toggler {
        border-color: ${props => props.theme.colours.onPrimary};
        color: ${props => props.theme.colours.onPrimary};

        :hover,
        :focus {
            opacity: 80%;
            outline: none;
        }
    }
`;

const Header = () => {
    return (
        <StyledNavbar expand="lg">
            <Navbar.Brand as={Link} to={Routes.home}>
                Scheduler
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav">
                <FontAwesomeIcon icon={faBars} />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavDropdown title="Planner" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            as={Link}
                            to={Routes.workers.SCHEDULE}
                        >
                            Staff
                        </NavDropdown.Item>
                        <NavDropdown.Item
                            as={Link}
                            to={Routes.resources.SCHEDULE}
                        >
                            Plant
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link as={Link} to={Routes.jobs.LIST}>
                        Jobs
                    </Nav.Link>
                    <Nav.Link as={Link} to={Routes.reports}>
                        Performance
                    </Nav.Link>
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                        <NavDropdown.Item
                            as={Link}
                            to={Routes.coordinators.LIST}
                        >
                            Coordinators
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={Routes.workers.LIST}>
                            Staff
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={Routes.resources.LIST}>
                            Plant
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={Routes.training.LIST}>
                            Training
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to={Routes.about}>
                        About
                    </Nav.Link>
                    <LoginMenu />
                </Nav>
            </Navbar.Collapse>
        </StyledNavbar>
    );
};

export default Header;
