import React from 'react';

const ColorButton = ({ color, name }) => (
  <label htmlFor={name} className='w-56 flex gap-2 text-sm text-slate-700'>
    <input type="button" id={name} className={`w-6 h-6 rounded-full border border-gray-300`} style={{backgroundColor:`${color.toLowerCase()}`}} title={name} />
    {name}
  </label>
);

const MedicalApparelMenuMen = () => {
  return (
    <div className="flex flex-col mt-2 md:flex-row gap-4 p-4 px-6 bg-blue-100 absolute w-[100dvw] -right-[52.1rem]">
      <div className="w-full md:w-1/5">
        <h2 className="font-bold mb-2">All Mens</h2>
        <ul className="space-y-1">
          <li>Gifting <span className="bg-orange-200 text-xs px-1 rounded">Gift</span></li>
          <li>Multi Packs <span className="bg-red-500 text-white text-xs px-1 rounded">New</span></li>
          <li>Big & Tall</li>
          <li>New Arrivals</li>
          <li>FlexFit 2 way stretch</li>
          <li>FlexFit 4 way stretch</li>
        </ul>
      </div>

      <div className="w-full md:w-1/5">
        <h2 className="font-bold text-blue-700 mb-2">Scrubs</h2>
        <ul className="space-y-1">
          <li>V Neck Scrubs</li>
          <li>Mandarin Collar Scrubs</li>
          <li>Longsleeve Scrubs</li>
          <li>FlexFit Joggers</li>
          <li>Shop All Scrubs</li>
        </ul>

        <h2 className="font-bold text-blue-700 mt-4 mb-2">Shop By Fabric</h2>
        <ul className="space-y-1">
          <li>Classic Scrubs</li>
          <li>FlexFit 2 way stretch</li>
          <li>FlexFit 4 way stretch</li>
        </ul>
      </div>

      <div className="w-full md:w-1/5">
        <h2 className="font-bold text-blue-700 mb-2">Lab Coats</h2>
        <ul className="space-y-1">
          <li>Professional Lab Coats</li>
          <li>Everyday Lab Coats</li>
          <li>Shop All Lab Coats</li>
        </ul>

        <h2 className="font-bold text-blue-700 mt-4 mb-2">Pocket</h2>
        <ul className="space-y-1">
          <li>5 Pocket</li>
          <li>8 Pocket</li>
          <li>9 Pocket</li>
        </ul>
      </div>

      <div className="w-full md:w-1/5">
        <h2 className="font-bold text-blue-700 mb-2">Accessories</h2>
        <ul className="space-y-1">
          <li>Scrub Cap</li>
          <li>Notebook</li>
        </ul>

        <h2 className="font-bold text-blue-700 mt-4 mb-2">Apparel</h2>
        <ul className="space-y-1">
          <li>Undershirts</li>
          <li>T-shirt</li>
        </ul>
      </div>

      <div>
        <h2 className="font-bold text-blue-700 mt-4 mb-2">Shop By Color</h2>
        <div className="grid grid-cols-2 gap-2">
          <ColorButton color="#000080" name="Navy" />
          <ColorButton color="#000000" name="Black" />
          <ColorButton color="#228B22" name="Forest Green" />
          <ColorButton color="#B7410E" name="Rust" />
          <ColorButton color="#808000" name="Olive" />
          <ColorButton color="#92A1CF" name="Ceil Blue" />
          <ColorButton color="#71797E" name="Steel Grey" />
          <ColorButton color="#D9B3E6" name="Pastel Lilac" />
          <ColorButton color="#722F37" name="Wine" />
          <ColorButton color="#E0B0FF" name="Mauve" />
          <ColorButton color="#800000" name="Maroon" />
          <ColorButton color="#B6B6B4" name="Heather Grey" />
          <ColorButton color="#1A3C86" name="Galaxy Blue" />
          <ColorButton color="#FF69B4" name="Hot Pink" />
          <ColorButton color="#44D7A8" name="Eucalyptus" />
        </div>
      </div>
      <div className="w-full md:w-1/5 bg-indigo-200 p-6 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden bg-center bg-cover bg-blend-multiply text-white hover:text-slate-800 hover:bg-blend-soft-light dark:hover:bg-blend-light"
  style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/free-photo-white-background-medical-assistant-nurse_1000823-313704.jpg?')" }}
>
  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-transparent to-transparent opacity-80"></div>
  <div className="relative z-10">
    <h3 className="text-lg font-extrabold mb-2">White Coat Ceremony Lab Coats</h3>
    <p className="text-blue-200 font-bold mb-1">Pack of 2</p>
    <p className="mt-2 text-sm">For the first step to your dreams.</p>
    <button
      type="button"
      className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-white rounded-lg shadow-md hover:bg-indigo-600 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      Get started
      <svg
        className="w-4 h-4 ml-2 rtl:rotate-180"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </button>
  </div>
</div>

    </div>
  );
};

export default MedicalApparelMenuMen;
