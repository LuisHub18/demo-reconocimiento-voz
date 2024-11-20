import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SpeechContext } from "../context/SpeechRecognitionContext";
import { manageTranscript} from '../utils/transcriptUtils';
import { useContext, useRef, useEffect } from "react";

const ArticleSelection = () => {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const searchArticleInput = useRef(null);
  const next = useRef(null);

  const instructionsElements = {
    "Buscar": searchArticleInput,
    "siguiente": next
  }

  const instructions = Object.keys(instructionsElements);
 
  useEffect(() => {
    const handleInstructions = async () => {
      let instructionsPositions = instructions.map((instruction) => {
        return transcript.lastIndexOf(instruction);
      });

      const maxPositionIndex = instructionsPositions.indexOf(Math.max(...instructionsPositions));
      const currentInstruction = instructions[maxPositionIndex];

      if (transcript.includes(currentInstruction)) {
        const element = instructionsElements[currentInstruction].current;

        if (element instanceof HTMLButtonElement) {
          element.click();
          resetTranscript();
        } else if (element instanceof HTMLInputElement) {
          element.focus();
          const newTranscriptSpeech = await manageTranscript(currentInstruction, transcript);
          element.value = newTranscriptSpeech;
        }
      }
    };

    handleInstructions();
  }, [transcript]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Selecciona un Artículo</h2>
      <div className="mt-4">
        <label htmlFor="search">Buscar artículo</label>
        <input
          type="text"
          id="search"
          className="block w-full mt-1"
          placeholder="Ingresa el nombre del artículo"
          ref={searchArticleInput}
        />
        </div>
        <button
          className="bg-black mt-5 text-white py-2 px-4 rounded"
          onClick={() => {
            navigate('/payment-selection');
          }}
          ref={next}
        >
          Siguiente
        </button>
    </div>
  );
};

export default ArticleSelection;