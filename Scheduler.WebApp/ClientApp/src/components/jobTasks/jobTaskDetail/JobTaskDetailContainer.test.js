import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { jobTasksService } from "../../../services";
import JobTaskDetail from "./JobTaskDetail";
import JobTaskDetailContainer from "./JobTaskDetailContainer";
import { Loading } from "../../common/loading";

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
        id: 1,
    },
};

describe("JobTaskDetailContainer", () => {
    beforeEach(() => {
        jobTasksService.getById.mockResolvedValue(jobTaskStub);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(<JobTaskDetailContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error if service fails to load", async () => {
        jobTasksService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows detail view once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(JobTaskDetail)).toHaveLength(1);
    });

    it("calls the delete service on handle delete", async () => {
        jobTasksService.destroy.mockResolvedValue();
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(JobTaskDetail)
                .props()
                .handleDelete();
        });
        wrapper.setProps({});
        expect(jobTasksService.destroy).toHaveBeenCalledTimes(1);
    });

    it("shows an error if delete service fails", async () => {
        jobTasksService.destroy.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(JobTaskDetail)
                .props()
                .handleDelete();
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
