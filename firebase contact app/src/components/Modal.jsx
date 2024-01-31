import React from "react";
import { IoCloseSharp } from "react-icons/io5"
import { createPortal } from "react-dom";

const Modal = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="z-50 h-screen w-screen absolute top-40 backdrop-blur-80" >

          <div className="m-auto relative z-40 min-h-[200px] max-w-[80%] bg-white">
            <div className="flex justify-end">
              <IoCloseSharp

                onClick={onClose} className="self-end text-2xl" />
            </div>
            {children}
          </div>


        </div>
        </>
      )}
    </>
    , document.getElementById("modal-root")
  );
};

export default Modal;
