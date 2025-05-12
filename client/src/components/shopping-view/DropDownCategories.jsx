import React from "react";
import { Link } from "react-router-dom";
import dropdown1 from "../../assets/dropdown1.jpg";
import dropdown2 from "../../assets/dropdown2.webp";
import dropdown3 from "../../assets/dropdown3.jpg";

function DropDownCategories() {
  const categories = [
    { name: "Men", link: "/men" },
    { name: "Women", link: "/women" },
    { name: "Kids", link: "/kids" },
    { name: "Accessories", link: "/accessories" },
    { name: "Sports Wear", link: "/sports-wear" },
    { name: "Ethnic", link: "/ethnic" },
  ];

  const images = [
    { id: 1, src: dropdown1, className: "col-span-2 row-span-2" }, // Image 1
    { id: 2, src: dropdown3, className: "col-span-2 row-span-3 col-start-1 row-start-3" }, // Image 2
    { id: 3, src: dropdown2, className: "col-span-3 row-span-5 col-start-3 row-start-1" }, // Image 3
  ];

  return (
    <div className="flex bg-white p-4 rounded-lg shadow-md">
      {/* Left Column - Links */}
      <div className="flex flex-col gap-2 w-1/4">
        {categories.map((category, index) => (
          <Link
            key={index}
            to={category.link}
            className="hover:underline"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Right Column - Images */}
      <div className="grid grid-cols-5 grid-rows-5 gap-2 w-3/4">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative h-full w-full ${image.className} rounded-lg overflow-hidden`}
          >
            <img
              src={image.src}
              alt={`Dropdown ${image.id}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropDownCategories;  