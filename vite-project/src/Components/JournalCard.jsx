import React from 'react';
import { Link } from 'react-router-dom';

const JournalCard = ({ journal }) => {
  // Format the date for display
  const formattedDate = new Date(journal.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Function to truncate text if it's too long
  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };  return (
    <div className="card overflow-hidden journal-card">
      <div className="p-6">
        <div className="journal-date mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="heading-sm text-neutral-800 mb-3">{journal.title}</h3>
        
        <p className="body-md text-neutral-600 mb-4">{truncateText(journal.content)}</p>
        
        <div className="flex justify-between items-center mt-5">
          {journal.tags && journal.tags.length > 0 && (
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
          )}
            <Link 
            to={`/journals/${journal.id}`}
            className="btn-text flex items-center p-0 m-0 font-medium rounded-md transition-all"
          >
            Read more
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-xs ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
