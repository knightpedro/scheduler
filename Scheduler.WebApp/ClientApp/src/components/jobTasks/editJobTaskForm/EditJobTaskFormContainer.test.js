import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import {
    jobTasksService,
    resourcesService,
    workersService,
} from "../../../services";
import { Loading } from "../../common/loading";
import EditJobTaskFormContainer from "./EditJobTaskFormContainer";
import CreateJobTaskForm from "../createJobTaskForm/CreateJobTaskForm";

jest.mock("../../../services");

const jobTaskStub = {
    id: 1,
    job: {
        id: 1,
        jobNumber: "J1",
        description: "Test Job",
    },
    description: "Test Task",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T21:00:00.0000000Z",
    workers: [],
    resources: [],
};

const matchStub = {
    params: {
        id: jobTaskStub.id,
    },
};

const onSubmitParameters = {
    description: "Test",
    start: { format: jest.fn() },
    end: { format: jest.fn() },
};

describe("EditJobTaskFormContainer", () => {
    beforeEach(() => {
        jobTasksService.getById.mockResolvedValue(jobTaskStub);
        resourcesService.getAll.mockResolvedValue([]);
        workersService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(<EditJobTaskFormContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error if loading fails", async () => {
        jobTasksService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobTaskFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobTaskFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.containsMatchingElement(CreateJobTaskForm)).toBeTruthy();
    });

    it("calls the edit service on submit", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobTaskFormContainer match={matchStub} />
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
        expect(jobTasksService.edit).toHaveBeenCalledTimes(1);
    });

    it("shows error if edit fails", async () => {
        jobTasksService.edit.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditJobTaskFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);

        await act(async () => {
            wrapper
                .find(CreateJobTaskForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(jobTasksService.edit).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toContain(testError.message);
    });
});
