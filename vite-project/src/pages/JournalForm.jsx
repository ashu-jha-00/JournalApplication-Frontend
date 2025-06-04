import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getJournalById, createJournalEntry, updateJournalEntry } from '../services/journalService';
import Loading from '../Components/Loading';

const JournalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournal = async () => {
      if (!isEditMode) return;
      
      try {
        const data = await getJournalById(id);
        setFormData({
          title: data.title,
          content: data.content,
          tags: data.tags ? data.tags.join(', ') : '',
        });
      } catch (err) {
        setError('Failed to fetch journal details. Please try again later.');
        console.error('Error fetching journal:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJournal();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const journalData = {
        title: formData.title,
        content: formData.content,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
      };
      
      if (isEditMode) {
        await updateJournalEntry(id, journalData);
        navigate(`/journals/${id}`, { state: { message: 'Journal updated successfully' } });
      } else {
        const newJournal = await createJournalEntry(journalData);
        navigate(`/journals/${newJournal.id}`, { state: { message: 'Journal created successfully' } });
      }
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} journal entry. Please try again.`);
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} journal:`, err);
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container-app py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="heading-lg">
          {isEditMode ? 'Edit Journal Entry' : 'New Journal Entry'}
        </h1>
        <Link to="/journals" className="btn-text flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to journals
        </Link>
      </div>
      
      {error && (
        <div className="bg-error bg-opacity-10 border border-error border-opacity-20 text-error p-4 rounded-lg mb-6 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-sm mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="card p-8">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-neutral-700 mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="Give your entry a meaningful title"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="journal-editor"
            placeholder="Write your thoughts here..."
            rows={12}
          ></textarea>
        </div>
        
        <div className="mb-8">
          <label htmlFor="tags" className="block text-sm font-medium text-neutral-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="form-input"
            placeholder="work, personal, ideas, etc..."
          />
          <p className="text-xs text-neutral-500 mt-1">
            Separate tags with commas (e.g., "work, ideas, thoughts")
          </p>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/journals')}
            className="btn-secondary mr-3"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={submitting}
          >
            {submitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? 'Saving...' : 'Creating...'}
              </span>
            ) : (
              isEditMode ? 'Save Changes' : 'Create Entry'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JournalForm;
