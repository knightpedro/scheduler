import React from "react";
import { shallow } from "enzyme";
import CoordinatorDetail from "./CoordinatorDetail";

const ActiveCoordinator = {
    id: 1,
    isActive: true,
    name: "Active Coordinator",
    jobs: [],
};

const InactiveCoordinator = {
    id: 1,
    isActive: false,
    name: "Inactive Coordinator",
    jobs: [],
};

describe("Coordinator Detail", () => {
    it("renders correctly", () => {
        const wrapper = shallow(
            <CoordinatorDetail coordinator={ActiveCoordinator} />
        );
        expect(wrapper).toMatchSnapshot();
    });

    it("renders NoContent when there are no jobs", () => {
        const wrapper = shallow(
            <CoordinatorDetail coordinator={ActiveCoordinator} />
        );
        expect(wrapper.find("NoContent")).toHaveLength(1);
    });
});
