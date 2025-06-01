import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      // Redirect to login if no username is found
      navigate('/');
    }
  }, [navigate]);
  
  const handleSignOut = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-pink-300 p-6">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard, {username}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-50 p-6 rounded-lg border border-purple-100 shadow-sm">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">Your Profile</h2>
            <p className="text-gray-600 mb-4">Manage your personal information and account settings</p>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              Edit Profile
            </button>
          </div>
          
          <div className="bg-pink-50 p-6 rounded-lg border border-pink-100 shadow-sm">
            <h2 className="text-2xl font-semibold text-pink-700 mb-4">Your Journal</h2>
            <p className="text-gray-600 mb-4">View and manage your personal journal entries</p>
            <button 
              className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:from-pink-600 hover:to-purple-700 transition-all"
            >
              View Journal
            </button>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg border border-purple-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <p className="text-gray-700">You logged in successfully</p>
              <span className="ml-auto text-sm text-gray-500">Just now</span>
            </div>
            <div className="flex items-center p-3 bg-white rounded-md shadow-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              <p className="text-gray-700">Profile was updated</p>
              <span className="ml-auto text-sm text-gray-500">Yesterday</span>
            </div>
          </div>
        </div>
          <div className="mt-8 flex justify-center">
          <button 
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition-all"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
