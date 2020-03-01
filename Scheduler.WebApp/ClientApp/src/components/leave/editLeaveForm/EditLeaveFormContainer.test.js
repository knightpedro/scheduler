import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { leaveService, workersService } from "../../../services";
import { Loading } from "../../common/loading";
import { Delete } from "../../common/actions";
import EditLeaveFormContainer from "./EditLeaveFormContainer";
import EditLeaveForm from "./EditLeaveForm";

jest.mock("../../../services");

const leaveStub = {
    id: 1,
    workerId: 1,
    leaveType: "annual",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T23:00:00.0000000Z",
};

const matchStub = {
    params: {
        id: 1,
    },
};

const onSubmitParameters = {
    id: leaveStub.id,
    workerId: leaveStub.workerId,
    leaveType: {
        value: leaveStub.annual,
    },
    start: {
        format: jest.fn(),
    },
    end: {
        format: jest.fn(),
    },
};

const workerStub = {
    id: leaveStub.workerId,
    name: "Test Worker",
};

describe("EditLoadingFormContainer", () => {
    beforeEach(() => {
        leaveService.getById.mockResolvedValue(leaveStub);
        leaveService.getTypes.mockResolvedValue([]);
        leaveService.edit.mockResolvedValue();
        leaveService.destroy.mockResolvedValue();
        workersService.getById.mockResolvedValue(workerStub);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(<EditLeaveFormContainer match={matchStub} />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        leaveService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(EditLeaveForm)).toHaveLength(1);
    });

    it("calls edit service on form submission", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});

        await act(async () => {
            wrapper
                .find(EditLeaveForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});

        expect(leaveService.edit).toHaveBeenCalledTimes(1);
    });

    it("shows error if edit fails", async () => {
        leaveService.edit.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);

        await act(async () => {
            wrapper
                .find(EditLeaveForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});

        expect(leaveService.edit).toHaveBeenCalledTimes(1);
        expect(wrapper.text()).toContain(testError.message);
    });

    it("calls delete service on delete click", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});

        await act(async () => {
            wrapper
                .find(Delete)
                .props()
                .handleClick();
        });
        wrapper.setProps({});
        expect(leaveService.destroy).toHaveBeenCalledWith(leaveStub.id);
    });

    it("shows error if delete fails", async () => {
        leaveService.destroy.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditLeaveFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});

        await act(async () => {
            wrapper
                .find(Delete)
                .props()
                .handleClick();
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
