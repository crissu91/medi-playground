const patientData = {
  airOrOxigen: "air",
  consciousness: "alert",
  respirationRange: 15,
  spO2: 95,
  temperature: 37.1,
};

function mediScoreCalc(input) {
  if (input.airOrOxigen === "air") {
    return 0;
  } else return 2;
}

module.exports = mediScoreCalc;
