'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ProfileContent() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not logged in
      router.push('/login');
    }
  }, [router]);
  
  if (!user) {
    return <div className="text-center py-12">Loading...</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center space-x-6 mb-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">User ID</p>
            <p className="font-medium">{user.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg">
            Edit Profile
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}