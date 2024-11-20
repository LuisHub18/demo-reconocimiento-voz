import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpeechContext } from "../context/SpeechRecognitionContext";
import { useContext, useEffect } from "react";
import { manageTranscript} from '../utils/transcriptUtils';            

const SearchClient = () => {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const searchInput = useRef(null);
  const searchNumInput = useRef(null);
  const next = useRef(null);

  const instructionsElements = {
    "Buscar": searchInput,
    "número": searchNumInput,
    "siguiente": next
  }
  const instructions = Object.keys(instructionsElements);

  //Solve bug for writing into number input
  useEffect(() => {
    const handleInstructions = async () => {
      const instructionsPositions = instructions.map((instruction) => {
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
      <h2 className="text-lg font-bold">Selecciona un Cliente</h2>
      <div className="mt-4">
        <label htmlFor="search">Buscar cliente</label>
        <input
          type="text"
          id="search"
          className="block w-full mt-1"
          placeholder="Ingresa el nombre del cliente"
          ref={searchInput}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="searchNum">Número de cliente</label>
        <input
          type="text"
          id="searchNum"
          className="block w-full mt-1"
          placeholder="Ingresa el número del cliente"
          ref={searchNumInput}
        />
      </div>
      <div className="mt-4 flex-col">
        <button
          className="bg-black text-white py-2 px-4 rounded"
          id='next'
          ref={next}
          onClick={() => {
            navigate('/article-selection');
          }}
        >
          Siguiente
        </button>
        {transcript}
      </div>
    </div>
  );
};

export default SearchClient;