"use client";

import SearchBar from "@/components/SearchBar";
import Features from "@/components/Features";
import FeaturedProperties from "@/components/FeaturedProperties";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import HowItWorksPage from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-7xl mx-auto px-4 py-4 text-left justify-center md:text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight text-center">
          Find Your Dream Home Without Brokerage
        </h1>
        <SearchBar />
      </section>

      <Features />

      <FeaturedProperties />

      <Testimonial />
      <HowItWorksPage/>

      <Footer />
    </main>
  );
}
