import React, { useEffect, useRef, useContext, useState } from "react";
import { SpeechContext } from "../context/SpeechRecognitionContext";

const PaymentSelection = () => {
  const creditoButton = useRef(null);
  const efectivoButton = useRef(null);
  const [value, setValue] = useState("");
  const { transcript, resetTranscript } = useContext(SpeechContext);

  const instructionsElements = {
    efectivo: creditoButton,
    crédito: efectivoButton,
  };
  const instructions = Object.keys(instructionsElements);

  const handleClick = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const handleInstructions = async () => {
      let instructionsPositions = instructions.map((instruction) => {
        return transcript.lastIndexOf(instruction);
      });
      const maxPositionIndex = instructionsPositions.indexOf(
        Math.max(...instructionsPositions)
      );
      const currentInstruction = instructions[maxPositionIndex];

      if (transcript.includes(currentInstruction)) {
        resetTranscript();
        const element = instructionsElements[currentInstruction].current;
        element.focus();
        element.click();
      }
      if (transcript.includes("atrás")) {
        resetTranscript();
        navigate("/article-selection");
      }
    };
    handleInstructions();
  }, [transcript]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Proceso de Pago</h2>

      <div className="mt-4">
        <label htmlFor="payment">Tipo de Pago</label>
        <div className="mt-4 space-x-9">
          <button
            ref={creditoButton}
            onClick={() => handleClick("Efectivo")}
            className="p-2 bg-black text-white rounded hover:bg-gray-600 transition duration-300"
          >
            Efectivo
          </button>
          <button
            onClick={() => handleClick("Crédito")}
            ref={efectivoButton}
            className="p-2 bg-black text-white rounded hover:bg-gray-600 transition duration-300"
          >
            Crédito
          </button>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {value}
        </label>
      </div>
    </div>
  );
};

export default PaymentSelection;
