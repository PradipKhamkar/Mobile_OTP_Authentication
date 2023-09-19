import React from "react";
import { JsxElement } from "typescript";

interface IProp {
  children: React.ReactNode;
}

const FormContainer: React.FC<IProp> = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen flex-col md:p-10">
      <div className="glass py-5 px-5 md:px-10 md:h-[35rem] md:w-[30rem]">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;
