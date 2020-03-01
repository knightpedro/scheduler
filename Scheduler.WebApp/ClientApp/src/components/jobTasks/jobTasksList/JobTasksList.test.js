import React from "react";
import { shallow } from "enzyme";
import JobTasksList from "./JobTasksList";

const jobTasksStub = [
    {
        id: 1,
        description: "Test Task 1",
        start: "2020-02-29T19:00:00.0000000Z",
        end: "2020-02-29T21:00:00.0000000Z",
    },
    {
        id: 2,
        description: "Test Task 2",
        start: "2020-02-28T19:00:00.0000000Z",
        end: "2020-02-28T21:00:00.0000000Z",
    },
];

describe("JobTasksList", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<JobTasksList jobTasks={jobTasksStub} />);
        expect(wrapper).toMatchSnapshot();
    });
});
