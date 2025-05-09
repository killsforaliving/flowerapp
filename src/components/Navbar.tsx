'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { isAuthenticated, logout } from '@/component/lib/auth';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Check if user is logged in when component mounts
  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    
    // Add event listener for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      setIsLoggedIn(isAuthenticated());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            My Template Site
          </Link>
          <div className="space-x-4">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded ${pathname === '/' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
            >
              Home
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  href="/profile" 
                  className={`px-3 py-2 rounded ${pathname === '/profile' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Profile
                </Link>
                <button 
                  className="px-3 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`px-3 py-2 rounded ${pathname === '/login' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className={`px-3 py-2 rounded ${pathname === '/signup' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}