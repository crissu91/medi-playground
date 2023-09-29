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
  switch (true) {
    case input.respirationRange <= 8:
      score += 3;
      break;
    case input.respirationRange >= 9 && input.respirationRange <= 11:
      score += 1;
      break;
    case input.respirationRange >= 21 && input.respirationRange <= 24:
      score += 2;
      break;
    case input.respirationRange >= 25:
      score += 3;
      break;
  }
  return score;
}

module.exports = mediScoreCalc;
