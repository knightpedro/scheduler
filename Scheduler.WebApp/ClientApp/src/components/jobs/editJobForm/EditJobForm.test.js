import React from "react";
import { mountWithProvider } from "../../../utils";
import EditJobForm from "./EditJobForm";
import { BaseForm } from "../../common/forms";
import moment from "moment";

const coordinatorsStub = [
    {
        value: 1,
        label: "Test Coordinator 1",
    },
    {
        value: 2,
        label: "Test Coordinator 2",
    },
];

const jobStub = {
    id: 1,
    jobNumber: "J123",
    description: "Test Job",
    location: "Test Room",
    dateReceived: moment(),
    coordinator: coordinatorsStub[0],
    isComplete: false,
};

describe("EditJobForm", () => {
    let wrapper;
    it("show the correct initial values", () => {
        wrapper = mountWithProvider(
            <EditJobForm job={jobStub} coordinators={coordinatorsStub} />
        );
        const formValues = wrapper.find(BaseForm).props().initialValues;
        expect(formValues).toBe(jobStub);
    });
});
