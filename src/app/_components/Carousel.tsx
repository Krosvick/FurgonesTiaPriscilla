"use client";
import React, { useEffect, useState } from 'react';

type CarouselProps = {
    images: string[];
};



export function Carousel({ images }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, [activeIndex, images.length]);

  // Navigation
  const goPrev = () => setActiveIndex((activeIndex - 1 + images.length) % images.length);
  const goNext = () => setActiveIndex((activeIndex + 1) % images.length);

  return (
    <div className="carousel">
      <button onClick={goPrev}>Prev</button>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Carousel item"
          className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
        />
      ))}
      <button onClick={goNext}>Next</button>
    </div>
  );
}