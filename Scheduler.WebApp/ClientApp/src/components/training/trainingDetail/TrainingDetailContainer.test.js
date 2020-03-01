import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { trainingService } from "../../../services";
import { Loading } from "../../common/loading";
import TrainingDetailContainer from "./TrainingDetailContainer";
import TrainingDetail from "./TrainingDetail";

jest.mock("../../../services");

const trainingStub = {
    id: 1,
    description: "Test training",
    location: "Test room",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T23:00:00.0000000Z",
    workers: [],
};

const matchStub = {
    params: {
        id: 1,
    },
};

describe("TrainingDetailContainer", () => {
    beforeEach(() => {
        trainingService.getById.mockResolvedValue(trainingStub);
        trainingService.destroy.mockResolvedValue();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading intially", () => {
        const wrapper = shallow(<TrainingDetailContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        trainingService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows detail once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(TrainingDetail)).toHaveLength(1);
    });

    it("calls delete service in delete handler", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});

        await act(async () => {
            wrapper
                .find(TrainingDetail)
                .props()
                .handleDelete();
        });
        expect(trainingService.destroy).toHaveBeenCalledWith(trainingStub.id);
    });

    it("shows error if delete fails", async () => {
        trainingService.destroy.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetailContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);

        await act(async () => {
            wrapper
                .find(TrainingDetail)
                .props()
                .handleDelete();
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
