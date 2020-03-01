import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { jobsService } from "../../../services";
import { Loading } from "../../common/loading";
import JobsListContainer from "./JobsListContainer";
import JobsList from "./JobsList";

jest.mock("../../../services");

describe("JobsListContainer", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("shows loading initially", () => {
        jobsService.getAll.mockResolvedValue([]);
        const wrapper = shallow(<JobsListContainer />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error if jobs service fails", async () => {
        jobsService.getAll.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<JobsListContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows JobsList once loaded", async () => {
        jobsService.getAll.mockResolvedValue([]);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<JobsListContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.find(JobsList)).toHaveLength(1);
    });
});
