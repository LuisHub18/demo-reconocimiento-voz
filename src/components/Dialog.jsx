import { useEffect, useContext } from "react";
import { SpeechContext } from "../context/SpeechRecognitionContext";

const SimpleDialog = ({ open, handleClose = () => {} }) => {

  const { transcript, resetTranscript } = useContext(SpeechContext);


  useEffect(() => {
      if(transcript.includes("cerrar")) {
        handleClose();
        resetTranscript();
      }
  }, [transcript]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3">
            <div className="border-b px-4 py-2">
              <h2 className="text-lg text-green-500">EXITO</h2>
            </div>
            <div className="p-4 font-bold text-center">Venta finalizada correctamente!</div>
            <div className="border-t px-4 py-2 flex justify-end">
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleDialog;
