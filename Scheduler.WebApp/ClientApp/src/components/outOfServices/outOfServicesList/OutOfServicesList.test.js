import React from "react";
import { shallow } from "enzyme";
import OutOfServicesList from "./OutOfServicesList";

const oosStub = [
    {
        id: 1,
        description: "Damage",
        start: "2020-02-29T19:00:00.0000000Z",
        end: "2020-02-29T23:00:00.0000000Z",
    },
];

describe("OutOfServicesList", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<OutOfServicesList outOfServices={oosStub} />);
        expect(wrapper).toMatchSnapshot();
    });
});
