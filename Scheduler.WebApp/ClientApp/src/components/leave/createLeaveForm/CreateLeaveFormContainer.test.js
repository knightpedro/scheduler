import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { leaveService, workersService } from "../../../services";
import { Loading } from "../../common/loading";
import CreateLeaveFormContainer from "./CreateLeaveFormContainer";
import CreateLeaveForm from "./CreateLeaveForm";

jest.mock("../../../services");

const locationStub = {
    search: "?workerId=1",
};

const onSubmitParameters = {
    start: {
        format: jest.fn(),
    },
    end: {
        format: jest.fn(),
    },
    worker: {
        value: 1,
    },
    leaveType: {
        value: "annual",
    },
};

describe("CreateLeaveFormContainer", () => {
    beforeEach(() => {
        leaveService.create.mockResolvedValue();
        leaveService.getTypes.mockResolvedValue([]);
        workersService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(
            <CreateLeaveFormContainer location={locationStub} />
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows an error if loading fails", async () => {
        leaveService.getTypes.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateLeaveFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows the form once loading is complete", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateLeaveFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(CreateLeaveForm)).toHaveLength(1);
    });

    it("calls create service on form submission", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateLeaveFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(CreateLeaveForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(leaveService.create).toHaveBeenCalledTimes(1);
    });

    it("shows an error if create service fails", async () => {
        leaveService.create.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateLeaveFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);
        await act(async () => {
            wrapper
                .find(CreateLeaveForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(leaveService.create).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toContain(testError.message);
    });
});
