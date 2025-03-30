import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SpeechContext } from "../context/SpeechRecognitionContext";
import { useContext, useEffect, useState } from "react";
import { manageTranscript } from "../utils/transcriptUtils";

const SearchClient = () => {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const [clients, setClients] = useState("");
  const searchNameInput = useRef(null);
  const searchNumInput = useRef(null);
  const search = useRef(null);
  const next = useRef(null);

  const instructionsElements = {
    Buscar: search,
    nombre: searchNameInput,
    número: searchNumInput,
    siguiente: next,
  };
  const instructions = Object.keys(instructionsElements);

  const clientList = [
    { name: "Juan Perez", number: 123456, email: "test1@demo.com" },
    { name: "Maria Lopez", number: 654321, email: "test2@demo.com" },
    { name: "Pedro Ramirez", number: 987654, email: "test3@demo.com" },
    { name: "Ana Garcia", number: 456789, email: "test4@demo.com" },
  ];

  const handleSearch = () => {
    const searchNameValue = searchNameInput.current.value;
    const searchNumValue = searchNumInput.current.value;

    const searchResults = clientList.filter((client) => {
      return (
        client.name.toLowerCase().includes(searchNameValue.toLowerCase()) ||
        client.number.toString().includes(searchNumValue)
      );
    });

    setClients(searchResults);
  };

  //Solve bug for writing into number input
  useEffect(() => {
    const handleInstructions = async () => {
      const instructionsPositions = instructions.map((instruction) => {
        return transcript.lastIndexOf(instruction);
      });

      const maxPositionIndex = instructionsPositions.indexOf(
        Math.max(...instructionsPositions)
      );
      const currentInstruction = instructions[maxPositionIndex];

      if (transcript.includes(currentInstruction)) {
        const element = instructionsElements[currentInstruction].current;

        if (element instanceof HTMLButtonElement) {
          element.click();
          element.focus();
          resetTranscript();
        } else if (element instanceof HTMLInputElement) {
          element.focus();
          const newTranscriptSpeech = await manageTranscript(
            currentInstruction,
            transcript
          );
          element.value = newTranscriptSpeech;
        }
      }
      if (transcript.includes("atrás")) {
        resetTranscript();
        navigate("/");
      }
    };

    handleInstructions();
  }, [transcript]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full">
          <h2 className="text-xl font-semibold mb-6">Busca un Cliente</h2>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de cliente
              </label>
              <input
                type="text"
                id="search"
                className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa el nombre del cliente"
                ref={searchNameInput}
              />
            </div>
            <div>
              <label
                htmlFor="searchNum"
                className="block text-sm font-medium text-gray-700"
              >
                Número de cliente
              </label>
              <input
                type="text"
                id="searchNum"
                className="block w-full mt-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa el número del cliente"
                ref={searchNumInput}
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                className="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="button"
                ref={search}
                onClick={() => {
                  handleSearch();
                }}
              >
                Buscar
              </button>
            </div>
            <div className="mt-4 text-gray-600">{transcript}</div>
          </form>
        </div>
        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold mb-6">Resultados de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.length > 0 ? (
              clients.map((client) => (
                <div
                  key={client.number}
                  className="border p-4 rounded-lg shadow-sm"
                >
                  <p>Nombre: {client.name}</p>
                  <p>Número: {client.number}</p>
                  <p>Correo: {client.email}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron clientes.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700"
          id="next"
          ref={next}
          type="button"
          onClick={() => {
            navigate("/article-selection");
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default SearchClient;
