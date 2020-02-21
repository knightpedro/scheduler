import React from "react";
import { shallow } from "enzyme";
import CoordinatorDetailContainer from "./CoordinatorDetailContainer";

const match = {
    params: {
        id: 1,
    },
};

describe("Coordinator Detail Container", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<CoordinatorDetailContainer match={match} />);
        expect(wrapper).toMatchSnapshot();
    });
});
