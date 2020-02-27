import React from "react";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import { jobsService, coordinatorsService } from "../../../services";
import CreateJobFormContainer from "./CreateJobFormContainer";
import { Loading } from "../../common/loading";
import CreateJobForm from "./CreateJobForm";
import { act } from "react-dom/test-utils";

jest.mock("../../../services");

const onSubmitParameters = {
    values: {
        dateReceived: { format: jest.fn() },
        coordinator: { value: null },
    },
};

const errorMessage = "Test Error";

describe("CreateJobFormContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading intially", () => {
        coordinatorsService.getAll.mockResolvedValue();
        const wrapper = shallow(<CreateJobFormContainer />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error message if loading coordinators fails", async () => {
        coordinatorsService.getAll.mockRejectedValue(new Error(errorMessage));
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateJobFormContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(errorMessage);
    });

    it("shows correct form when loaded", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateJobFormContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.find(CreateJobForm)).toHaveLength(1);
    });

    it("calls the create job service on submit", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        jobsService.create.mockResolvedValue();
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateJobFormContainer />);
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateJobForm)
                .props()
                .handleSubmit(onSubmitParameters.values, {
                    setSubmitting: jest.fn(),
                });
        });
        wrapper.setProps({});
        expect(jobsService.create).toHaveBeenCalledTimes(1);
    });

    it("shows an error if the job service fails", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        jobsService.create.mockRejectedValue(new Error(errorMessage));
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateJobFormContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(errorMessage);
        await act(async () => {
            wrapper
                .find(CreateJobForm)
                .props()
                .handleSubmit(onSubmitParameters.values, {
                    setSubmitting: jest.fn(),
                });
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(errorMessage);
    });
});
