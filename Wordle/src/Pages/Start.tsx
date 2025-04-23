import React from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const seleccionarDificultad = (nivel: "facil" | "normal" | "dificil") => {
    localStorage.setItem("dificultad", nivel);
    navigate("/game");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center gap-6">
      <h1 className="text-4xl font-bold">Wordle</h1>
      <p className="text-lg mb-4">Selecciona la dificultad</p>
      <div className="flex gap-4">
        <button onClick={() => seleccionarDificultad("facil")} className="bg-green-600 px-6 py-3 rounded hover:bg-green-700">
          Fácil
        </button>
        <button onClick={() => seleccionarDificultad("normal")} className="bg-yellow-500 px-6 py-3 rounded hover:bg-yellow-600">
          Normal
        </button>
        <button onClick={() => seleccionarDificultad("dificil")} className="bg-red-600 px-6 py-3 rounded hover:bg-red-700">
          Difícil
        </button>
      </div>
    </div>
  );
};

export default Start;
