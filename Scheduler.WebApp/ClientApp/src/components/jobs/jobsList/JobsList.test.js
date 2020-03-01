import React from "react";
import { shallow } from "enzyme";
import JobsList from "./JobsList";
import moment from "moment";

const jobStub = {
    id: 1,
    jobNumber: "J123",
    description: "Test Job",
    location: "Test Room",
    isComplete: false,
};

jest.mock("moment");

describe("JobsList", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<JobsList jobs={[jobStub]} />);
        expect(wrapper).toMatchSnapshot();
    });
});
