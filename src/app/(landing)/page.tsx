// app/page.tsx
import { MapPin, Bed, Bath } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { Header } from "../../components/TopHeader";

// ------------------ Types ------------------
interface Property {
  id: number;
  price: string;
  title: string;
  location: string;
  beds: number;
  baths: number;
  img: string;
}

// ------------------ Components ------------------

const SearchBar: FC = () => (
  <div className="flex mt-6 w-full max-w-lg">
    <input
      type="text"
      placeholder="City, neighborhood, or ZIP code"
      className="flex-grow border border-gray-300 rounded-l-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button className="bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 transition">
      Search
    </button>
  </div>
);

const Filters: FC = () => {
  const filterList = ["Verified", "No. of Bedrooms", "Price", "More"];
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {filterList.map((filter) => (
        <button
          key={filter}
          className="px-4 py-2 border rounded-full text-gray-600 hover:border-blue-600 hover:text-blue-600 transition"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

const PropertyCard: FC<Property> = ({ price, title, location, beds, baths, img }) => (
  <div className="min-w-[240px] border rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white">
    <Image
      src={img}
      alt={`${title} in ${location}`}
      width={400}
      height={200}
      className="h-40 w-full object-cover"
    />
    <div className="p-4">
      <p className="text-lg font-bold">{price}</p>
      <p className="text-gray-700">{title}</p>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <MapPin size={14} /> {location}
      </p>
      <div className="flex items-center gap-4 text-gray-600 mt-2">
        <div className="flex items-center gap-1">
          <Bed size={16} /> {beds}
        </div>
        <div className="flex items-center gap-1">
          <Bath size={16} /> {baths}
        </div>
      </div>
      <div className="flex justify-between mt-3 text-blue-600 text-sm">
        <button className="hover:underline">Save</button>
        <button className="hover:underline">Contact</button>
      </div>
    </div>
  </div>
);

// ------------------ Main Page ------------------
export default function HomePage() {
  const properties: Property[] = [
    {
      id: 1,
      price: "$2,000 / month",
      title: "Spacious 2 Bedroom",
      location: "Downtown",
      beds: 2,
      baths: 1,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400"
    },
    {
      id: 2,
      price: "$1,200 / month",
      title: "1 Bed 1 Bath",
      location: "Central",
      beds: 1,
      baths: 1,
      img: "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: 3,
      price: "$4,500 / month",
      title: "Luxury 5 Storey Villa",
      location: "Suburb",
      beds: 5,
      baths: 3,
      img: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=400"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-8 py-10">
        {/* Left Column */}
        <section>
          <h2 className="text-4xl font-bold text-gray-900 leading-snug">
            Find rental properties <br /> without the broker
          </h2>

          <SearchBar />
          <Filters />

          {/* Property List */}
          <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </section>

        {/* Map */}
        <section className="bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hcHN8ZW58MHx8MHx8fDA%3D"
            alt="Map showing property locations"
            width={800}
            height={600}
            className="w-full h-full object-cover"
          />
        </section>
      </main>
    </div>
  );
}
