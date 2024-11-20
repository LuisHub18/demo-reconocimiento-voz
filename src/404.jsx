import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SpeechContext } from "./context/SpeechRecognitionContext";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useContext(SpeechContext);


  useEffect(() => {
    if (transcript.includes("atrás")) {
      resetTranscript();
      handleClick();
    }
  }, [transcript]);

  const handleClick = () => {
    navigate("/");
  }
  return (
    <div className="text-center mt-12 font-sans text-gray-800">
      <h1 className="text-6xl mb-5">404</h1>
      <p className="text-2xl mb-8">Página web no encontrada</p>
      <button className="text-blue-600" onClick={()=> handleClick()}>
        Atrás
      </button>
    </div>
  );
};

export default NotFoundPage;
