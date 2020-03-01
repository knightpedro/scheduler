import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import TrainingDetail from "./TrainingDetail";
import { EditDeleteGroup } from "../../common/actions";
import Modal from "../../common/modals";

const trainingStub = {
    id: 1,
    description: "Test training",
    location: "Test room",
    start: "9:00am 29/2/2020",
    end: "11:00am 29/2/2020",
    workers: [],
};

describe("TrainingDetail", () => {
    it("shows training details", () => {
        const wrapper = shallow(<TrainingDetail training={trainingStub} />);
        const text = wrapper.text();
        expect(text).toContain(trainingStub.description);
        expect(text).toContain(trainingStub.location);
        expect(text).toContain(trainingStub.start);
        expect(text).toContain(trainingStub.end);
    });

    it("shows and hides delete modal correctly", async () => {
        let wrapper;
        let showModal;

        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetail training={trainingStub} />
            );
            wrapper
                .find(EditDeleteGroup)
                .props()
                .handleDeleteClick();
        });
        wrapper.setProps({});
        showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeTruthy();

        await act(async () => {
            wrapper = mountWithProvider(
                <TrainingDetail training={trainingStub} />
            );
            wrapper
                .find(Modal)
                .props()
                .handleHide();
        });
        wrapper.setProps({});
        showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeFalsy();
    });
});
