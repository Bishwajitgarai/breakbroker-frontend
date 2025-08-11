import { Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">

          {/* Brand + About */}
          <div className="max-w-sm">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">BreakBroker</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your trusted platform for zero brokerage real estate listings. Discover, buy, and sell without any hassle.
            </p>
            <div className="mt-6 flex space-x-4 text-blue-600 dark:text-blue-400">
              <a href="#" aria-label="Facebook" className="hover:text-blue-800 dark:hover:text-blue-500 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                <Linkedin size={24} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Press</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </nav>

          {/* Newsletter Signup */}
          <div className="max-w-sm">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">Subscribe to our newsletter</h3>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-5 py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition"
              >
                <Mail size={18} className="mr-2" /> Subscribe
              </button>
            </form>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-xs text-gray-500 dark:text-gray-400 select-none">
          &copy; {new Date().getFullYear()} BreakBroker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
