import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="container-app py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">          
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="icon-sm text-primary" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <Link to="/home" className="heading-sm text-primary m-0">Journal</Link>
        </div>
        
        {user && (
          <div className="flex items-center">
            <span className="hidden md:inline-block mr-6 body-sm text-neutral-600">
              Welcome, <span className="text-primary font-medium">{user.username}</span>
            </span>            <nav className="flex space-x-4">
              <Link 
                to="/dashboard" 
                className="btn-text py-2 flex items-center font-medium rounded-md transition-all"
              >
                Dashboard
              </Link>
              <Link 
                to="/journals" 
                className="btn-text py-2 flex items-center font-medium rounded-md transition-all"
              >
                My Journals
              </Link>
              <Link 
                to="/journals/new" 
                className="btn-secondary py-2 px-4 flex items-center rounded-md font-medium hover-lift"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Entry
              </Link>
              <button 
                onClick={logout}
                className="btn-text py-2 flex items-center text-neutral-600 font-medium rounded-md transition-all"
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
