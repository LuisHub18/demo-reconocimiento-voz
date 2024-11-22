import React from "react";
import { useNavigate } from "react-router-dom";
import { SpeechContext } from "../context/SpeechRecognitionContext";
import { manageTranscript } from "../utils/transcriptUtils";
import { useContext, useRef, useEffect, useState } from "react";

const ArticleSelection = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [description, setDescription] = useState(
    "No hay información disponible"
  );
  const { transcript, resetTranscript } = useContext(SpeechContext);
  const searchArticleInput = useRef(null);
  const quantityInput = useRef(null);
  const deliverySelect = useRef(null);
  const next = useRef(null);
  const search = useRef(null);

  const instructionsElements = {
    Buscar: search,
    nombre: searchArticleInput,
    entrega: deliverySelect,
    recoger: deliverySelect,
    siguiente: next,
    cantidad: quantityInput,
  };

  const articleList = [
    { name: "Laptop", description: "Acer Aspire 3", stock: 5, price: 15000 },
    { name: "Mouse", description: "Magic Mouse", stock: 5, price: 500 },
    { name: "Keyboard", description: "Logitech G120", stock: 5, price: 1000 },
    { name: "Monitor", description: "Samsung Vision", stock: 5, price: 3000 },
  ];

  const handleArticleChange = () => {
    const searchValue = searchArticleInput.current.value;
    const currentDescription =
      articleList.find((article) => {
        return article.name.toLowerCase() === searchValue.toLowerCase();
      })?.description || "No hay información disponible";
    setDescription(currentDescription);
  };

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
        } else if (element instanceof HTMLSelectElement) {
          element.selectedIndex = currentInstruction === "recoger"
            ? 0
            : currentInstruction === "entrega"
            ? 1
            : element.selectedIndex;
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selecciona un Artículo</h2>
          <div className="mb-4">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del artículo
            </label>
            <input
              type="text"
              id="search"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Ingresa el nombre del artículo"
              onBlur={handleArticleChange}
              ref={searchArticleInput}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="description"
              value={description}
              readOnly
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Cantidad
              </label>
              <input
                type="number"
                id="quantity"
                placeholder="Cantidad del artículo"
                ref={quantityInput}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="delivery"
                className="block text-sm font-medium text-gray-700"
              >
                Modo de entrega (E,R)
              </label>
              <select
                id="delivery"
                ref={deliverySelect}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              >
                <option>Recoger en tienda</option>
                <option>Entrega a domicilio</option>
              </select>
            </div>
          </div>
          <button
            className="w-full bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleSearch}
            ref={search}
          >
            Buscar
          </button>
          <div className="mt-4 text-gray-600">{transcript}</div>
        </div>
        <div className="w-full mt-6">
          <h2 className="text-xl font-semibold mb-4">Resultados de búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg shadow-md bg-white"
                >
                  <p>Nombre: {article.name}</p>
                  <p>Descripción: {article.description}</p>
                  <p>Stock: {article.stock}</p>
                  <p>Precio: ${article.price}</p>
                </div>
              ))
            ) : (
              <p>No se encontraron artículos.</p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="bg-black text-white py-2 px-4 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
