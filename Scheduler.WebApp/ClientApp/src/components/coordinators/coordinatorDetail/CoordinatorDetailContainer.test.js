import React from "react";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils";
import CoordinatorDetailContainer from "./CoordinatorDetailContainer";
import CoordinatorDetail from "./CoordinatorDetail";
import { coordinatorsService } from "../../../services";
import { Loading, LoadingFailure } from "../../common/loading";
import { mountWithProvider, testError } from "../../../utils";

const match = {
    params: {
        id: 1,
    },
};

const coordinatorStub = {
    id: 1,
    isActive: true,
    name: "Coordinator",
    jobs: [],
};

jest.mock("../../../services");

describe("CoordinatorDetailContainer", () => {
    beforeEach(() => jest.clearAllMocks());

    it("shows loading initially", () => {
        const wrapper = shallow(<CoordinatorDetailContainer match={match} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error correctly", async () => {
        coordinatorsService.getWithJobs.mockRejectedValueOnce(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CoordinatorDetailContainer match={match} />
            );
        });
        expect(wrapper.find(LoadingFailure)).toHaveLength(0);
        wrapper.setProps({});
        expect(coordinatorsService.getWithJobs).toHaveBeenCalled();
        expect(wrapper.text()).toContain(testError.message);
    });

    it("renders CoordinatorDetail successfully", async () => {
        coordinatorsService.getWithJobs.mockResolvedValueOnce(coordinatorStub);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CoordinatorDetailContainer match={match} />
            );
        });
        expect(wrapper.find(CoordinatorDetail)).toHaveLength(0);
        wrapper.setProps({});
        expect(wrapper.find(CoordinatorDetail)).toHaveLength(1);
    });
});
