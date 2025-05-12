import React from "react";

import one from '../../assets/feature/one.avif';
import two from '../../assets/feature/two.avif';
import three from '../../assets/feature/three.avif';
import four from '../../assets/feature/four.avif';
import five from '../../assets/feature/five.avif';

function FeaturedCategories() {
  const categories = [
    { name: "Side Table", products: 124, image: one },
    { name: "Arm Chair", products: 80, image: two },
    { name: "Dinner Table", products: 72, image: three },
    { name: "Pillow", products: 178, image: four },
    { name: "Wall Clock", products: 95, image: five },
  ];

  return (
    <div className="mb-12 max-w-screen-xl  m-auto">
      <div className="flex justify-between  items-center mb-6">
        <h2 className="text-3xl font-bold">Featured Categories</h2>
      </div>

      <div className="grid grid-cols-2  md:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.name}
              className="rounded-full object-cover w-24 h-24 mb-3"
            />
            <h3 className="font-medium text-center">{category.name}</h3>
            <p className="text-xs text-gray-500">
              Discover {category.products} Products
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedCategories;