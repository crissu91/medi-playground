const calculateRespirationScore = (respirationRange) => {
  switch (true) {
    case respirationRange >= 9 && respirationRange <= 11:
      return 1;
    case respirationRange >= 21 && respirationRange <= 24:
      return 2;
    case respirationRange <= 8 || respirationRange >= 25:
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

const calculateCbgScore = (CBG, fasted) => {
  switch (true) {
    case CBG <= 3.4 && fasted === true:
      return 3;
    case CBG >= 3.5 && CBG <= 3.9 && fasted === true:
      return 2;
    case CBG >= 5.5 && CBG <= 5.9 && fasted === true:
      return 2;
    case CBG >= 6 && fasted === true:
      return 3;
    case CBG <= 4.5 && fasted === false:
      return 3;
    case CBG >= 4.6 && CBG <= 5.8 && fasted === false:
      return 2;
    case CBG >= 7.9 && CBG <= 8.9 && fasted === false:
      return 2;
    case CBG >= 9 && fasted === false:
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
  score += calculateCbgScore(input.CBG, input.fasted);

  return score;
}

function isWithin24Hours(date2, date1) {
  let diff = (date2.getTime() - date1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff)) < 24;
}
function scoreDiff(score2, score1) {
  if (score2 - score1 >= 2) {
    return true;
  }
  return false;
}

function alert(patientData) {
  const arrayOfScores = patientData.map((record) => ({
    timeWhenTested: record.timeWhenTested,
    score: mediScoreCalc(record.observations),
  }));
  const over24 = isWithin24Hours(
    arrayOfScores[1].timeWhenTested,
    arrayOfScores[0].timeWhenTested
  );
  const score = scoreDiff(arrayOfScores[1].score, arrayOfScores[0].score);

  if (over24 && score) {
    return "Additional risk: Score increased by more than 2 points within 24 hours";
  } else return "No major changes";
}

module.exports = { mediScoreCalc, isWithin24Hours, scoreDiff, alert };
