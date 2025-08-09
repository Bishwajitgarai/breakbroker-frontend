// app/listing/[id]/page.tsx
import Image from "next/image";

export default function ListingDetails() {
  const listing = {
    id: 1,
    title: "2-Beds",
    price: 2800,
    location: "Chelsea",
    bedrooms: 2,
    brokerage: false,
    description:
      "Spacious two-bedroom apartment in the heart of Chelsea. Features an open living area with natural light, a modern kitchen with stainless steel appliances.",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80", // kitchen
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1000&q=80", // bedroom
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>

      {/* Main Image */}
      <div className="rounded-2xl overflow-hidden mb-4">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          width={1000}
          height={600}
          className="w-full object-cover"
        />
      </div>

      {/* Price & Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-2xl font-semibold">
            ${listing.price.toLocaleString()}/mo
          </p>
          <p className="text-gray-500">
            {listing.bedrooms} Beds • {listing.location}
          </p>
        </div>
        {!listing.brokerage && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm">
            No Brokerage
          </span>
        )}
      </div>

      {/* Details */}
      <h2 className="text-xl font-semibold mb-2">Property Details</h2>
      <p className="text-gray-700 mb-6">{listing.description}</p>

      {/* Gallery */}
      <div className="grid grid-cols-2 gap-4">
        {listing.images.slice(1).map((img, idx) => (
          <div key={idx} className="rounded-xl overflow-hidden">
            <Image
              src={img}
              alt={`Gallery ${idx}`}
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
