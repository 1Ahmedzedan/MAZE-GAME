import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-[rgba(255,255,255,0.5)] backdrop-blur-sm	">
      <div className=" relative rounded-xl bg-white p-[100px] shadow-2xl shadow-[rgba(27,90,168,0.2)] mobile:p-[50px]">
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
