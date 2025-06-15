
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-kenya-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-kenya-red to-kenya-green rounded-full flex items-center justify-center">
                <span className="text-white font-bold">ID</span>
              </div>
              <h3 className="text-xl font-bold">ID Safeguard Kenya</h3>
            </div>
            <p className="text-gray-300">
              Helping Kenyans recover their lost identification cards through community support.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/search" className="hover:text-kenya-green">Search IDs</a></li>
              <li><a href="/post-id" className="hover:text-kenya-green">Post Found ID</a></li>
              <li><a href="/register" className="hover:text-kenya-green">Register</a></li>
              <li><a href="/login" className="hover:text-kenya-green">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-kenya-green">Help Center</a></li>
              <li><a href="#" className="hover:text-kenya-green">Contact Us</a></li>
              <li><a href="#" className="hover:text-kenya-green">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-kenya-green">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <p>Admin: 0759515450</p>
              <p>Email: admin@idsafeguard.co.ke</p>
              <p>Nairobi, Kenya</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 ID Safeguard Kenya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
