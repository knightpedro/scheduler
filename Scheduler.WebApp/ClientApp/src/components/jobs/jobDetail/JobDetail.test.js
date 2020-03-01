import React from "react";
import { act } from "react-dom/test-utils";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import JobDetail from "./JobDetail";
import JobTasksList from "../../jobTasks/jobTasksList";
import NoContent from "../../common/noContent";
import moment from "moment";
import { EditDeleteGroup } from "../../common/actions";
import Modal from "../../common/modals";

const tasklessJobStub = {
    id: 1,
    jobNumber: "J123",
    description: "Test Job",
    location: "Test Room",
    coordinator: null,
    isComplete: false,
    jobTasks: [],
};

const jobWithTasksStub = {
    ...tasklessJobStub,
    jobTasks: [
        {
            id: 1,
            description: "Test Task",
            start: moment("2020-01-20"),
            end: moment("2020-01-21"),
        },
    ],
};

describe("JobDetail", () => {
    it("shows NoContent if there are no tasks", () => {
        const wrapper = shallow(<JobDetail job={tasklessJobStub} />);
        expect(wrapper.find(NoContent)).toHaveLength(1);
    });

    it("shows tasks correctly", () => {
        const wrapper = shallow(<JobDetail job={jobWithTasksStub} />);
        expect(wrapper.find(NoContent)).toHaveLength(0);
        expect(wrapper.find(JobTasksList)).toHaveLength(1);
    });

    it("does not show modal intially", async () => {
        const wrapper = shallow(<JobDetail job={tasklessJobStub} />);
        const showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeFalsy();
    });

    it("shows and hides modal correctly", async () => {
        let wrapper;
        let showModal;

        // Fire delete click handler.
        await act(async () => {
            wrapper = mountWithProvider(<JobDetail job={tasklessJobStub} />);
            wrapper
                .find(EditDeleteGroup)
                .props()
                .handleDeleteClick();
        });
        wrapper.setProps({});
        // Assert modal is shown.
        showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeTruthy();

        // Fire hide modal handler
        await act(async () => {
            wrapper
                .find(Modal)
                .props()
                .handleHide();
        });
        wrapper.setProps({});
        // Assert modal is hidden
        showModal = wrapper.find(Modal).props().show;
        expect(showModal).toBeFalsy();
    });

    it("hides the modal and calls delete handler on modal success", async () => {
        let wrapper;
        const handleDelete = jest.fn();
        await act(async () => {
            wrapper = mountWithProvider(
                <JobDetail job={tasklessJobStub} handleDelete={handleDelete} />
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
