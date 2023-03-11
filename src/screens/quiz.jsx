import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import Button from "../components/button";
import { fetchQuestions, getAllSubmissions } from "../utils";

const Quiz = () => {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);
  const [completed, setCompleted] = useState(false);

  const handleRatingClick = (rating) => {
    console.log(rating);
    setSelectedRating(rating);
  };

  const handleNextQuestion = () => {
    setAnswersArr([
      ...answersArr,
      { ...questions[currentQuestion], answer: selectedRating },
    ]);
    setSelectedRating("");

    if (questions.length - 1 > currentQuestion)
      setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevQuestion = () => {
    setSelectedRating("");
    setCurrentQuestion(currentQuestion - 1);
  };

  const submitSurvey = () => {
    if (confirm("Do you want to submit the survey?")) {
      let submissions = getAllSubmissions() ?? [];
      setCurrentQuestion(currentQuestion + 1);

      localStorage.setItem(
        "quiz-submissions",
        JSON.stringify([
          ...submissions,
          {
            id: v4(),
            status: "COMPLETED",
            answers: [
              ...answersArr,
              { ...questions[currentQuestion], answer: selectedRating },
            ],
          },
        ])
      );
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  };

  useEffect(() => {
    console.log(`CURRENT ${currentQuestion} LENGTH: ${questions.length}`);
    if (questions.length > 0 && currentQuestion === questions.length) {
      setCompleted(true);
    }
  }, [submitSurvey]);

  useEffect(() => {
    let questionsArr = fetchQuestions();
    setQuestions(questionsArr);
  }, []);

  return (
    <div className="min-w-full h-screen flex items-center justify-center">
      {questions.length > 0 &&
      currentQuestion !== questions.length &&
      !completed ? (
        <div className="w-3/5 shadow-2xl bg-gray-100 rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-800 text-2xl font-bold">
              Customer Survey
            </h2>
            <div className="text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          <div className="mb-8">
            <h3 className="text-gray-800 text-lg font-bold mb-2">
              {`${currentQuestion + 1}. ${questions[currentQuestion].title}`}
            </h3>
            <div className="flex justify-center items-center">
              {questions[currentQuestion].type == "rating" ? (
                [
                  ...Array(questions[currentQuestion].maxRange)
                    .fill()
                    .map((_, i) => i + 1),
                ].map((rating) => (
                  <div
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className={`rounded-full h-16 w-16 flex justify-center items-center text-white text-2xl font-bold mr-4 cursor-pointer ${
                      selectedRating === rating
                        ? "bg-gradient-to-r from-green-400 to-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {rating}
                  </div>
                ))
              ) : (
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Write your feedback here:
                  </label>
                  <textarea
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Write your feedback here...."
                    cols={10}
                    rows={5}
                    value={selectedRating}
                    onChange={(ev) => setSelectedRating(ev.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              text="Previous"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              color="bg-gray-500"
              textColor="text-white"
            />
            <Button
              text={
                currentQuestion === questions.length - 1 ? "Submit" : "Next"
              }
              onClick={() =>
                currentQuestion === questions.length - 1
                  ? submitSurvey()
                  : handleNextQuestion()
              }
              color="bg-gradient-to-r from-green-400 to-blue-500"
              textColor="text-white"
            />
          </div>
        </div>
      ) : completed ? (
        <h3 className="text-gray-800 text-lg font-bold mb-2">
          Thank you for your feedback
        </h3>
      ) : (
        <div />
      )}
    </div>
  );
};
export default Quiz;