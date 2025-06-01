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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Journal Entries</h1>
      {journals.map((entry, index) => (
        <div key={index} className="mb-4 p-4 rounded shadow bg-gray-100">
          <h2 className="text-xl font-semibold">{entry.title}</h2>
          <p className="text-gray-700">{entry.content}</p>
          <small className="text-gray-500">Date: {new Date(entry.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default JournalList;

