import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { trainingService, workersService } from "../../../services";
import { Loading } from "../../common/loading";
import CreateTrainingFormContainer from "./CreateTrainingFormContainer";
import CreateTrainingForm from "./CreateTrainingForm";

jest.mock("../../../services");

const onSumbitParameters = {
    description: "Test",
    location: "Test",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T23:00:00.0000000Z",
};

describe("CreateTrainingFormContainer", () => {
    beforeEach(() => {
        trainingService.create.mockResolvedValue();
        workersService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(<CreateTrainingFormContainer />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        workersService.getAll.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateTrainingFormContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CreateTrainingFormContainer />);
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(CreateTrainingForm)).toHaveLength(1);
    });
});
