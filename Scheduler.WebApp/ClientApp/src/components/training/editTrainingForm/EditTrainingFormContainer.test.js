import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { trainingService, workersService } from "../../../services";
import { Loading } from "../../common/loading";
import EditTrainingFormContainer from "./EditTrainingFormContainer";
import CreateTrainingForm from "../createTrainingForm/CreateTrainingForm";

jest.mock("../../../services");

const matchStub = {
    params: {
        id: 1,
    },
};

const trainingStub = {
    id: 1,
    description: "Test",
    location: "Test Room 1",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T23:00:00.0000000Z",
    workers: [],
};

const trainingEditStub = {
    ...trainingStub,
    location: "Test Room 2",
    start: {
        format: jest.fn(),
    },
    end: {
        format: jest.fn(),
    },
};

describe("EditTrainingFormContainer", () => {
    beforeEach(() => {
        trainingService.getById.mockResolvedValue(trainingStub);
        trainingService.edit.mockResolvedValue();
        workersService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(
            <EditTrainingFormContainer match={matchStub} />
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        trainingService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditTrainingFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditTrainingFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(CreateTrainingForm)).toHaveLength(1);
    });

    it("calls edit service on form submission", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditTrainingFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateTrainingForm)
                .props()
                .handleSubmit(trainingEditStub, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(trainingService.edit).toHaveBeenCalledTimes(1);
    });

    it("shows error if edit fails", async () => {
        trainingService.edit.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditTrainingFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);

        await act(async () => {
            wrapper
                .find(CreateTrainingForm)
                .props()
                .handleSubmit(trainingEditStub, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(trainingService.edit).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toContain(testError.message);
    });
});
