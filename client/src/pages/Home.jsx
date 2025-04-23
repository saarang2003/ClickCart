import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button"



function BlogArticlesSection() {
  const articles = [
    {
      id: "1",
      title: "10 Wardrobe Essentials for Every Season",
      date: "2 Feb",
      day: 2,
      month: "Feb",
      image: "/placeholder.svg?height=400&width=300",
      slug: "wardrobe-essentials",
    },
    {
      id: "2",
      title: "Top Trends to Watch This Year",
      date: "5 Feb",
      day: 5,
      month: "Feb",
      image: "/placeholder.svg?height=400&width=300",
      slug: "top-trends",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="text-3xl font-bold mb-4 md:mb-0">
            Explore Our Latest <span className="text-gray-400">Blog</span> Articles
          </h2>

          <div className="flex items-center gap-2">
            <button className="rounded-full bg-gray-200 border-none h-10 w-10 flex items-center justify-center">
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </button>
            <button className="rounded-full bg-black text-white border-none h-10 w-10 flex items-center justify-center">
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link to={`/blog/${article.slug}`} key={article.id} className="group block">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white rounded-md px-2 py-1 text-xs font-medium">
                  {article.date}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-gray-600 transition-colors">
                {article.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}




 function GlassmorphismNewArrivals() {
  return (
    <div className="bg-[#f0f6ff] min-h-screen p-4 md:p-8">
      {/* New Arrivals Section */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          {/* Left Column - Text Content */}
          <div className="md:col-span-4 space-y-6">
            {/* Glassmorphism Label */}
            <div className="inline-block">
              <span className="bg-amber-500 text-white font-semibold px-4 py-1 rounded-full">Glassmorphism</span>
            </div>

            {/* Heading and Description */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">New Arrivals, Just For You!</h2>
              <p className="text-gray-700">
                Check out our latest collections, handpicked to keep you ahead of the trends.
              </p>
            </div>

            {/* Fashion Categories */}
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">**Men's Fashion**</span> – Cool, casual, and effortlessly stylish.
              </p>
              <p>
                <span className="font-semibold">**Women's Fashion**</span> – Elegant, bold, and chic.
              </p>
              <p>
                <span className="font-semibold">**Kids Fashion**</span> – Playful styles for the little ones.
              </p>
              <p>
                <span className="font-semibold">**Accessories**</span> – Complete your look with the perfect
                accessories.
              </p>
            </div>

            {/* Shop Now Button */}
            <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6">Shop now</Button>

            {/* Stats Bar */}
            <div className="bg-teal-800 text-white rounded-md p-3 flex justify-between text-center text-xs">
              <div className="border-r border-teal-700 pr-2 flex-1">
                <div className="font-bold">25,000+</div>
                <div>Unique Styles</div>
              </div>
              <div className="border-r border-teal-700 px-2 flex-1">
                <div className="font-bold">5000+</div>
                <div>Happy Customer</div>
              </div>
              <div className="pl-2 flex-1">
                <div className="font-bold">300+</div>
                <div>Certified Outlets</div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Cards with Glassmorphism Effect */}
          <div className="md:col-span-8">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* Main Product Card */}
              <div className="col-span-12 md:col-span-7 h-full">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg h-full shadow-lg overflow-hidden">
                  <div className="bg-gray-200 h-full min-h-[250px]"></div>
                </div>
              </div>

              {/* Side Product Cards */}
              <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4 h-full">
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-200 h-full min-h-[120px]"></div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gray-200 h-full min-h-[120px]"></div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center mt-4 gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-amber-500 text-white border-amber-500 h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-gray-700">Glass</span>
            </div>
          </div>
        </div>

        {/* Step Into Style Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-16">
          <div>
            <h2 className="text-5xl font-bold">
              Step Into <span className="text-gray-400">Style</span>
            </h2>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Up to 50% OFF – On selected items. Hurry, while stocks last!</p>
            <p>Seasonal Sale – Your favorite styles, now at a fraction of the price.</p>
          </div>
        </div>
      </div>
    </div>
  )
}


function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f0f8ff]">
      {/* Top Announcement Bar */}
      <div className="bg-[#f8f9fa] text-xs sm:text-sm py-2 px-4 flex justify-between items-center border-b">
        <div>Get up to 50% off new season styles, limited time only</div>
        <div className="flex items-center gap-4 text-sm">
          <Link to="#" className="hover:underline">
            Help Center
          </Link>
          <Link to="#" className="hover:underline">
            Order Tracking
          </Link>
          <div className="flex items-center gap-1">
            <span>🇺🇸</span>
            <span>English</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <span>USD</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-orange-500 p-1 rounded">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold">SnapCart</span>
          </Link>

          <div className="hidden md:flex items-center gap-2 text-sm font-medium">
            <ChevronDown className="h-4 w-4" />
            <span>SHOP BY CATEGORIES</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="#" className="hover:text-orange-500">
            Home
          </Link>
          <Link to="#" className="hover:text-orange-500">
            Fashion
          </Link>
          <Link to="#" className="hover:text-orange-500">
            New Arrivals
          </Link>
          <Link to="#" className="hover:text-orange-500">
            All Brands
          </Link>
          <Link to="#" className="flex items-center hover:text-orange-500">
            More
            <ChevronDown className="h-4 w-4 ml-1" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-4 py-2">
            Login/Register
          </button>
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500" />
            <div className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-orange-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Free Delivery Banner */}
      <div className="bg-white px-6 py-2 flex justify-end items-center text-sm">
        <div className="flex items-center gap-2">
          <span>🚚</span>
          <span>Free International Delivery</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="md:col-span-2 bg-gray-200 rounded-lg h-[300px] sm:h-[400px] flex items-center justify-center">
            <div className="text-2xl font-bold text-gray-500">Slider</div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-teal-700 rounded-lg h-[180px] flex flex-col items-center justify-center text-white">
              <div className="text-sm font-medium">SPECIAL</div>
              <div className="text-2xl font-bold mt-2">20% OFFER</div>
            </div>
            <div className="bg-gray-200 rounded-lg h-[180px]"></div>
          </div>
        </div>

        {/* Style That Speaks */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Style That Speaks</h2>
          <p className="max-w-2xl mx-auto text-gray-600">
            Shop the latest trends in high-quality, aesthetic clothing, and make a statement every time you step out.
          </p>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Featured Categories</h2>
            <div className="flex gap-2">
              <button className="rounded-full border border-gray-300 p-2">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="rounded-full bg-yellow-500 text-white border-yellow-500 p-2">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: "Side Table", products: 124, image: "/placeholder.svg" },
              { name: "Arm Chair", products: 80, image: "/placeholder.svg" },
              { name: "Dinner Table", products: 72, image: "/placeholder.svg" },
              { name: "Pillow", products: 178, image: "/placeholder.svg" },
              { name: "Wall Clock", products: 95, image: "/placeholder.svg" },
            ].map((category, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-gray-100 rounded-full p-2 mb-3">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-center">{category.name}</h3>
                <p className="text-xs text-gray-500">
                  Discover {category.products} Products
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-1">
            {[0, 1, 2, 3].map((dot, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === 0 ? "bg-teal-700 w-6" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </main>

      <GlassmorphismNewArrivals />

      <BlogArticlesSection />

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto text-center text-sm text-gray-500">
          © 2023 SnapCart. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;