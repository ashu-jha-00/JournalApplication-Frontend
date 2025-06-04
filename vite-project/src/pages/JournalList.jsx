import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllJournalEntries } from '../services/journalService';
import JournalCard from '../Components/JournalCard';
import Loading from '../Components/Loading';

const JournalList = () => {
  const location = useLocation();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(location.state?.message || null);

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
    
    // Clear message after 5 seconds
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message, location.state?.message]);

  // Filter journals based on search term
  const filteredJournals = journals.filter(journal => 
    journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    journal.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (journal.tags && journal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (loading) return <Loading />;
  
  return (
    <div className="container-app py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-lg">My Journal Entries</h1>        <Link 
          to="/journals/new"
          className="btn-primary flex items-center rounded-md font-medium hover-lift shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Entry
        </Link>
      </div>

      {/* Success message */}
      {message && (
        <div className="bg-success bg-opacity-10 border border-success border-opacity-20 text-success p-4 rounded-lg mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p>{message}</p>
        </div>
      )}      {/* Search box */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search your entries by title, content, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full focus-ring"
          />
        </div>
      </div>      
      
      {error && (
        <div className="bg-error bg-opacity-10 border border-error border-opacity-20 text-error p-4 rounded-lg mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}

      {!error && filteredJournals.length === 0 && (
        <div className="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" className="empty-state-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          
          <h3 className="empty-state-title">
            {searchTerm ? 'No matching journal entries found' : 'No journal entries yet'}
          </h3>
          
          <p className="empty-state-message">
            {searchTerm 
              ? 'Try using different keywords or clear your search' 
              : 'Start documenting your thoughts, ideas, and experiences'}
          </p>
          
          {searchTerm ? (
            <button
              onClick={() => setSearchTerm('')}
              className="btn-secondary mt-2"
            >
              Clear search
            </button>
          ) : (
            <Link 
              to="/journals/new" 
              className="btn-primary mt-4 hover-lift"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Create Your First Entry
            </Link>
          )}
        </div>
      )}

      <div className="grid-auto-fit">
        {filteredJournals.map(journal => (
          <JournalCard key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  );
};

export default JournalList;
