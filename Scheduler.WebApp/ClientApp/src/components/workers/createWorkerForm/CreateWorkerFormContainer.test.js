import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { workersService } from "../../../services";
import CreateWorkerFormContainer from "./CreateWorkerFormContainer";
import CreateWorkerForm from "./CreateWorkerForm";

jest.mock("../../../services");

describe("CreateWorkerFormContainer", () => {
    beforeEach(() => {
        workersService.create.mockResolvedValue(1);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("renders the form", () => {
        const wrapper = shallow(<CreateWorkerFormContainer />);
        expect(wrapper.find(CreateWorkerForm)).toHaveLength(1);
    });

    it("calls create service on form submission", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateWorkerFormContainer />);
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateWorkerForm)
                .props()
                .handleSubmit({}, { setSubmitting: jest.fn() });
        });
        expect(workersService.create).toHaveBeenCalledTimes(1);
    });

    it("shows error if create service fails", async () => {
        workersService.create.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateWorkerFormContainer />);
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateWorkerForm)
                .props()
                .handleSubmit({}, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
