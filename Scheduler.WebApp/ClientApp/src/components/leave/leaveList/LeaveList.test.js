import React from "react";
import { shallow } from "enzyme";
import LeaveList from "./LeaveList";

const leaveStub = [
    {
        id: 1,
        description: "Annual Leave",
        start: "2020-02-29T19:00:00.0000000Z",
        end: "2020-02-29T23:00:00.0000000Z",
    },
];

describe("LeaveList", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<LeaveList leave={leaveStub} />);
        expect(wrapper).toMatchSnapshot();
    });
});
