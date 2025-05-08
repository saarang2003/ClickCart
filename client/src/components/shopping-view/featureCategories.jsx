import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";

function FeaturedCategories() {
  const categories = [
    { name: "Side Table", products: 124, image: "/placeholder.svg" },
    { name: "Arm Chair", products: 80, image: "/placeholder.svg" },
    { name: "Dinner Table", products: 72, image: "/placeholder.svg" },
    { name: "Pillow", products: 178, image: "/placeholder.svg" },
    { name: "Wall Clock", products: 95, image: "/placeholder.svg" },
    { name: "Sofa", products: 50, image: "/placeholder.svg" },
    { name: "Bookshelf", products: 60, image: "/placeholder.svg" },
    { name: "Lamp", products: 40, image: "/placeholder.svg" },
    { name: "Curtains", products: 90, image: "/placeholder.svg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= categories.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? categories.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Categories</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="rounded-full border border-gray-300 p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="rounded-full bg-yellow-500 text-white border-yellow-500 p-2"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${categories.length * 100}%`,
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full md:w-1/5 p-2 flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-2 mb-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-full object-cover w-24 h-24"
                />
              </div>
              <h3 className="font-medium text-center">{category.name}</h3>
              <p className="text-xs text-gray-500">
                Discover {category.products} Products
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-1">
        {categories.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-teal-700 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedCategories;