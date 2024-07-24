// pages/home.js

import { useState } from "react";
import Modal from "../../components/modal";

const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");
  const emAberto = [
    "João",
    "Emerson",
    "Vitor",
    "João",
    "Emerson",
    "Vitor",
    "João",
  ];
  const aprovado = ["Nathan", "Isabela"];
  const reprovado = ["Natália", "Cleber"];

  const handleCardClick = (name) => {
    setSelectedName(name);
    setOpenModal(true);
  };

  return (
    <div className="p-8 bg-zinc-100">
      <h1 className="text-3xl font-bold mb-6">Bem Vindo (Nome Usuario)</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[650px]">
        <div className="border border-blue-400 rounded p-5  overflow-auto">
          <h2 className="text-xl font-semibold mb-4">Em Aberto</h2>
          {emAberto.map((name, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
              key={index}
              onClick={() => handleCardClick(name)}
            >
              <p className="text-lg font-semibold">{name}</p>
            </div>
          ))}
        </div>
        <div className="border border-green-500 rounded p-5">
          <h2 className="text-xl font-semibold mb-4">Aprovado</h2>
          {aprovado.map((name, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
              key={index}
            >
              <p className="text-lg font-semibold">{name}</p>
            </div>
          ))}
        </div>
        <div className="border border-red-500 rounded p-5">
          <h2 className="text-xl font-semibold mb-4">Reprovado</h2>
          {reprovado.map((name, index) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4 cursor-pointer"
              key={index}
            >
              <p className="text-lg font-semibold">{name}</p>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        name={selectedName}
      />
    </div>
  );
};

export default HomePage;
