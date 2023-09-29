const mediScoreCalc = require("../MediScoreCalc");

const patientList = [
  {
    airOrOxigen: "air",
    consciousness: "alert",
    respirationRange: 15,
    spO2: 95,
    temperature: 37.1,
  },
  {
    airOrOxigen: "oxigen",
    consciousness: "alert",
    respirationRange: 17,
    spO2: 95,
    temperature: 37.1,
  },
  {
    airOrOxigen: "oxigen", //2
    consciousness: "CVPU", //3
    respirationRange: 23, // 2
    spO2: 88, // 0
    temperature: 38.5, // 1
  },
];

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
  test("should return a score when receiving SpO2 as an input", () => {
    // less or equal to 83 should return 3
    expect(mediScoreCalc({ spO2: 83 })).toBe(3);
    expect(mediScoreCalc({ spO2: 79 })).toBe(3);
    // between 84 - 85 should return 2
    expect(mediScoreCalc({ spO2: 84 })).toBe(2);
    expect(mediScoreCalc({ spO2: 85 })).toBe(2);
    // between 86 - 87 should return 1
    expect(mediScoreCalc({ spO2: 86 })).toBe(1);
    expect(mediScoreCalc({ spO2: 87 })).toBe(1);
    // between 88 - 92 or more or equal to 93 on air
    expect(mediScoreCalc({ spO2: 88 })).toBe(0);
    expect(mediScoreCalc({ spO2: 92 })).toBe(0);
    // equal or more than 93 on air should return 0
    expect(mediScoreCalc({ spO2: 93, airOrOxigen: "air" })).toBe(0);
    //between 93 - 94 on oxigen should return 3 (1 + 2)
    expect(mediScoreCalc({ spO2: 93, airOrOxigen: "oxigen" })).toBe(3);
    expect(mediScoreCalc({ spO2: 94, airOrOxigen: "oxigen" })).toBe(3);
    //between 95 - 96 on oxigen should return 4 (2+2)
    expect(mediScoreCalc({ spO2: 95, airOrOxigen: "oxigen" })).toBe(4);
    expect(mediScoreCalc({ spO2: 96, airOrOxigen: "oxigen" })).toBe(4);
    // equal or more than 97 on oxigen should return 5 (3+2)
    expect(mediScoreCalc({ spO2: 97, airOrOxigen: "oxigen" })).toBe(5);
  });
  test("should return a score when receiving temperature as an input", () => {
    // less or equal to 35 should return 3
    expect(mediScoreCalc({ temperature: 35 })).toBe(3);
    // between 35.1 - 36 should return 1
    expect(mediScoreCalc({ temperature: 35.1 })).toBe(1);
    expect(mediScoreCalc({ temperature: 36 })).toBe(1);
    // between 36.1 - 38 should return 0
    expect(mediScoreCalc({ temperature: 36.1 })).toBe(0);
    expect(mediScoreCalc({ temperature: 38 })).toBe(0);
    //between 38.1 - 39 should return 1
    expect(mediScoreCalc({ temperature: 38.1 })).toBe(1);
    expect(mediScoreCalc({ temperature: 39 })).toBe(1);
    // equal or more than 39.1 should return 3
    expect(mediScoreCalc({ temperature: 39.1 })).toBe(3);
  });
  test("should return the total score when receiving multiple inputs", () => {
    expect(mediScoreCalc(patientList[0])).toBe(0);
    expect(mediScoreCalc(patientList[1])).toBe(4);
    expect(mediScoreCalc(patientList[2])).toBe(8);
  });
});
