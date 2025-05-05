import "./OneDay.css";
import data from "../data";
import { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const OneDay = () => {
  const [index, setIndex] = useState(0); //výchozí je první den
  const { id, image, title, description } = data[index]; // destrukce - udaje odpovídající konkrétnímmu index

  // Automatické posouvání každých 5 sekund
  useEffect(() => {
    const slider = setInterval(() => {
      setIndex((prev) => (prev + 1) % data.length);
    }, 8000);

    return () => clearInterval(slider); // vyčisti při odpojení komponenty
  }, [data.length]);

  // Krajní hodnoty
  const checkIndex = (index) => {
    if (index < 0) {
      return data.length - 1; // když je index menší než 0, vrať poslední položku (kterou pozná podle počtu všech dat)
    } else if (index > data.length - 1) {
      return 0; // když je idex větší než poslední položka, vrať položku s indexem 0 - začátek
    } else {
      return index; // když ani jedno z toho neplatí - vrať normálně index
    }
  };

  // Funkce tlačítek
  const nextDay = () => {
    setIndex((index) => {
      const newIndex = index + 1;
      return checkIndex(newIndex); // použiju funkci check
    });
  };

  const previousDay = () => {
    setIndex((index) => {
      const newIndex = index - 1;
      return checkIndex(newIndex); // použiju funkci check
    });
  };

  // return
  return (
    <div className="one-day">
      <img src={image} />
      <h2>{title}</h2>
      <p>{description}</p>
      <button onClick={previousDay}>
        <FaArrowCircleLeft />
      </button>
      <button onClick={nextDay}>
        <FaArrowCircleRight />
      </button>
    </div>
  );
};

export default OneDay;
