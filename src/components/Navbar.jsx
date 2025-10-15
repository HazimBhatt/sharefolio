'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import { LogIn, Waypoints, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    // Handle scroll for background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
//   sroll prevent when menu open 
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`w-full poppins-regular md:poppins-light fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent py-4'
      }`}>
        <div className='w-[90%] max-w-7xl mx-auto flex items-center justify-between'>
{/* logo here */}
          <div className="flex items-center gap-10">
            <div className="logo">
              <Image 
                src={"/logo.svg"} 
                alt='ShareFolio Logo' 
                width={40} 
                height={40}
                priority 
              />
            </div>
            
            {/* Desktop Navigation bt*/}
            <ul className='hidden lg:flex items-center gap-5'>
              {['Home', 'Templates', 'About', 'Pricing', 'Contact'].map((item) => (
                <li key={item} className='hover:font-normal transition-all'>
                  <Link href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Authe Buttons */}
          <div className="hidden lg:flex items-center gap-5">
            <Link href={"/login"}>
              <Button data-focusable  variant={"secondary"} className='cursor-pointer w-32 h-10 px-8  '>
                Log In <LogIn size={16} />
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button  data-focusable variant={"primary"} className='cursor-pointer text-white w-32 h-10 px-8'>
                Sign Up <Waypoints size={16} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
          
            className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`
        lg:hidden fixed inset-0 z-40 bg-white dark:bg-black transition-all duration-300 ease-in-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        <div className="pt-24 pb-8 px-6 h-full flex flex-col">
          {/* Mobile Navigation Items */}
          <ul className='flex flex-col gap-6 flex-1'>
            {['Home', 'Templates', 'About', 'Pricing', 'Contact'].map((item) => (
              <li key={item}>
                <Link 
                data-focusable
                  href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                  className='text-xl font-medium py-2 block hover:text-primary transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-4 pt-8 border-t">
            <Link href={"/login"} onClick={() => setIsOpen(false)}>
              <Button variant={"secondary"} className='w-full h-12 text-base' data-focusable>
                Log In <LogIn size={18} />
              </Button>
            </Link>
            <Link href={"/signup"} onClick={() => setIsOpen(false)}>
              <Button variant={"primary"} className='w-full h-12 text-base' data-focusable>
                Sign Up <Waypoints size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;