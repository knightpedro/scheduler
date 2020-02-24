import React from "react";
import { shallow } from "enzyme";
import CoordinatorsList from "./CoordinatorsList";

const coordinatorsStub = [];

describe("CoordinatorsList", () => {
    let wrapper;

    beforeEach(
        () =>
            (wrapper = shallow(
                <CoordinatorsList coordinators={coordinatorsStub} />
            ))
    );

    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
