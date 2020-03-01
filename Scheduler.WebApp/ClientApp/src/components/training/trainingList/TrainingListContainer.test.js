import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { trainingService } from "../../../services";
import { Loading } from "../../common/loading";
import TrainingListContainer from "./TrainingListContainer";
import TrainingList from "./TrainingList";

jest.mock("../../../services");

describe("TrainingListContainer", () => {
    beforeEach(() => {
        trainingService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(<TrainingListContainer />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        trainingService.getAll.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<TrainingListContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows list once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<TrainingListContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(TrainingList)).toHaveLength(1);
    });
});
