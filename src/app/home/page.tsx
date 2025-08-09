// app/page.tsx
import Image from "next/image";
import { Search, ShieldCheck, MapPin, User, MessageCircle, FileText } from "lucide-react";

export default function HomePage() {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "No Brokerage", desc: "Save on brokerage fees with direct listings" },
    { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "Verified Listings", desc: "Find properties that are verified for accuracy" },
    { icon: <MapPin className="w-6 h-6 text-blue-600" />, title: "Easy Search", desc: "Quickly find rentals in your desired location" }
  ];

  const steps = [
    { icon: <Search className="w-8 h-8 text-gray-800" />, title: "Search Properties", desc: "Use our filters to find the perfect rental" },
    { icon: <MessageCircle className="w-8 h-8 text-gray-800" />, title: "Contact Owner", desc: "Directly message property owners" },
    { icon: <User className="w-8 h-8 text-gray-800" />, title: "Visit & Shortlist", desc: "Schedule visits and save your favorites" },
    { icon: <FileText className="w-8 h-8 text-gray-800" />, title: "Rent Agreement", desc: "Finalize the rental without any broker" }
  ];

  const properties = [
    { price: "$3902 Amo", location: "277-Berlin", img: "/img1.jpg" },
    { price: "$4988 Am", location: "430 Berlin", img: "/img2.jpg" },
    { price: "$4,500/mco", location: "Pratretis", img: "/img3.jpg" },
    { price: "$5,733 Byn", location: "Alcarate", img: "/img4.jpg" }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Find rental properties <br /> without the broker
        </h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by city or locality"
            className="w-full md:w-96 px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none"
          />
          <button className="bg-orange-500 text-white px-6 py-3 rounded-r-lg hover:bg-orange-600">
            Search
          </button>
        </div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-500" /> Verified Listings
          </button>
          <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-blue-500" /> &-tified Listings
          </button>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Featured Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {properties.map((p, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Image src={p.img} alt={p.location} width={400} height={300} className="w-full h-48 object-cover" />
              <div className="p-4">
                <p className="font-semibold">{p.price}</p>
                <p className="text-gray-500 text-sm">{p.location}</p>
                <span className="mt-2 inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                  No Brokerage
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((f, i) => (
          <div key={i}>
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-semibold mb-8">How It Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {steps.map((s, i) => (
              <div key={i}>
                <div className="flex justify-center mb-4">{s.icon}</div>
                <h3 className="font-medium">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4">
          <Image src="/sarah.jpg" alt="Sarah T." width={60} height={60} className="rounded-full" />
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p>
              <strong>BreakBroker</strong> made finding a rental easy and affordable, I found a great apartment in no
              time and without paying any broker fees.
            </p>
            <p className="mt-2 font-semibold">Sarah T.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
