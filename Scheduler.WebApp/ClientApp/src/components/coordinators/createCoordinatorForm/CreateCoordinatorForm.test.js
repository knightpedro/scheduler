import React from "react";
import { shallow } from "enzyme";
import CreateCoordinatorForm from "./CreateCoordinatorForm";

describe("CreateCoordinatorForm", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<CreateCoordinatorForm />);
        expect(wrapper).toMatchSnapshot();
    });
});
