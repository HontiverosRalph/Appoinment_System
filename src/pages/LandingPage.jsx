import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <header className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Our Website</h1>
        <p className="text-gray-600 mt-2">Discover amazing features and benefits tailored just for you.</p>
      </header>
      
      <main className="mt-10 w-full max-w-4xl flex flex-col items-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition">
          Get Started
        </button>
      </main>
      
      <footer className="mt-12 text-gray-500 text-sm">
        &copy; 2025 Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;