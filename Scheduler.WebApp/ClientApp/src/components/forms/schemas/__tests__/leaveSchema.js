import leaveSchema from "../leaveSchema";
import { ValidationError } from "yup";

const leaveStub = {
  start: new Date(2020, 4, 31, 8, 0, 0),
  end: new Date(2020, 4, 31, 16, 30, 0),
  workerId: 1,
  leaveType: "annual",
};

describe("leaveSchema", () => {
  it("is valid for a valid entity", () => {
    return leaveSchema.validate(leaveStub).then((values) => {
      expect(values).toBe(leaveStub);
    });
  });

  it("throws validation error when end is before start", () => {
    const stub = { ...leaveStub, end: new Date(2010, 1, 1) };
    const expected = new ValidationError("End must be after start");
    return leaveSchema
      .validate(stub)
      .catch((error) => expect(error).toEqual(expected));
  });
});
