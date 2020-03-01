import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import {
    jobTasksService,
    jobsService,
    resourcesService,
    workersService,
} from "../../../services";
import { Loading } from "../../common/loading";
import CreateJobTaskFormContainer from "./CreateJobTaskFormContainer";
import CreateJobTaskForm from "./CreateJobTaskForm";

jest.mock("../../../services");

const jobStub = {
    id: 1,
};

const locationStub = {
    search: "?jobId=1",
};

const onSubmitParameters = {
    description: "Test",
    start: { format: jest.fn() },
    end: { format: jest.fn() },
};

describe("CreateJobTaskFormContainer", () => {
    beforeEach(() => {
        jobTasksService.create.mockResolvedValue();
        jobsService.getById.mockResolvedValue(jobStub);
        resourcesService.getAll.mockResolvedValue([]);
        workersService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(
            <CreateJobTaskFormContainer location={locationStub} />
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateJobTaskFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(CreateJobTaskForm)).toHaveLength(1);
    });

    it("shows error if services fail", async () => {
        jobsService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateJobTaskFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("calls create service on submit", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateJobTaskFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateJobTaskForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(jobTasksService.create).toHaveBeenCalledTimes(1);
    });

    it("shows error if create service fails", async () => {
        jobTasksService.create.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateJobTaskFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateJobTaskForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
