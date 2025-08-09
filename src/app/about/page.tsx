// app/about/page.tsx
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "../../components/TopHeader";


const AboutPage: FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header/>

      {/* Hero */}
      <section className="bg-blue-50 py-16 px-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">About BreakBroker</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          BreakBroker is on a mission to simplify the rental process by
          connecting tenants directly with property owners — no brokers, no
          extra fees, just transparency and trust.
        </p>
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 py-16 items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            We started BreakBroker because we believe renting a home should be
            straightforward, affordable, and stress-free. Traditional brokerage
            models often come with unnecessary fees and lack transparency.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our platform gives you access to verified property listings and
            owner contact details directly, so you can find your next home with
            confidence.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://images.unsplash.com/photo-1599423300746-b62533397364?w=800"
            alt="Team working on laptops"
            width={500}
            height={350}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </section>

      {/* Mission */}
      <section className="bg-gray-50 py-16 px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
          To create a transparent, cost-effective, and user-friendly platform
          that empowers renters and property owners to connect directly without
          middlemen.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Get in Touch</h2>
        <p className="mt-4 text-gray-600">
          Have questions or feedback? We’d love to hear from you.
        </p>
        <a
          href="mailto:support@breakbroker.com"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Email Us
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BreakBroker. All rights reserved.
      </footer>
    </div>
  );
};

export default AboutPage;
