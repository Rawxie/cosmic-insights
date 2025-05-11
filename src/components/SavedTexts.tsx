/** @jsxImportSource react */
import { useState, useEffect } from 'react';

interface SavedText {
  id: string;
  text: string;
  timestamp: number;
}

export default function SavedTexts() {
  const [savedTexts, setSavedTexts] = useState<SavedText[]>([]);

  useEffect(() => {
    loadSavedTexts();
    // Listen for new text saves
    window.addEventListener('textSaved', loadSavedTexts);
    return () => window.removeEventListener('textSaved', loadSavedTexts);
  }, []);

  const loadSavedTexts = () => {
    const saved = localStorage.getItem('savedAstrologyTexts');
    if (saved) {
      setSavedTexts(JSON.parse(saved));
    }
  };

  const deleteSavedText = (id: string) => {
    const updatedTexts = savedTexts.filter(text => text.id !== id);
    setSavedTexts(updatedTexts);
    localStorage.setItem('savedAstrologyTexts', JSON.stringify(updatedTexts));
  };

  const loadText = (text: string) => {
    window.dispatchEvent(new CustomEvent('loadSavedText', { detail: { text } }));
  };

  return (
    <div className="mt-8 bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Saved Texts</h3>
      {savedTexts.length === 0 ? (
        <p className="text-gray-400">No saved texts yet</p>
      ) : (
        <div className="space-y-4">
          {savedTexts.map((saved) => (
            <div key={saved.id} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-400">
                  {new Date(saved.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={() => deleteSavedText(saved.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-200 mb-2 whitespace-pre-wrap">{saved.text}</p>
              <button
                onClick={() => loadText(saved.text)}
                className="text-purple-400 hover:text-purple-300"
              >
                Load
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 