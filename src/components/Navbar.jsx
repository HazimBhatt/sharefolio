'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, Waypoints, Menu, X, User, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, loading, logout } = useAuth();

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

  // Scroll prevent when menu open 
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

  const handleLogout = async () => {
    await logout();
    // Optional: Redirect to home page after logout
    window.location.href = '/';
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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
            
            {/* Desktop Navigation */}
            <ul className='hidden lg:flex items-center gap-5'>
              {['Home', 'Templates', 'About', 'Pricing', 'Contact'].map((item) => (
                <li key={item} className='hover:font-normal transition-all'>
                  <Link data-focusable className='p-2' href={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Auth Buttons / User Menu */}
          <div className="hidden lg:flex items-center gap-5">
            {loading ? (
              // Loading state
              <div className="w-8 h-8 border-2 border-[#7332a8] border-t-transparent rounded-full animate-spin"></div>
            ) : isAuthenticated && user ? (
              // User is authenticated - show user menu
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-[#7332a8]/10 transition-colors">
                    <Avatar className="h-10 w-10 border-2 border-[#7332a8]">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback 
                        className="bg-[#7332a8] text-white font-semibold text-sm"
                        style={{ backgroundColor: '#7332a8', color: 'white' }}
                      >
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="flex items-center cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // User is not authenticated - show login/signup buttons
              <>
                <Link href={"/login"}>
                  <Button data-focusable variant={"secondary"} className='cursor-pointer w-32 h-10 px-8'>
                    Log In <LogIn size={16} />
                  </Button>
                </Link>
                <Link href={"/signup"}>
                  <Button data-focusable variant={"primary"} className='cursor-pointer text-white w-32 h-10 px-8' style={{ backgroundColor: '#7332a8' }}>
                    Sign Up <Waypoints size={16} />
                  </Button>
                </Link>
              </>
            )}
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
        lg:hidden poppins-regular fixed inset-0 z-40 bg-white dark:bg-black transition-all duration-300 ease-in-out
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
            {loading ? (
              // Loading state for mobile
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-[#7332a8] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : isAuthenticated && user ? (
              // Mobile user menu for authenticated users
              <>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg mb-4">
                  <Avatar className="h-10 w-10 border-2 border-[#7332a8]">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback 
                      className="bg-[#7332a8] text-white font-semibold text-sm"
                      style={{ backgroundColor: '#7332a8', color: 'white' }}
                    >
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-12 text-base justify-start" data-focusable>
                    <LayoutDashboard className="mr-3 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/settings" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full h-12 text-base justify-start" data-focusable>
                    <Settings className="mr-3 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-base justify-start text-red-600 border-red-200 hover:bg-red-50" 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  data-focusable
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Log out
                </Button>
              </>
            ) : (
              
              <>
                <Link href={"/login"} onClick={() => setIsOpen(false)}>
                  <Button variant={"secondary"} className='w-full h-12 text-base' data-focusable>
                    Log In <LogIn size={18} />
                  </Button>
                </Link>
                <Link href={"/signup"} onClick={() => setIsOpen(false)}>
                  <Button variant={"primary"} className='w-full h-12 text-base' data-focusable style={{ backgroundColor: '#7332a8' }}>
                    Sign Up <Waypoints size={18} />
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;