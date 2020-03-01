import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider, testError } from "../../../utils";
import { oosService, resourcesService } from "../../../services";
import { Loading } from "../../common/loading";
import CreateOutOfServiceFormContainer from "./CreateOutOfServiceFormContainer";
import CreateOutOfServiceForm from "./CreateOutOfServiceForm";

jest.mock("../../../services");

const locationStub = {
    search: "?resourceId=1",
};

describe("CreateOutOfServiceContainer", () => {
    beforeEach(() => {
        oosService.create.mockResolvedValue();
        oosService.getReasons.mockResolvedValue([]);
        resourcesService.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("shows loading initially", () => {
        const wrapper = shallow(
            <CreateOutOfServiceFormContainer location={locationStub} />
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error if loading fails", async () => {
        resourcesService.getAll.mockRejectedValue(testError);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateOutOfServiceFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.text()).toContain(testError.message);
    });

    it("shows form once loaded", async () => {
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(
                <CreateOutOfServiceFormContainer location={locationStub} />
            );
        });
        wrapper.setProps({});
        expect(wrapper.find(Loading)).toHaveLength(0);
        expect(wrapper.find(CreateOutOfServiceForm)).toHaveLength(1);
    });
});
