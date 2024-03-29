const {
  mediScoreCalc,
  isWithin24Hours,
  scoreDiff,
  alert,
} = require("../MediScoreCalc");

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
    airOrOxigen: "oxigen",
    consciousness: "CVPU",
    respirationRange: 23,
    spO2: 88,
    temperature: 38.5,
  },
  {
    airOrOxigen: "air",
    consciousness: "alert",
    respirationRange: 15,
    spO2: 95,
    temperature: 37.1,
    CBG: 3.4,
    fasted: true,
  },
  {
    airOrOxigen: "oxigen",
    consciousness: "alert",
    respirationRange: 17,
    spO2: 95,
    temperature: 37.1,
    CBG: 5.9,
    fasted: false,
  },
  {
    airOrOxigen: "oxigen",
    consciousness: "CVPU",
    respirationRange: 23,
    spO2: 88,
    temperature: 38.5,
    CBG: 6,
    fasted: true,
  },
];

const patientTestsOverTime1 = [
  {
    timeWhenTested: new Date("October 1, 2023 08:11:00"),
    observations: {
      airOrOxigen: "air",
      consciousness: "alert",
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    },
  },
  {
    timeWhenTested: new Date("October 1, 2023 10:25:00"),
    observations: {
      airOrOxigen: "oxigen",
      consciousness: "CVPU",
      respirationRange: 23,
      spO2: 88,
      temperature: 38.5,
    },
  },
];
const patientTestsOverTime2 = [
  {
    timeWhenTested: new Date("October 1, 2023 08:11:00"),
    observations: {
      airOrOxigen: "air",
      consciousness: "alert",
      respirationRange: 15,
      spO2: 95,
      temperature: 37.1,
    },
  },
  {
    timeWhenTested: new Date("October 1, 2023 10:25:00"),
    observations: {
      airOrOxigen: "air",
      consciousness: "alert",
      respirationRange: 15,
      spO2: 95,
      temperature: 37,
    },
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
  test("should return a score when receiving CBG and a fasted boolean as an input", () => {
    // CBG equal or less than 3.4 and fasted = true should return 3
    expect(mediScoreCalc({ CBG: 3.4, fasted: true })).toBe(3);
    // CBG between 3.5 and 3.9 and fasted = true should return 2
    expect(mediScoreCalc({ CBG: 3.5, fasted: true })).toBe(2);
    expect(mediScoreCalc({ CBG: 3.9, fasted: true })).toBe(2);
    // CBG between 5.5 and 5.9 and fasted = true should return 2
    expect(mediScoreCalc({ CBG: 5.5, fasted: true })).toBe(2);
    expect(mediScoreCalc({ CBG: 5.9, fasted: true })).toBe(2);
    // CBG equal or more than 6 and fasted = true should return 3
    expect(mediScoreCalc({ CBG: 6, fasted: true })).toBe(3);
    // CBG equal or less than 4.5 and fasted = false should return 3
    expect(mediScoreCalc({ CBG: 4.5, fasted: false })).toBe(3);
    // CBG between 4.6 and 5.8 and fasted = false should return 2
    expect(mediScoreCalc({ CBG: 4.6, fasted: false })).toBe(2);
    expect(mediScoreCalc({ CBG: 5.8, fasted: false })).toBe(2);
    // CBG between 7.9 and 8.9 and fasted = false should return 2
    expect(mediScoreCalc({ CBG: 7.9, fasted: false })).toBe(2);
    expect(mediScoreCalc({ CBG: 8.9, fasted: false })).toBe(2);
    // CBG more or equal to 9 and fasted = false should return 3
    expect(mediScoreCalc({ CBG: 9, fasted: false })).toBe(3);
  });
  test("should return the total score when receiving multiple inputs", () => {
    expect(mediScoreCalc(patientList[0])).toBe(0);
    expect(mediScoreCalc(patientList[1])).toBe(4);
    expect(mediScoreCalc(patientList[2])).toBe(8);
    expect(mediScoreCalc(patientList[3])).toBe(3);
    expect(mediScoreCalc(patientList[4])).toBe(4);
    expect(mediScoreCalc(patientList[5])).toBe(11);
  });
});
describe("isWithin24Hours", () => {
  test("should return true when the time difference is within 24 hours and false if not", () => {
    const olderTimestamp1 = new Date("September 29, 2023 08:11:00");
    const newerTimestamp2 = new Date("September 29, 2023 20:00:00");
    expect(isWithin24Hours(newerTimestamp2, olderTimestamp1)).toBe(true);
    const olderTimestamp3 = new Date("September 29, 2023 08:11:00");
    const newerTimestamp4 = new Date("September 31, 2023 13:04:00");
    expect(isWithin24Hours(newerTimestamp4, olderTimestamp3)).toBe(false);
  });
});
describe("scoreDiff", () => {
  test("should return true when the score difference is greater than or equal to 2 and false when is not", () => {
    expect(scoreDiff(10, 8)).toBe(true);
    expect(scoreDiff(10, 9)).toBe(false);
  });
});
describe("alert", () => {
  test("should return a risk alert if time difference is less than 24 hrs and score more than 2", () => {
    expect(alert(patientTestsOverTime1)).toEqual(
      "Additional risk: Score increased by more than 2 points within 24 hours"
    );
  });
  test("should return an info alert if time difference is less than 24 hrs and score less than 2", () => {
    expect(alert(patientTestsOverTime2)).toEqual("No major changes");
  });
});
