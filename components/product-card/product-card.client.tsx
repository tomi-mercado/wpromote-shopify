"use client";

import { useState } from "react";

function PlantAnimation({ isGrowing }: { isGrowing: boolean }) {
  return (
    <div
      className={`absolute w-[2%] h-[35%] right-16 bottom-0 bg-slate-800/5 transition-all duration-1000 ${
        isGrowing ? "animate-grow" : "opacity-0 duration-500"
      }`}
    >
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`absolute w-[700%] h-[10%] rounded-full bg-slate-800/5 transition-all duration-1000 ${
            isGrowing ? "animate-leafGrow" : ""
          } ${getLeafStyles(i)}`}
        >
          <div className="absolute w-[80%] h-[1%] bg-slate-800/5 top-[48%]" />
        </div>
      ))}
    </div>
  );
}

function getLeafStyles(index: number) {
  switch (index) {
    case 1:
      return "top-[70%] left-[50%] -rotate-[25deg]";
    case 2:
      return "top-[50%] right-[50%] rotate-[205deg]";
    case 3:
      return "top-[30%] left-[50%] -rotate-[25deg]";
    case 4:
      return "top-[20%] right-[50%] rotate-[205deg]";
    case 5:
      return "top-[-17%] left-[-120%] -rotate-[60deg] animate-topLeafRight";
    case 6:
      return "top-[-9%] right-[22%] rotate-[195deg] animate-topLeafLeft";
    default:
      return "";
  }
}

export const ProductCardWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isGrowing, setIsGrowing] = useState(false);

  return (
    <div
      className={
        "bg-background-primary rounded-lg overflow-hidden shadow-lg duration-300 hover:shadow-xl flex flex-col relative hover:transform hover:scale-105 transition-transform"
      }
      onMouseEnter={() => {
        setIsGrowing(true);
      }}
      onMouseLeave={() => {
        setIsGrowing(false);
      }}
    >
      {children}
      <div className="absolute bottom-0 right-0 h-full w-full z-0">
        <PlantAnimation isGrowing={isGrowing} />
      </div>
    </div>
  );
};
