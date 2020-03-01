import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { jobsService } from "../../../services";
import { Loading } from "../../common/loading";
import JobDetailContainer from "./JobDetailContainer";
import JobDetail from "./JobDetail";

const jobStub = {
    id: 1,
    jobNumber: "J123",
    description: "Test Job",
    location: "Test Room",
    coordinator: null,
    isComplete: false,
    jobTasks: [],
};

const matchStub = {
    params: {
        id: 1,
    },
};

jest.mock("../../../services");

describe("JobDetailContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading initially", () => {
        jobsService.getById.mockResolvedValue({});
        const wrapper = shallow(<JobDetailContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error message if job service fails", async () => {
        jobsService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows the detail component when loading is complete", async () => {
        jobsService.getById.mockResolvedValue(jobStub);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(JobDetail)).toHaveLength(1);
    });

    it("calls the delete job service when handling delete", async () => {
        jobsService.destroy.mockResolvedValue();
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(JobDetail)
                .props()
                .handleDelete();
        });
        wrapper.setProps({});
        expect(jobsService.destroy).toHaveBeenCalledTimes(1);
    });

    it("shows an error if job deletion service fails", async () => {
        jobsService.destroy.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <JobDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);
        await act(async () => {
            wrapper
                .find(JobDetail)
                .props()
                .handleDelete();
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
