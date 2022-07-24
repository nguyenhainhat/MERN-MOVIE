import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stateModal } from "../../features/modal/modalSlice";
import "./modal.scss";

const Modal = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(!props.active);
  }, [props.active]);

  return (
    <div
      id={props.id ? props.id : "modalLogin"}
      className={`modal ${active ? "active" : ""}`}
    >
      {props.children}
    </div>
  );
};
export const ModalContent = (props) => {
  const contentRef = useRef(null);
  const activeModal = useSelector((state) => state.modal.activeModal);
  const disPatch = useDispatch();
  const [active, setActive] = useState(true);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    // if(props.onClose) props.onClose();
    disPatch(stateModal(!active));
  };

  return (
    <div ref={contentRef} className="modal_content">
      {props.children}

      <div className="modal_content_close" onClick={closeModal}>
        <i className="bx bx-x"></i>
      </div>
    </div>
  );
};

export default Modal;
