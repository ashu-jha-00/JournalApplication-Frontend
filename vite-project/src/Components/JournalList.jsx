import React, { useEffect, useState } from "react";

function JournalList() {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/journal")
      .then((response) => response.json())
      .then((data) => {
        setJournals(data);
      })
      .catch((error) => {
        console.error("Error fetching journal entries:", error);
      });
  }, []);
  return (
    <div className="container-app py-4">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800">Journal Entries</h1>
      {journals.length === 0 ? (
        <div className="card p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon-lg mx-auto text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="mt-4 text-neutral-600">No journal entries yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {journals.map((entry, index) => (
            <div key={index} className="journal-card card p-5">
              <h2 className="text-xl font-semibold text-neutral-800 mb-2">{entry.title}</h2>
              <p className="text-neutral-600 mb-3">{entry.content}</p>
              <small className="text-neutral-500">Date: {new Date(entry.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JournalList;

