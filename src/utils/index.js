import { v4 } from "uuid";

const questions = [
  {
    id: v4(),
    title: "How satisfied are you with our products? ",
    type: "rating",
    minRange: 1,
    maxRange: 5,
  },
  {
    id: v4(),
    title: "How fair are the prices compared to similar retailers?",
    type: "rating",
    minRange: 1,
    maxRange: 5,
  },
  {
    id: v4(),
    title: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    minRange: 1,
    maxRange: 5,
  },
  {
    id: v4(),
    title:
      "On a scale of 1-10 how would you recommend us to your friends and family?",
    type: "rating",
    minRange: 1,
    maxRange: 10,
  },
  {
    id: v4(),
    title: "What could we do to improve our service?",
    type: "text",
  },
];

export const initializeQuestions = () => {
  localStorage.setItem("quiz-questions", JSON.stringify(questions));
};

export const fetchQuestions = () => {
  return JSON.parse(localStorage.getItem("quiz-questions"));
};

export const getAllSubmissions = () => {
  return JSON.parse(localStorage.getItem("quiz-submissions"));
};
