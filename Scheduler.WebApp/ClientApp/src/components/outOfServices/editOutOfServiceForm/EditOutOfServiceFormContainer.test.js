import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { oosService, resourcesService } from "../../../services";
import { Loading } from "../../common/loading";
import EditOutOfServiceFormContainer from "./EditOutOfServiceFormContainer";
import EditOutOfServiceForm from "./EditOutOfServiceForm";
import { Delete } from "../../common/actions";

jest.mock("../../../services");

const oosStub = {
    id: 1,
    resourceId: 1,
    reason: "Damage",
    description: "Test",
    start: "2020-02-29T19:00:00.0000000Z",
    end: "2020-02-29T23:00:00.0000000Z",
};

const matchStub = {
    params: {
        id: oosStub.id,
    },
};

const onSubmitParameters = {
    ...oosStub,
    description: "Edited Test",
    start: { format: jest.fn() },
    end: { format: jest.fn() },
};

const resourceStub = {
    id: oosStub.resourceId,
    name: "Test Resource",
};

describe("EditOutOfServiceFormContainer", () => {
    beforeEach(() => {
        oosService.edit.mockResolvedValue();
        oosService.destroy.mockResolvedValue();
        oosService.getById.mockResolvedValue(oosStub);
        oosService.getReasons.mockResolvedValue([]);
        resourcesService.getById.mockResolvedValue(resourceStub);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(
            <EditOutOfServiceFormContainer match={matchStub} />
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        oosService.getById.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(EditOutOfServiceForm)).toHaveLength(1);
    });

    it("calls delete service on delete click", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(Delete)
                .props()
                .handleClick();
        });
        expect(oosService.destroy).toHaveBeenCalledWith(oosStub.id);
    });

    it("shows error if delete fails", async () => {
        oosService.destroy.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
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
        expect(oosService.destroy).toHaveBeenCalledWith(oosStub.id);
        expect(wrapper.text()).toContain(testError.message);
    });

    it("calls edit service on form submission", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        await act(async () => {
            wrapper
                .find(EditOutOfServiceForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(oosService.edit).toHaveBeenCalledTimes(1);
    });

    it("shows error if edit fails", async () => {
        oosService.edit.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <EditOutOfServiceFormContainer match={matchStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).not.toContain(testError.message);

        await act(async () => {
            wrapper
                .find(EditOutOfServiceForm)
                .props()
                .handleSubmit(onSubmitParameters, { setSubmitting: jest.fn() });
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });
});
