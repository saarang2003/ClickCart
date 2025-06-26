// ✅ FULLY RESPONSIVE REVISED HOME COMPONENT

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Instagram,
  ShoppingCart,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DropDownCategories from "../components/shopping-view/DropDownCategories";
import Homel from "../assets/Home.webp";
import one from "../assets/glass/one.avif";
import two from "../assets/glass/two.avif";
import three from "../assets/glass/three.avif";
// import four from "../assets/glass/four.avif";
import five from "../assets/glass/five.avif";
import six from '../assets/glass/six.avif';
import main from '../assets/main.png';

import FeaturedCategories from "../components/shopping-view/featureCategories";
import Accordion from "../components/shopping-view/accordian";

function BlogArticlesSection() {
  const articles = [
    {
      id: "1",
      title: "10 Wardrobe Essentials for Every Season",
      date: "2 Feb",
      image: one,
      slug: "wardrobe-essentials",
    },
    {
      id: "2",
      title: "Top Trends to Watch This Year",
      date: "5 Feb",
      image: five,
      slug: "top-trends",
    },
  ];

  return (
    <section className="bg-gray-100 py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Explore Our Latest <span className="text-gray-400">Blog</span> Articles
          </h2>
          <div className="flex items-center gap-2">
            <button className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="rounded-full bg-black text-white h-10 w-10 flex items-center justify-center">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link to={`/blog/${article.slug}`} key={article.id} className="group block">
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-[240px] sm:h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-white rounded-md px-2 py-1 text-xs font-medium">
                  {article.date}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-gray-600">
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
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          <div className="md:col-span-4 space-y-6">
            <div className="backdrop-blur-lg px-3 py-2 max-w-fit bg-white/30 border border-white/40 hover:bg-white/70 cursor-pointer rounded-xl shadow-lg transition-all duration-300">
              <span className="text-black font-semibold">Trending Now · Grab Deals Fast!</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">New Arrivals, Just For You!</h2>
              <p className="text-gray-700">Check out our latest collections, handpicked to keep you ahead of the trends.</p>
            </div>

            <div className="space-y-2 text-md">
              <p><span className="font-semibold">Men's Fashion</span> – Cool, casual, and effortlessly stylish.</p>
              <p><span className="font-semibold">Women's Fashion</span> – Elegant, bold, and chic.</p>
              <p><span className="font-semibold">Kids Fashion</span> – Playful styles for the little ones.</p>
              <p><span className="font-semibold">Accessories</span> – Complete your look with the perfect accessories.</p>
            </div>

            <Button className="bg-zinc-800 mt-2 hover:bg-zinc-200 hover:text-black text-white rounded-full px-6">
              Shop now <ArrowRightIcon width={20} height={20} />
            </Button>

            <div className="bg-teal-800 text-white rounded-md p-3 flex flex-wrap justify-between text-center text-xs">
              <div className="border-r border-teal-700 pr-2 flex-1 min-w-[100px]">
                <div className="font-bold">25,000+</div>
                <div>Unique Styles</div>
              </div>
              <div className="border-r border-teal-700 px-2 flex-1 min-w-[100px]">
                <div className="font-bold">5000+</div>
                <div>Happy Customers</div>
              </div>
              <div className="pl-2 flex-1 min-w-[100px]">
                <div className="font-bold">300+</div>
                <div>Certified Outlets</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="flex flex-wrap gap-4 h-full">
              {[one, two, three].map((imgSrc, idx) => (
                <div key={idx} className="flex-1 min-w-[120px] sm:min-w-[200px] bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden hover:flex-[2] transition-all duration-300">
                  <img src={imgSrc} alt={`Product ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col mb-16 items-center">
          <h2 className="text-4xl md:text-5xl text-center mb-10 font-extrabold font-sans italic">
            Step Into <span className="text-gray-400">Style</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-screen-xl">
            {[six, five].map((img, i) => (
              <img key={i} src={img} alt={`Style ${i}`} className="w-full sm:w-1/2 h-auto object-cover rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  return (
    <div className="bg-[#d1d6da]">
      <div className="flex flex-col max-w-screen-2xl mx-auto min-h-screen bg-[#f0f8ff]">
        <div className="bg-[#f8f9fa] text-xs sm:text-sm py-2 px-4 flex flex-wrap justify-between items-center border-b">
          <div>Get up to 50% off new season styles, limited time only</div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link to="#" className="hover:underline">Help Center</Link>
            <Link to="#" className="hover:underline">Order Tracking</Link>
            <select className="text-xs border rounded px-2 py-1">
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <header className="bg-white py-3 px-4 sm:px-6 flex flex-wrap justify-between items-center border-b gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-zinc-800 p-2 rounded">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold">ClickCart</span>
            </Link>
            <div className="relative hidden md:flex items-center gap-2 text-sm font-medium">
              <span>SHOP BY CATEGORIES</span>
              <ChevronDown className="h-4 w-4 cursor-pointer" onClick={toggleDropdown} />
              {isDropdownVisible && (
                <div className="absolute w-full md:w-[600px] top-full left-0 mt-2 z-10">
                  <DropDownCategories />
                </div>
              )}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {["Home", "Fashion", "New Arrivals", "All Brands"].map((text) => (
              <Link key={text} to="#" className="hover:underline text-zinc-700">{text}</Link>
            ))}
            <Link to="#" className="flex items-center hover:underline text-zinc-700">
              More <ChevronDown className="h-4 w-4 ml-1" />
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/auth/login" className="bg-zinc-800 text-white hover:bg-zinc-300 hover:text-black shadow-lg rounded-md px-4 py-2">Login</Link>
            <Link to="/auth/register" className="bg-zinc-800 text-white hover:bg-zinc-300 hover:text-black shadow-lg rounded-md px-4 py-2">Register</Link>
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 text-gray-500 cursor-pointer hover:text-zinc-900" />
              <ShoppingCart className="h-6 w-6 text-gray-500 cursor-pointer hover:text-zinc-900" />
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 py-6">
          <div className="rounded-lg overflow-hidden">
            <img src={Homel} alt="Hero" className="w-full h-[300px] sm:h-[500px] object-cover" />
          </div>
          <div className="text-center mt-10 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-3">Style That Speaks</h2>
            <p className="max-w-3xl mx-auto text-gray-600 font-serif italic">
              Shop the latest trends in high-quality, aesthetic clothing, and make a statement every time you step out.
            </p>
          </div>
          <FeaturedCategories />
        </main>

        <GlassmorphismNewArrivals />

        <div className="mb-12 flex flex-col justify-center items-center gap-8 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-center">
            Redefining Your <span className="text-gray-500/70 font-sans italic underline">Wardrobe</span>
          </h1>
          <img src={main} alt="main image" className="w-full max-w-screen-lg object-contain" />
        </div>

        <div className="w-full px-4 mx-auto max-w-screen-2xl">
          <Accordion />
        </div>

        <BlogArticlesSection />

        <footer className="w-full py-14 bg-white">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <a href="/" className="flex justify-center mb-10">
                <span className="text-2xl font-bold text-zinc-600">
                  <ShoppingCart width={30} height={30} className="inline-block mx-4 text-base" />
                  ClickCart
                </span>
              </a>

              <ul className="text-lg flex flex-col md:flex-row justify-center items-center gap-7 md:gap-12 py-16 mb-10 border-b border-gray-200">
                {["Products", "Resources", "Blogs", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-800 hover:text-gray-900">{item}</a>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center items-center space-x-10 mb-14">
                {[Instagram, Youtube, Twitter].map((Icon, idx) => (
                  <a key={idx} href="#" className="text-gray-900 hover:text-indigo-600">
                    <Icon width={30} height={30} />
                  </a>
                ))}
              </div>
            </div>
            <div className="text-center text-sm text-gray-500">© 2025 ClickCart. All rights reserved.</div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Home;
