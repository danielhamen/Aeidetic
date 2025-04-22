export default function generateQuestion() {
  return {
    id: "quiz/cs/cs1000-program-execution/problem/q0001",
    prompt: "Is this a valid JavaScript identifier?",
    type: "multiple-choice",
    dynamic: false,
    shuffleChoices: true,
    choices: [
      {
        label: "0",
        correct: true,
      },
      {
        label: "1",
      },
      {
        label: "Infinity",
      },
      {
        label: "Does not Exist.",
      },
    ],
    explanation: "As x increases, 1/x approaches 0.",
  };
}
