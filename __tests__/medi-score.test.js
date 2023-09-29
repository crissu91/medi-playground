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
  test("should return a score when receiving respirationRange as an input", () => {
    // less or equal to 8 should return 3
    expect(mediScoreCalc({ respirationRange: 3 })).toBe(3);
    expect(mediScoreCalc({ respirationRange: 8 })).toBe(3);
    //  between 9 - 11 should return 1
    expect(mediScoreCalc({ respirationRange: 9 })).toBe(1);
    expect(mediScoreCalc({ respirationRange: 11 })).toBe(1);
    // between 12 - 20 should return 0
    expect(mediScoreCalc({ respirationRange: 12 })).toBe(0);
    expect(mediScoreCalc({ respirationRange: 20 })).toBe(0);
    // between 21 – 24 should return 2
    expect(mediScoreCalc({ respirationRange: 21 })).toBe(2);
    expect(mediScoreCalc({ respirationRange: 24 })).toBe(2);
    // more or equal to 25 should return 3
    expect(mediScoreCalc({ respirationRange: 25 })).toBe(3);
    expect(mediScoreCalc({ respirationRange: 30 })).toBe(3);
  });
});
