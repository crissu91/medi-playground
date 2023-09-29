const mediScoreCalc = require("../MediScoreCalc");

const patientData = {
  airOrOxigen: "air",
  consciousness: "alert",
  respirationRange: 15,
  spO2: 95,
  temperature: 37.1,
};

describe("mediScoreCalc()", () => {
  test("should return a score when receiving airOrOxigen as an input value", () => {
      expect(mediScoreCalc({ airOrOxigen: 'air' })).toBe(0);
      expect(mediScoreCalc({airOrOxigen: 'oxigen'})).toBe(2);
  });
});
