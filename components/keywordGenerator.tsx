import { useState } from 'react';
import axios from 'axios';

const KeywordGenerator = () => {
  const [preference, setPreference] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleGenerate = async () => {
    try {
      const response = await axios.post('/api/generateKeywords', { userPreference: preference });
      setKeywords(response.data.keywords);
    } catch (error) {
      console.error('Error generating keywords: ', error);
    }
  };

  return (
    <div>
      <h1>Keyword Generator</h1>
      <input
        type="text"
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        placeholder="Enter your preference (e.g., 'I like y2k')"
      />
      <button onClick={handleGenerate}>Generate Keywords</button>

      <div>
        <h2>Generated Keywords:</h2>
        <ul>
          {keywords.map((keyword, index) => (
            <li key={index}>{keyword}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default KeywordGenerator;
