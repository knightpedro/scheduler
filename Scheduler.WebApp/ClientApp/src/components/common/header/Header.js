import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Routes from "../../../routes";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { LoginMenu } from "../../api-authorization/LoginMenu";

const StyledNavbar = styled(Navbar)`
    background-color: ${props => props.theme.colours.nav};
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

    .navbar-brand {
        color: ${props => props.theme.colours.navItem};
        text-decoration: none;
        font-size: 20px;

        :hover {
            color: ${props => props.theme.colours.navItemHover};
            text-decoration: none;
        }
    }

    .dropdown-menu {
        background: ${props => props.theme.colours.navDropdown};
    }

    &&& a {
        color: ${props => props.theme.colours.navItem};

        :hover,
        :focus {
            color: ${props => props.theme.colours.navItemHover};
        }
    }

    &&& a.dropdown-item {
        color: ${props => props.theme.colours.navDropdownItem};

        :hover,
        :focus {
            background: ${props => props.theme.colours.navDropdownHover};
            color: ${props => props.theme.colours.navDropdownItemHover};
        }
    }

    .navbar-toggler {
        border-color: ${props => props.theme.colours.navItem};
        color: ${props => props.theme.colours.navItem};

        :hover {
            border-color: ${props => props.theme.colours.navItemHover};
            color: ${props => props.theme.colours.navItemHover};
        }

        :focus {
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
