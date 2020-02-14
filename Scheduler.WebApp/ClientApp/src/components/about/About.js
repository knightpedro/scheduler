import React from "react";
import Container from "../common/containers";
import Jumbotron from "react-bootstrap/Jumbotron";
import styled from "styled-components";

const Styles = styled(Container)`
    background: none;

    div {
        background: white;
    }
`;

const About = () => {
    return (
        <Styles>
            <Jumbotron className="shadow">
                <h1 className="display-4">About</h1>
                <p className="lead">
                    Scheduler is a simple planning application built using React
                    and ASP.NET Core.
                </p>
                <p className="lead">
                    It's designed to help small contracting companies keep track
                    of their workload.
                </p>
                <hr className="my-4"></hr>
                <p>
                    View the source on{" "}
                    <a
                        href="https://bitbucket.org/prk26/scheduler"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bitbucket.
                    </a>
                </p>
            </Jumbotron>
        </Styles>
    );
};

export default About;
