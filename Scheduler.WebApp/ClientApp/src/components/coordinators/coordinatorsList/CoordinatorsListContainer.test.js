import React from "react";
import CoordinatorsListContainer from "./CoordinatorsListContainer";
import CoordinatorsList from "./CoordinatorsList";
import { coordinatorsService } from "../../../services";
import { Loading, LoadingFailure } from "../../common/loading";
import { shallow } from "enzyme";
import { mountWithProvider } from "../../../utils";
import { act } from "react-dom/test-utils";

jest.mock("../../../services");

describe("CoordinatorsListContainer", () => {
    beforeEach(() => jest.clearAllMocks());

    it("shows loading initially", () => {
        coordinatorsService.getAll.mockResolvedValueOnce();
        const wrapper = shallow(<CoordinatorsListContainer />);
        expect(wrapper.find(Loading)).toHaveLength(1);
    });

    it("shows error correctly", async () => {
        coordinatorsService.getAll.mockRejectedValueOnce(new Error());
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CoordinatorsListContainer />);
        });
        expect(wrapper.find(LoadingFailure)).toHaveLength(0);
        wrapper.setProps({});
        expect(wrapper.find(LoadingFailure)).toHaveLength(1);
    });

    it("renders coordinators once loaded", async () => {
        coordinatorsService.getAll.mockResolvedValueOnce([]);
        let wrapper;
        await act(async () => {
            wrapper = mountWithProvider(<CoordinatorsListContainer />);
        });
        expect(wrapper.find(CoordinatorsList)).toHaveLength(0);
        wrapper.setProps({});
        expect(wrapper.find(CoordinatorsList)).toHaveLength(1);
    });
});
