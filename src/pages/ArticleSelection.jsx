import React from "react";
import { useNavigate } from "react-router-dom";
import { SpeechContext } from "../context/SpeechRecognitionContext";
import { manageTranscript } from "../utils/transcriptUtils";
import { useContext, useRef, useEffect, useState } from "react";

const ArticleSelection = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const searchArticleInput = useRef(null);
  const next = useRef(null);
  const search = useRef(null);

  const instructionsElements = {
    Buscar: search,
    nombre: searchArticleInput,
    siguiente: next,
  };

  const articleList = [
    { name: "Laptop", price: 15000 },
    { name: "Mouse", price: 500 },
    { name: "Keyboard", price: 1000 },
    { name: "Monitor", price: 3000 },
  ];

  const handleSearch = () => {
    const searchValue = searchArticleInput.current.value;
    const searchResults = articleList.filter((article) => {
      return article.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setArticles(searchResults);
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

      if (transcript.includes(currentInstruction)) {
        const element = instructionsElements[currentInstruction].current;

        if (element instanceof HTMLButtonElement) {
          element.click();
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
        navigate("/search-client");
      }
    };

    handleInstructions();
  }, [transcript]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
      <div className="p-4">
        <h2 className="text-lg font-bold">Selecciona un Artículo</h2>
        <div className="mt-4">
          <label htmlFor="search">Nombre del artículo</label>
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
          onClick={handleSearch}
          ref={search}
        >
          Buscar
        </button>
        <div className="mt-4 text-gray-600">{transcript}</div>
      </div>
      <div className="w-full">
        <h2 className="text-lg font-bold mb-4">Resultados de búsqueda:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={index} className="border p-4 rounded-md shadow-sm">
                <p className="font-bold">{article.name}</p>
                <p>${article.price}</p>
              </div>
            ))
          ) : (
            <p>No se encontraron artículos.</p>
          )}
        </div>
      </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          id="next"
          ref={next}
          type="button"
          onClick={() => {
            navigate("/payment-selection");
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default ArticleSelection;
