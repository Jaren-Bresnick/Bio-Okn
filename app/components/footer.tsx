// components/footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-2 text-md font-medium">© 2024 Bio-Health OKN</p>
        <div className="flex justify-center items-center mt-2">
          <img src="nsf.png" alt="NSF Logo" className="w-10 h-10 mr-2" />
          <p className="text-md font-medium">Funded by U.S. National Science Foundation</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
