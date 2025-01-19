'use client'; // Adicione esta linha no início do seu arquivo

import { useEffect, useState } from "react";
import Image from 'next/image'

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    "https://i.postimg.cc/X7J7mJ8J/Banner-Loja-Virtual-Festival-de-Ofertas-Colorido-Rosa-Azul.png",
    "https://i.postimg.cc/X7J7mJ8J/Banner-Loja-Virtual-Festival-de-Ofertas-Colorido-Rosa-Azul.png",
    "https://i.postimg.cc/X7J7mJ8J/Banner-Loja-Virtual-Festival-de-Ofertas-Colorido-Rosa-Azul.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // Troca de imagem a cada 3 segundos

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      <div
        className="relative flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Controla o deslocamento da imagem
          width: '100%',
        }}
      >
        {banners.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={src}
              width={1200} // Largura da imagem
              height={400} // Altura da imagem
              alt={`Banner ${index + 1}`}
              className="object-contain mx-auto" // Ajustado para conter e centralizar
            />
          </div>
        ))}
      </div>

      {/* Controles de navegação */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 p-2 cursor-pointer z-10">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length)}
          className="bg-black text-white p-2 rounded-full"
        >
          &#10094; {/* Setinha para a esquerda */}
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 p-2 cursor-pointer z-10">
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)}
          className="bg-black text-white p-2 rounded-full"
        >
          &#10095; {/* Setinha para a direita */}
        </button>
      </div>
    </div>
  );
}
