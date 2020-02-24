import React from "react";
import { shallow } from "enzyme";
import CoordinatorDetail from "./CoordinatorDetail";
import Modal from "../../common/modals";
import NoContent from "../../common/noContent";
import JobsList from "../../jobs/jobsList/JobsList";

const ActiveCoordinator = {
    id: 1,
    isActive: true,
    name: "Active Coordinator",
    jobs: [],
};

const CoordinatorWithJobs = {
    id: 1,
    isActive: true,
    name: "Coordinator With Jobs",
    jobs: [
        {
            id: 1,
            coordinatorId: 1,
            jobNumber: "1",
            description: "Test Job",
            location: "Test",
            isComplete: false,
            dateReceived: "2020-01-11T22:25:30.0000000Z",
        },
    ],
};

describe("Coordinator Detail", () => {
    const wrapper = shallow(
        <CoordinatorDetail coordinator={ActiveCoordinator} />
    );

    it("renders correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("displays the coordinator's name", () => {
        const heading = wrapper.find("h2");
        expect(heading.text()).toBe(ActiveCoordinator.name);
    });

    it("renders NoContent when there are no jobs", () => {
        expect(wrapper.find(NoContent)).toHaveLength(1);
    });

    it("doesn't render JobsList when there are no jobs", () => {
        expect(wrapper.find(JobsList)).toHaveLength(0);
    });

    it("renders JobsList when there are jobs", () => {
        const wrapper = shallow(
            <CoordinatorDetail coordinator={CoordinatorWithJobs} />
        );
        expect(wrapper.find(JobsList)).toHaveLength(1);
    });

    it("doesn't show modal initially", () => {
        expect(wrapper.find(Modal).props().show).toBe(false);
    });

    it("shows modal when delete is clicked", () => {
        const wrapper = shallow(
            <CoordinatorDetail coordinator={ActiveCoordinator} />
        );
        wrapper
            .find("EditDeleteGroup")
            .props()
            .handleDeleteClick();
        expect(wrapper.find(Modal).props().show).toBe(true);
    });

    it("calls the delete handler after modal success", () => {
        const mockDeleteHandler = jest.fn();
        const wrapper = shallow(
            <CoordinatorDetail
                coordinator={ActiveCoordinator}
                handleDelete={mockDeleteHandler}
            />
        );
        wrapper
            .find(Modal)
            .props()
            .handleSuccess();
        expect(mockDeleteHandler).toHaveBeenCalled();
    });

    it("hides the modal after success", () => {
        const wrapper = shallow(
            <CoordinatorDetail
                coordinator={ActiveCoordinator}
                handleDelete={jest.fn()}
            />
        );
        let modal = wrapper.find(Modal);
        modal.props().handleSuccess();
        expect(modal.props().show).toBe(false);
    });
});
