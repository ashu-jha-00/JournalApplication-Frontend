import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJournalById, deleteJournalEntry } from '../services/journalService';
import Loading from '../Components/Loading';

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchJournalDetail = async () => {
      try {
        const data = await getJournalById(id);
        setJournal(data);
      } catch (err) {
        setError('Failed to fetch journal details. Please try again later.');
        console.error('Error fetching journal details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournalDetail();
  }, [id]);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteJournalEntry(id);
      navigate('/journals', { state: { message: 'Journal entry deleted successfully' } });
    } catch (err) {
      setError('Failed to delete journal entry. Please try again.');
      console.error('Error deleting journal:', err);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="container-app py-8">
        <div className="bg-error bg-opacity-10 border border-error border-opacity-20 text-error p-5 mb-6 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/journals" className="btn-text">
            ← Back to journal list
          </Link>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="container-app py-8 text-center">
        <div className="empty-state">
          <h2 className="empty-state-title">Journal entry not found</h2>
          <p className="empty-state-message">The journal entry you're looking for doesn't exist or has been removed.</p>
          <Link to="/journals" className="btn-secondary">
            ← Back to journal list
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(journal.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(journal.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div className="container-app py-8">
      {/* Navigation and actions */}
      <div className="flex justify-between items-center mb-8">
        <Link to="/journals" className="btn-text flex items-center">          
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to journals
        </Link>
        <div className="flex space-x-3">
          <Link 
            to={`/journals/edit/${journal.id}`}
            className="btn-secondary flex items-center"
          >            
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit Entry
          </Link>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger flex items-center"
          >            
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete Entry
          </button>
        </div>
      </div>

      {/* Journal content */}
      <div className="card p-8">
        <div className="journal-date mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>{formattedDate}</span>
          <span className="mx-2 text-neutral-300">•</span>
          <span>{formattedTime}</span>
        </div>

        <h1 className="heading-lg mb-6">{journal.title}</h1>

        <div className="journal-editor !bg-transparent !border-none !p-0 !shadow-none !min-h-0 body-lg mb-8 whitespace-pre-wrap">
          {journal.content}
        </div>

        {journal.tags && journal.tags.length > 0 && (
          <div className="mt-8 border-t border-neutral-200 pt-6">
            <p className="body-sm text-neutral-600 mb-3">Tagged with:</p>
            <div className="journal-tags">
              {journal.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="journal-tag"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="card card-glass max-w-md w-full p-6">
            <h3 className="heading-sm mb-4">Confirm Deletion</h3>
            <p className="body-md mb-6">Are you sure you want to delete this journal entry? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalDetail;
