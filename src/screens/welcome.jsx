import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { initializeQuestions } from "../utils";

const Welcome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    initializeQuestions();
  }, []);
  return (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl font-bold mb-8">
        Welcome to our Survey
      </h1>
      <button
        className="rounded-full px-6 py-3 font-bold bg-white text-gray-800 hover:opacity-75 delay-75 transition-opacity"
        onClick={() => navigate("/quiz")}
      >
        Start
      </button>
    </div>
  );
};

export default Welcome;
