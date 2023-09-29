const calculateRespirationScore = (respirationRange) => {
  switch (true) {
    case respirationRange <= 8:
      return 3;
    case respirationRange >= 9 && respirationRange <= 11:
      return 1;
    case respirationRange >= 21 && respirationRange <= 24:
      return 2;
    case respirationRange >= 25:
      return 3;
    default:
      return 0;
  }
};

const calculateSpO2Score = (spO2, airOrOxigen) => {
  switch (true) {
    case spO2 <= 83:
      return 3;
    case spO2 >= 84 && spO2 <= 85:
      return 2;
    case spO2 >= 86 && spO2 <= 87:
      return 1;
    case spO2 >= 93 && spO2 <= 94 && airOrOxigen === "oxigen":
      return 1;
    case spO2 >= 95 && spO2 <= 96 && airOrOxigen === "oxigen":
      return 2;
    case spO2 >= 95 && airOrOxigen === "oxigen":
      return 3;
    default:
      return 0;
  }
};

const calculateTemperatureScore = (temperature) => {
  switch (true) {
    case temperature <= 35:
      return 3;
    case temperature >= 35.1 && temperature <= 36:
      return 1;
    case temperature >= 38.1 && temperature <= 39:
      return 1;
    case temperature >= 39.1:
      return 3;
    default:
      return 0;
  }
};

function mediScoreCalc(input) {
  let score = 0;
  if (input.airOrOxigen === "oxigen") {
    score += 2;
  }
  if (input.consciousness === "CVPU") {
    score += 3;
  }
  score += calculateRespirationScore(input.respirationRange);
  score += calculateSpO2Score(input.spO2, input.airOrOxigen);
  score += calculateTemperatureScore(input.temperature);

  return score;
}

module.exports = mediScoreCalc;
