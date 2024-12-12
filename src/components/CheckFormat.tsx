import React, { useEffect, useState } from "react";

const CheckFormat: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCorrectFormat, setIsCorrectFormat] = useState(false);

  const checkFormat = () => {
    const width = window.innerWidth;

    if (width === 390) {
      setIsCorrectFormat(true);
    } else {
      setIsCorrectFormat(false);
    }
  };

  useEffect(() => {
    checkFormat();

    window.addEventListener("resize", checkFormat);

    return () => window.removeEventListener("resize", checkFormat);
  }, []);

  if (!isCorrectFormat) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white text-center">
        <h2 className="text-3xl w-[65%] ">
          Unsupported device dimensions. Please use a device with width of 
          <span className="text-3xl text-red-500"> 390PX</span> like the iPhone 12, 13 PRO.
        </h2>
      </div>
    );
  }

  return <>{children}</>;
};

export default CheckFormat;
