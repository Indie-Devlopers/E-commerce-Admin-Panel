import React, { useState } from 'react';
import MedicalApparelMenu from './Navbar component/MedicalApparelMenu';
import MedicalApparelMenuWomen from './Navbar component/MedicalApparelMenu';
import MedicalApparelMenuMen from './Navbar component/MedicalApparelMenuMen';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menDropdownOpen, setMenDropdownOpen] = useState(false);
    const [womenDropdownOpen, setWomenDropdownOpen] = useState(false);
    const [trackDropdownOpen, settrackDropdownOpen] = useState(false);

    return (
        <nav className="bg-white border-gray-200 dark:bg-[#482f8f] dark:border-gray-600">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4 py-2">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">MyBrand</span>
                </a>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none"
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 1h15M1 7h15M1 13h15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>

                {/* Menu Items */}
                <div className={`md:flex items-center justify-between w-full md:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0">
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                About
                            </a>
                        </li>

                        {/* Men Dropdown */}
                        <li
                            className="relative"
                            onMouseEnter={() => setMenDropdownOpen(true)}
                            onMouseLeave={() => setMenDropdownOpen(false)}
                        >
                            <button className="flex items-center py-2 px-3 text-gray-900 md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Men
                            </button>
                            {menDropdownOpen && <MedicalApparelMenuMen/>}
                        </li>

                        {/* Women Dropdown */}
                        <li
                            className="relative"
                            onMouseEnter={() => setWomenDropdownOpen(true)}
                            onMouseLeave={() => setWomenDropdownOpen(false)}
                        >
                            <button className="flex items-center py-2 px-3 text-gray-900  md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Women
                            </button>
                            {womenDropdownOpen && <MedicalApparelMenuWomen/>}
                        </li>
                        <li
                            className="relative"
                            onMouseEnter={() => settrackDropdownOpen(true)}
                            onMouseLeave={() => settrackDropdownOpen(false)}
                        >
                            <button className="flex items-center py-2 px-3 text-gray-900  md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Track Order
                                <svg className="ml-2 w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6">
                                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                            {trackDropdownOpen && (
                                <div className="absolute mt-1 w-40 bg-white shadow-lg rounded-md">
                                    <ul>
                                        <li className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Dresses</li>
                                        <li className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Shoes</li>
                                        <li className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Accessories</li>
                                    </ul>
                                </div>
                            )}
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 md:hover:text-yellow-400 dark:text-white dark:hover:bg-gray-800 hover:border-yellow-400 border-b-2 border-transparent">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className='flex text-white gap-5'>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-[1.3rem] w-[1.3rem]' viewBox="0 0 24 24">
                            	<rect width="24" height="24" fill="none" />
                            	<g fill="none" stroke="currentColor" stroke-width="1.95">
                            		<path stroke-linejoin="round" d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
                            		<circle cx="12" cy="7" r="3" />
                            	</g>
                            </svg>
                        </li>
                        <li>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-[1.3rem] w-[1.3rem]' viewBox="0 0 24 24">
                            	<rect width="24" height="24" fill="none" />
                            	<path fill="currentColor" d="M6 2a1 1 0 0 1 .993.883L7 3v1.068l13.071.935A1 1 0 0 1 21 6.027l-.01.114l-1 7a1 1 0 0 1-.877.853L19 14H7v2h10a3 3 0 1 1-2.995 3.176L14 19l.005-.176q.027-.433.166-.824H8.829a3 3 0 1 1-5.824 1.176L3 19l.005-.176A3 3 0 0 1 5 16.17V4H4a1 1 0 0 1-.993-.883L3 3a1 1 0 0 1 .883-.993L4 2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m11 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
                            </svg>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
