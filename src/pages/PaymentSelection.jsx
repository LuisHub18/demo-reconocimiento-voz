import React, { useEffect, useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SpeechContext } from "../context/SpeechRecognitionContext";
import SimpleDialog from "../components/Dialog";

const PaymentSelection = () => {
 const payMethod = useRef(null);
  const [totalToPay, setTotalToPay] = useState("100");
  const endSell = useRef(null);
  const [open, setOpen] = useState(false);
  
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/search-client");
  };

  const instructionsElements = {
    finalizar: endSell,
    efectivo: payMethod,
    crédito: payMethod,
  };

  const instructions = Object.keys(instructionsElements);

  useEffect(() => {
    const handleInstructions = async () => {
      let instructionsPositions = instructions.map((instruction) => {
        return transcript.lastIndexOf(instruction);
      });
      const maxPositionIndex = instructionsPositions.indexOf(
        Math.max(...instructionsPositions)
      );
      const currentInstruction = instructions[maxPositionIndex];
      const element = instructionsElements[currentInstruction].current;
      if (element instanceof HTMLSelectElement) {
        element.selectedIndex = currentInstruction === "efectivo"
        ? 0
        : currentInstruction === "crédito"
        ? 1
        : element.selectedIndex;
      }
      if(transcript.includes("finalizar")) {
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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Proceso de Pago</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="totalCredito" className="block text-gray-700 font-medium mb-2">Total a Crédito:</label>
            <input
              type="text"
              id="totalCredito"
              value={totalToPay}
              onChange={(e) => setTotalToPay(e.target.value)}
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="pagoInicial" className="block text-gray-700 font-medium mb-2">Pago Inicial:</label>
            <input
              type="text"
              id="pagoInicial"
              value="3"
              readOnly
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="totalEfectivo" className="block text-gray-700 font-medium mb-2">Total en efectivo:</label>
          <input
            type="text"
            id="totalEfectivo"
            readOnly
            value="50"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="payment" className="block text-gray-700 font-medium mb-2">Tipo de Pago (Efectivo, crédito)</label>
          <div className="mt-2">
            <select className="w-full p-2 border rounded" ref={payMethod}>
              <option>Efectivo</option>
              <option>Crédito</option>
            </select>
          </div>
        </div>
        <button
        className="w-full bg-black text-white p-2 rounded hover:bg-gray-600"
        ref={endSell}
        onClick={handleClickOpen}
        >
          Finalizar venta
        </button>
        <SimpleDialog open={open} handleClose={handleClose} />
        <div className="mt-4 text-gray-600">{transcript}</div>
      </div>
    </div>
  );
};

export default PaymentSelection;
