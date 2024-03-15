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
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This modal works with a hidden checkbox!</p>
          <div className="modal-action">
            {/* El botón para cerrar el modal */}
            <label htmlFor="my_modal_6" className="btn">Close!</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalComponent;
