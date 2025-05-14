/** @jsxImportSource react */
import { useState, useEffect } from 'react';

interface SavedText {
  id: string;
  text: string;
  timestamp: number;
}

export default function SavedTexts() {
  const [savedTexts, setSavedTexts] = useState<SavedText[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

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
    // Dispatch a custom event with the text to load
    const event = new CustomEvent('loadSavedText', { 
      detail: { text },
      bubbles: true // Make sure the event bubbles up
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-white flex items-center font-space-grotesk">
          <span className="mr-2">📝</span> Saved Texts
        </h3>
        {savedTexts.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        )}
      </div>
      
      {savedTexts.length === 0 ? (
        <p className="text-gray-400 font-space-mono">No saved texts yet. Save your birth details to see them here.</p>
      ) : (
        <div className={`space-y-4 transition-all duration-300 ${isExpanded ? 'max-h-[500px] overflow-y-auto' : 'max-h-[200px] overflow-y-auto'}`}>
          {savedTexts.map((saved) => (
            <div key={saved.id} className="bg-gray-700/50 rounded-lg p-4 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-400 font-space-mono">
                  {new Date(saved.timestamp).toLocaleString()}
                </span>
                <button
                  onClick={() => deleteSavedText(saved.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </div>
              <p className="text-gray-200 mb-3 whitespace-pre-wrap font-space-mono">{saved.text}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => loadText(saved.text)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-space-grotesk"
                >
                  Load
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 