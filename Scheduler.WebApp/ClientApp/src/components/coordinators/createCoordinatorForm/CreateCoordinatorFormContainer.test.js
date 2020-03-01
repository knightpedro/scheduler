import React from "react";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { coordinatorsService } from "../../../services";
import CreateCoordinatorFormContainer from "./CreateCoordinatorFormContainer";
import CreateCoordinatorForm from "./CreateCoordinatorForm";
import { act } from "react-dom/test-utils";

jest.mock("../../../services");

describe("CreateCoordinatorFormContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders the form correctly", () => {
        const wrapper = shallow(<CreateCoordinatorFormContainer />);
        expect(wrapper.find(CreateCoordinatorForm)).toHaveLength(1);
    });

    it("shows an error message when coordinators service fails", async () => {
        coordinatorsService.create.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateCoordinatorFormContainer />);
            wrapper
                .find(CreateCoordinatorForm)
                .props()
                .handleSubmit({}, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(coordinatorsService.create).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toContain(testError.message);
    });
});
