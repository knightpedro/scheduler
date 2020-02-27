import React from "react";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import { jobsService, coordinatorsService } from "../../../services";
import EditJobFormContainer from "./EditJobFormContainer";
import { Loading } from "../../common/loading";
import EditJobForm from "./EditJobForm";
import { act } from "react-dom/test-utils";

jest.mock("../../../services");

const errorMessage = "Test Error";

const matchStub = {
    params: {
        id: 1,
    },
};

const onSubmitParameters = {
    dateReceived: { format: jest.fn() },
    coordinator: { value: 1 },
};

describe("EditJobFormContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading initially", () => {
        const wrapper = shallow(<EditJobFormContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error if the coordinators service fails", async () => {
        coordinatorsService.getAll.mockRejectedValue(new Error(errorMessage));
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(errorMessage);
    });

    it("shows an error if the job service fails", async () => {
        jobsService.getById.mockRejectedValue(new Error(errorMessage));
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(errorMessage);
    });

    it("shows the job form once loaded", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        jobsService.getById.mockResolvedValue({});
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        const form = wrapper.find(EditJobForm);
        expect(form).toHaveLength(1);
    });

    it("calls the edit job service on submit", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        jobsService.getById.mockResolvedValue({});
        jobsService.edit.mockResolvedValue();
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(EditJobForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(jobsService.edit).toHaveBeenCalledTimes(1);
    });

    it("shows an error if the edit job service fails", async () => {
        coordinatorsService.getAll.mockResolvedValue([]);
        jobsService.getById.mockResolvedValue({});
        jobsService.edit.mockRejectedValue(new Error(errorMessage));
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(errorMessage);
        await act(async () => {
            wrapper
                .find(EditJobForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(errorMessage);
    });
});
