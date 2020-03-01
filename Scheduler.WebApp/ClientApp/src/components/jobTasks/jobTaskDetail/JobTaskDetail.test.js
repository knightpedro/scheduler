import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import JobTaskDetail from "./JobTaskDetail";
import Modal from "../../common/modals";
import { EditDeleteGroup } from "../../common/actions";

const jobTaskStub = {
    id: 1,
    job: {
        id: 1,
        jobNumber: "J1",
        description: "Test Job",
    },
    description: "Test Task",
    start: "2020-02-29 19:00",
    end: "2020-02-29 21:00",
    workers: [{ id: 1, name: "Test Worker 1" }],
    resources: [
        { id: 1, name: "Test Resource 1" },
        { id: 2, name: "Test Resource 2" },
    ],
};

describe("JobTaskDetail", () => {
    it("shows workers", () => {
        const wrapper = shallow(<JobTaskDetail jobTask={jobTaskStub} />);
        const text = wrapper.text();
        jobTaskStub.workers.forEach(w => {
            expect(text).toContain(w.name);
        });
    });

    it("shows resources", () => {
        const wrapper = shallow(<JobTaskDetail jobTask={jobTaskStub} />);
        const text = wrapper.text();
        jobTaskStub.resources.forEach(r => {
            expect(text).toContain(r.name);
        });
    });

    it("shows start and end time", () => {
        const wrapper = shallow(<JobTaskDetail jobTask={jobTaskStub} />);
        const text = wrapper.text();
        expect(text).toContain(jobTaskStub.start);
        expect(text).toContain(jobTaskStub.end);
    });

    it("hides modal initially", () => {
        const wrapper = shallow(<JobTaskDetail jobTask={jobTaskStub} />);
        const showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeFalsy();
    });

    it("shows and hides modal correctly", async () => {
        let wrapper;
        let showModal;

        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetail jobTask={jobTaskStub} />
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
                <JobTaskDetail jobTask={jobTaskStub} />
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

    it("hides the modal and calls delete handler on success", async () => {
        let wrapper;
        const handleDelete = jest.fn();
        await act(async () => {
            wrapper = mountWithProvider(
                <JobTaskDetail
                    jobTask={jobTaskStub}
                    handleDelete={handleDelete}
                />
            );
            wrapper
                .find(Modal)
                .props()
                .handleSuccess();
        });
        wrapper.setProps({});
        const showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeFalsy;
        expect(handleDelete).toHaveBeenCalledTimes(1);
    });
});
