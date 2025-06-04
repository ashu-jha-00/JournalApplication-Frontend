import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-light p-6">
      <div className="w-full max-w-4xl card card-glass p-10 text-center">
        <h1 className="heading-xl mb-2 text-gradient">Welcome to Journal</h1>
        <p className="body-lg text-neutral-600 mb-10">Your personal space for thoughts, reflections and ideas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="card p-8 hover-lift">
            <div className="p-3 bg-primary bg-opacity-10 text-primary rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="heading-md mb-3">Your Dashboard</h2>
            <p className="body-md text-neutral-600 mb-6">View insights and summaries of your journal activity</p>            <Link to="/dashboard"
              className="btn-primary inline-flex items-center justify-center hover-lift rounded-md font-medium"
            >
              Open Dashboard
            </Link>
          </div>
          
          <div className="card p-8 hover-lift">
            <div className="p-3 bg-secondary bg-opacity-10 text-secondary rounded-full inline-block mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="heading-md mb-3">Your Journal</h2>
            <p className="body-md text-neutral-600 mb-6">View and manage your personal journal entries</p>
            <Link to="/journals"
              className="btn-secondary inline-flex items-center justify-center hover-lift rounded-md font-medium"
            >
              Browse Entries
            </Link>
          </div>
        </div>
        
        <div className="card p-8 bg-gradient-light">
          <h2 className="heading-md mb-6">Quick Actions</h2>          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/journals/new" className="btn-primary flex items-center rounded-md font-medium hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              New Journal Entry
            </Link>
            
            <button onClick={handleSignOut} className="btn-danger flex items-center rounded-md font-medium hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
