import React from "react";
import { mount } from "enzyme";
import BaseForm from "../BaseForm";
import { Formik } from "formik";

describe("BaseForm", () => {
    it("renders correctly", () => {
        const wrapper = mount(<BaseForm />);
        expect(wrapper).toMatchSnapshot();
    });

    it("calls the submit handler", () => {
        const mockHandler = jest.fn();
        const wrapper = mount(<BaseForm onSubmit={mockHandler} />);
        wrapper
            .find(Formik)
            .props()
            .onSubmit();
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    it("calls the cancel handler", () => {
        const mockHandler = jest.fn();
        const wrapper = mount(<BaseForm onCancel={mockHandler} />);
        wrapper
            .find("button")
            .last()
            .props()
            .onClick();
        expect(mockHandler).toHaveBeenCalledTimes(1);
    });
});
