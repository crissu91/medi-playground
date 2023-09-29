const mediScoreCalc = require("../MediScoreCalc");

const patientData = {
  airOrOxigen: "air",
  consciousness: "alert",
  respirationRange: 15,
  spO2: 95,
  temperature: 37.1,
};

describe("mediScoreCalc()", () => {
  test("should return a score when receiving airOrOxigen as an input", () => {
    expect(mediScoreCalc({ airOrOxigen: "air" })).toBe(0);
    expect(mediScoreCalc({ airOrOxigen: "oxigen" })).toBe(2);
  });
  test("should return a score when receiving consciousness as an input", () => {
      expect(mediScoreCalc({ consciousness: "alert" })).toBe(0);
      expect(mediScoreCalc({ consciousness: "CVPU" })).toBe(3);
  });
});
