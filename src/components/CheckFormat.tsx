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
      <div className="flex flex-col justify-center items-center h-screen bg-black text-white text-center gap-8">
        <h2 className="text-3xl w-[65%] ">
          Unsupported device dimensions. Please use a device with a width of 
          <span className="text-3xl text-red-500 font-semibold"> 390px</span> such as the iPhone 13 Pro.
        </h2>
        <h3 className="text-2xl">Search for “Mobile Simulator” in the Chrome Web Store.</h3>
      </div>
    );
  }

  return <>{children}</>;
};

export default CheckFormat;
