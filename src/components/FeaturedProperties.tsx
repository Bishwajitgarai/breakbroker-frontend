import Image from "next/image";

const properties = [
  { 
    id: 1,
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    title: "2 BHK Apartment",
    location: "Banjars Hills",
    price: "₹1.2 Cr",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1560448075-4e8c0f1983ea?auto=format&fit=crop&w=800&q=80",
    title: "3 BHK Apartment",
    location: "Whitefield",
    price: "₹1.5 Cr",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1501183638714-3c3b0e84f6d4?auto=format&fit=crop&w=800&q=80",
    title: "1 BHK Apartment",
    location: "Koregaon Park",
    price: "₹70 LAC",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1600585154027-3f9a40d8e0af?auto=format&fit=crop&w=800&q=80",
    title: "2 BHK Apartment",
    location: "Andheri West",
    price: "₹90 LAC",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
    title: "2 BHK Apartment",
    location: "Banjars Hills",
    price: "₹1.2 Cr",
  },
];

export default function FeaturedProperties() {
  return (
    <div className="w-full max-w-full px-4 py-0 mx-auto">
      <h2 className="text-3xl font-semibold text-blue-500 mb-6 justify-start">Featured Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {properties.map(({ id, img, title, location, price }) => (
          <div key={id} className="rounded-lg overflow-hidden shadow-md bg-white">
            <Image
              src={img}
              alt={title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
              priority={id === 1} // prioritize first image loading
            />
            <div className="p-3">
              <p className="text-red-400 font-semibold">{title}</p>
              <p className="text-gray-600">{location}</p>
              <p className="text-blue-700 font-semibold mt-1">{price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
