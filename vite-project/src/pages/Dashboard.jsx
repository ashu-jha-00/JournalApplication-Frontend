import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllJournalEntries } from '../services/journalService';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../Components/Loading';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await getAllJournalEntries();
        setJournals(data);
      } catch (err) {
        setError('Failed to fetch journal entries. Please try again later.');
        console.error('Error fetching journals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  // Get current date for greeting
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  // Get statistics
  const stats = {
    total: journals.length,
    thisWeek: journals.filter(journal => {
      const journalDate = new Date(journal.createdAt);
      const now = new Date();
      const oneWeekAgo = new Date(now.setDate(now.getDate() - 7));
      return journalDate >= oneWeekAgo;
    }).length,
    thisMonth: journals.filter(journal => {
      const journalDate = new Date(journal.createdAt);
      const now = new Date();
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return journalDate >= oneMonthAgo;
    }).length
  };

  // Get recent journals (last 3)
  const recentJournals = journals.slice(0, 3);

  if (loading) return <Loading />;
  
  return (
    <div className="container-app py-8">
      <div className="mb-10 section-sm">
        <h1 className="heading-lg text-gradient">
          {getCurrentGreeting()}, {user?.username || 'User'}
        </h1>
        <p className="body-lg text-neutral-600">Here's an overview of your journaling activity</p>
      </div>
      
      {error && (
        <div className="bg-error bg-opacity-10 border border-error border-opacity-20 text-error p-4 rounded-lg mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}
      
      {/* Stats cards */}
      <div className="grid-auto-fit mb-12">
        <div className="card p-6 hover-lift">
          <div className="flex justify-between items-center mb-5">
            <h3 className="heading-sm mb-0 text-neutral-700">Total Entries</h3>
            <span className="p-3 bg-primary bg-opacity-10 text-primary rounded-full">              
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
          </div>
          <p className="text-4xl font-bold text-primary mb-1">{stats.total}</p>
          <Link to="/journals" className="btn-text mt-2 inline-flex items-center p-0">
            View all entries
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="card p-6 hover-lift">
          <div className="flex justify-between items-center mb-5">
            <h3 className="heading-sm mb-0 text-neutral-700">This Week</h3>
            <span className="p-3 bg-secondary bg-opacity-10 text-secondary rounded-full">              
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          <p className="text-4xl font-bold text-secondary mb-1">{stats.thisWeek}</p>
          <p className="text-neutral-500 text-sm">entries in the last 7 days</p>
        </div>
        
        <div className="card p-6 hover-lift">
          <div className="flex justify-between items-center mb-5">
            <h3 className="heading-sm mb-0 text-neutral-700">This Month</h3>
            <span className="p-3 bg-accent bg-opacity-10 text-accent rounded-full">              
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <p className="text-4xl font-bold text-accent mb-1">{stats.thisMonth}</p>
          <p className="text-neutral-500 text-sm">entries in the last 30 days</p>
        </div>
      </div>
      
      {/* Quick actions */}
      <div className="card card-glass p-8 mb-10">
        <h2 className="heading-md mb-6">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link 
            to="/journals/new"
            className="btn-primary flex items-center hover-lift"
          >            
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Journal Entry
          </Link>
          <Link 
            to="/journals"
            className="btn-secondary flex items-center"
          >            
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Browse All Entries
          </Link>
        </div>
      </div>
      
      {/* Recent entries */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="heading-md">Recent Journal Entries</h2>
          <Link to="/journals" className="btn-text flex items-center p-0">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        {recentJournals.length === 0 ? (
          <div className="empty-state">            
            <svg xmlns="http://www.w3.org/2000/svg" className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="empty-state-title">No Journal Entries Yet</h3>
            <p className="empty-state-message">Start documenting your thoughts, ideas and experiences</p>
            <Link 
              to="/journals/new" 
              className="btn-primary mt-4 hover-lift flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Your First Entry
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {recentJournals.map(journal => (
              <div key={journal.id} className="journal-card card p-6">
                <div className="journal-date mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{new Date(journal.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                </div>
                
                <h3 className="heading-sm mb-3">{journal.title}</h3>
                
                <p className="body-md text-neutral-600 mb-4">
                  {journal.content.substring(0, 150)}
                  {journal.content.length > 150 ? '...' : ''}
                </p>
                
                <div className="mt-4">
                  <Link 
                    to={`/journals/${journal.id}`}
                    className="btn-text flex items-center p-0"
                  >
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
