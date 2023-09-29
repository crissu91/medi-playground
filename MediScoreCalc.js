const patientData = {
  airOrOxigen: "air",
  consciousness: "alert",
  respirationRange: 15,
  spO2: 95,
  temperature: 37.1,
};

function mediScoreCalc(input) {
  let score = 0;
  if (input.airOrOxigen === "oxigen") {
    score += 2;
  }
  if (input.consciousness === "CVPU") {
    score += 3;
  }

  return score;
}

module.exports = mediScoreCalc;
