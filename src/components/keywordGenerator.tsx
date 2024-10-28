import { useState } from 'react';
import axios from 'axios';

const KeywordGenerator = () => {
  const [preference, setPreference] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setKeywords([]);

    try {
      const response = await axios.post('/api/generateKeywords', { userPreference: preference });
      let generatedKeywords = response.data.keywords.filter((kw: string) => {
        const trimmedKeyword = kw.trim();
        // Filter out empty keywords and subheadings like "キャラクター:"
        return trimmedKeyword !== '' && !trimmedKeyword.includes('キャラクター');
      });

      // Remove the first two keywords if they match the prompt restatement
      if (generatedKeywords[0]?.includes(preference)) {
        generatedKeywords.shift();
      }
      if (generatedKeywords[0]?.includes(preference)) { // Check the new first keyword
        generatedKeywords.shift();
      }

      // Limit the number of displayed keywords to 10
      generatedKeywords = generatedKeywords.slice(0, 10);

      if (generatedKeywords.length > 0) {
        setKeywords(generatedKeywords);
      } else {
        setError('キーワードが生成されませんでした。');
      }
    } catch (error) {
      setError('キーワードの生成に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="w-full flex justify-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Generative AI キーワード
        </h1>
      </header>

      {/* Input and Button */}
      <div className="w-full max-w-lg mb-6">
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="例: カジュアル、かわいい"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-900 transition-all disabled:bg-gray-400"
        >
          {loading ? '生成中...' : 'キーワードを生成'}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Display Keywords */}
      <div className="w-full max-w-4xl mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {keywords.map((keyword, index) => (
            <div key={index} className="border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 text-white p-2 rounded-t-lg">
                <h2 className="text-lg font-semibold">{`キーワード ${index + 1}`}</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-900">{keyword}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeywordGenerator;
