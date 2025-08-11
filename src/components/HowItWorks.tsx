import { CheckCircle, Home, Search, ShieldCheck, Tag, User, IndianRupee } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-blue-700">
        How BreakBroker Works
      </h1>

      <section className="space-y-12">
        <Step
          icon={<Search className="w-10 h-10 text-blue-600" />}
          title="1. Search Verified Properties"
          description="Browse thousands of verified property listings directly from owners, with zero brokerage fees. Use our powerful filters to find the perfect home."
        />

        <Step
          icon={<ShieldCheck className="w-10 h-10 text-blue-600" />}
          title="2. Transparent & Secure"
          description="All listings go through strict verification processes ensuring transparent and trusted transactions without hidden costs."
        />

        <Step
          icon={<User className="w-10 h-10 text-blue-600" />}
          title="3. Connect with Sellers Directly"
          description="Communicate directly with verified sellers or owners, eliminating middlemen and additional charges."
        />

        <Step
          icon={<IndianRupee className="w-10 h-10 text-blue-600" />}
          title="4. Zero Brokerage Savings"
          description="Save thousands of rupees on brokerage fees by buying or renting directly from owners through BreakBroker."
        />

        <Step
          icon={<Home className="w-10 h-10 text-blue-600" />}
          title="5. Move Into Your Dream Home"
          description="Enjoy a smooth, transparent, and fast buying or renting experience, and move into your dream home hassle-free."
        />
      </section>

      <div className="mt-16 text-center">
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Join thousands of satisfied customers who have found their homes with BreakBroker.
        </p>
      </div>
    </main>
  );
}

function Step({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex items-start space-x-6">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
