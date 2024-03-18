import React, { useEffect } from 'react';

// Define el componente de Next.js
const ModalComponent = () => {
  useEffect(() => {
    // Simula el clic en el checkbox para mostrar el modal automáticamente
    const checkbox = document.getElementById("my_modal_6");
    checkbox.checked = true;
  }, []);

  return (
    <>
      {/* Coloca esta parte antes de la etiqueta </body> */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" defaultChecked />
      <div className="modal fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
        <div className="modal-box bg-white rounded-lg shadow-lg p-6">
          <h3 className="font-bold text-2xl text-center text-gray-900 mb-4">Registro de Visitas</h3>
          <p className="text-lg text-gray-800 mb-6 text-center">¡Hola! Parece que no se han registrado visitas para este día.</p>
          <p className="text-lg text-gray-800 mb-6 text-center">Asegúrate de que los chicos estén cumpliendo con sus visitas a las comunidades asignadas.</p>
          <div className="flex justify-center">
            {/* El botón para cerrar el modal */}
            <label htmlFor="my_modal_6" className="btn btn-outline btn-blue-600">Cerrar</label>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalComponent;