import Image from "next/image";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Priya",
    quote: "Found my dream home in a week! The process was so simple and transparent.",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Raj",
    quote: "BreakBroker saved me thousands in brokerage fees. Highly recommend!",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Anjali",
    quote: "Transparent, fast, and reliable platform for buying properties.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Sanjay",
    quote: "Easy to navigate and excellent customer support.",
    image:
      "https://images.unsplash.com/photo-1508214751197-bcfd4ca60f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Neha",
    quote: "Zero brokerage helped me buy my first apartment with ease!",
    image:
      "https://images.unsplash.com/photo-1508214751199-bcfd4ca60f93?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Amit",
    quote: "Best real estate platform I've ever used.",
    image:
      "https://images.unsplash.com/photo-1508214751200-bcfd4ca60f94?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Sunita",
    quote: "Smooth and transparent experience throughout the buying process.",
    image:
      "https://images.unsplash.com/photo-1508214751201-bcfd4ca60f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Karan",
    quote: "Great platform for hassle-free property buying.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Divya",
    quote: "I loved how transparent everything was from start to finish.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
  {
    name: "Aakash",
    quote: "Excellent experience, highly recommended to all home buyers!",
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80",
  },
];

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  // Responsive check for items per slide
  useEffect(() => {
    function updateItemsPerSlide() {
      setItemsPerSlide(window.innerWidth >= 640 ? 2 : 1); // sm breakpoint ~640px
    }

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  // chunk testimonials according to items per slide
  const slides = chunkArray(testimonials, itemsPerSlide);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div
      className={`w-full mx-auto mt-6 px-6 py-12 bg-white rounded-2xl shadow-lg
        transition-opacity duration-500 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}
    >
      <div className="flex flex-col sm:flex-row gap-10 justify-center">
        {slides[index].map(({ name, quote, image }) => (
          <div
            key={name}
            className="flex flex-col items-center sm:items-start max-w-xl flex-1"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500 shadow-md mb-6">
              <Image
                src={image}
                alt={name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
                priority
              />
            </div>
            <blockquote className="text-gray-900 font-serif text-center sm:text-left">
              <p className="text-2xl italic leading-relaxed mb-4">“{quote}”</p>
              <footer className="text-blue-600 font-semibold text-lg">— {name}</footer>
            </blockquote>
          </div>
        ))}
      </div>
    </div>
  );
}
