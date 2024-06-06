import React, { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import { scenes } from "./Experience";
import leftArrow from "../assets/left-arrow.svg"; // Adjust the path to your SVG file
import rightArrow from "../assets/right-arrow.svg"; // Adjust the path to your SVG file
import logo from "../assets/logo.svg"; // Adjust the path to your SVG file
import "../index.css";

export const slideAtom = atom(0);
export const homeAtom = atom(false);

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [home, setHome] = useAtom(homeAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide]);

  const handleLogoClick = () =>{
    setHome(!home);
  };

  return (
    <div className={`overlay ${visible ? "visible" : "invisible"}`}>
      <img src={logo} alt="Logo" className="logo" onClick={handleLogoClick} />
      {!home && (
      <>
        <div className="nav">
          <img
            src={leftArrow}
            alt="Previous Slide"
            className="nav-button"
            onClick={() =>
              setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))
            }
          />
          <img
            src={rightArrow}
            alt="Next Slide"
            className="nav-button"
            onClick={() =>
              setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))
            }
          />
        </div>
        <div className="content">
          <h1 className="title">{scenes[displaySlide].name}</h1>
          <p className="description">{scenes[displaySlide].description}</p>
        </div>
      </>
      )}
      
    </div>
  );
};
