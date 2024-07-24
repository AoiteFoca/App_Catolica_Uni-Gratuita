import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, name }) => {
  const [statuses, setStatuses] = useState(Array(15).fill(null));

  useEffect(() => {
    setStatuses(Array(15).fill(null));
  }, [name]);

  if (!isOpen) return null;

  const handleMark = (index, status) => {
    const newStatuses = [...statuses];
    newStatuses[index] = status;
    setStatuses(newStatuses);
  };

  const allMarked = statuses.every((status) => status !== null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-xl font-bold mb-4">Anexos de {name}</h2>
        <div className="mb-4 grid grid-cols-5 gap-6">
          {statuses.map((status, index) => (
            <div
              key={index}
              className={`rounded shadow-md  mb-2 flex flex-col items-center justify-between p-2
                ${status === "confirmed" ? "border-2 border-green-500" : ""}
                ${status === "rejected" ? "border-2 border-red-500" : ""}`}
            >
              <div className="flex items-center justify-center w-full h-full">
                {/* Placeholder for anexo content */}
                {`Anexo ${index + 1}`}
              </div>
              <div className="flex mt-2">
                <button
                  className=" text-white rounded-full p-1 mx-1"
                  onClick={() => handleMark(index, "confirmed")}
                >
                  ✔️
                </button>
                <button
                  className=" text-white rounded-full p-1 mx-1"
                  onClick={() => handleMark(index, "rejected")}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full">
          {allMarked && (
            <button
              onClick={() => alert("Todos os anexos foram revisados!")}
              className="bg-blue-500 text-white rounded px-4 py-2 mt-4"
            >
              Finalizar
            </button>
          )}
          <button
            onClick={onClose}
            className="bg-gray-500 text-white rounded px-4 py-2 mt-4"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
