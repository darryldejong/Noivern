// src/components/BotData.js

const learnedResponses = {};

export const getBotResponse = (userInput) => {
  const lowerCaseInput = userInput.toLowerCase();

  if (lowerCaseInput.includes("hallo")) {
    return "Hallo! Hoe kan ik je helpen?";
  } else if (lowerCaseInput.includes("hoe gaat het")) {
    return "Met mij gaat het goed, dank je! En met jou?";
  } else if (lowerCaseInput.includes("dank je")) {
    return "Graag gedaan!";
  } else if (lowerCaseInput.includes("wat betekent")) {
    const phrase = lowerCaseInput.replace("wat betekent", "").trim();
    if (learnedResponses[phrase]) {
      return `Ik weet al wat "${phrase}" betekent: ${learnedResponses[phrase]}`;
    } else {
      return `Ik weet niet wat "${phrase}" betekent. Kun je het uitleggen?`;
    }
  } else if (learnedResponses[lowerCaseInput]) {
    return learnedResponses[lowerCaseInput];
  } else {
    return `Ik begrijp "${userInput}" niet. Wat betekent dat?`;
  }
};

export const learnNewResponse = (phrase, meaning) => {
  const lowerCasePhrase = phrase.toLowerCase();
  learnedResponses[lowerCasePhrase] = meaning;
  return `Ik heb geleerd wat "${phrase}" betekent. Dank je!`;
};