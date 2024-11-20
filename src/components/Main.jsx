import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SpeechContext } from "../context/SpeechRecognitionContext";

const Main = () => {
    const navigate = useNavigate();
    const { transcript } = useContext(SpeechContext);
    
    useEffect(() => {
        if (transcript.includes("venta")) {
            navigate("/search-client")
        } else if (transcript.includes("abono")) {
            navigate("*");
        } else if (transcript.includes("tiempo")) {
            navigate("*");
        }
    }, [transcript]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <h1 className="text-4xl font-bold mb-4">Inicio</h1>
            <p className="text-lg mb-8">¿Qué deseas hacer?</p>
            <div className="space-x-3">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={() => navigate("/search-client")}
                >
                    Venta
                </button>
                <button 
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                    onClick={() => navigate("*")}
                >
                    Abono
                </button>
                <button 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-yellow-700"
                    onClick={() => navigate("*")}
                >
                    Tiempo aire
                </button>
            </div>
        </div>        
    );
};

export default Main;