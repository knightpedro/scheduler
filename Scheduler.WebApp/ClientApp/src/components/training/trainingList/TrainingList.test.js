import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import TrainingList from "./TrainingList";

const trainingStub = [
    {
        id: 1,
        description: "Test Training 1",
        location: "Test Room 1",
        start: "2020-02-29T19:00:00.0000000Z",
        end: "2020-02-29T23:00:00.0000000Z",
    },
    {
        id: 2,
        description: "Test Training 2",
        location: "Test Room 2",
        start: "2020-02-29T19:00:00.0000000Z",
        end: "2020-02-29T23:00:00.0000000Z",
    },
];

describe("TrainingList", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<TrainingList training={trainingStub} />);
        expect(wrapper).toMatchSnapshot();
    });
});
