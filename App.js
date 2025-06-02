import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Globe, ArrowRight, Loader2, AlertCircle, Volume2, VolumeX, Sparkles } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

// Realistic Animated Avatar Component
const AnimatedAvatar = ({ isPlaying, isSpeaking }) => {
  return (
    <div className={`relative w-48 h-64 mx-auto mb-6 ${isSpeaking ? 'animate-gentle-sway' : ''}`}>
      {/* Background glow when speaking */}
      {isPlaying && (
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-lg opacity-20 blur-xl animate-pulse" />
      )}
      
      {/* Main Avatar Container */}
      <div className="relative w-full h-full">
        <svg viewBox="0 0 200 260" className="w-full h-full">
          {/* Neck */}
          <path d="M 85 190 L 85 220 Q 100 225 115 220 L 115 190" fill="#c8876b" />
          <ellipse cx="100" cy="220" rx="30" ry="20" fill="#c8876b" />
          
          {/* Face Base - Heart shaped */}
          <path d="M 100 60 Q 55 60 45 90 Q 40 120 50 140 Q 60 160 75 170 Q 90 180 100 185 Q 110 180 125 170 Q 140 160 150 140 Q 160 120 155 90 Q 145 60 100 60" 
                fill="#d4967a" />
          
          {/* Hair Back - Long black hair */}
          <path d="M 45 70 Q 35 40 60 25 Q 80 15 100 15 Q 120 15 140 25 Q 165 40 155 70 L 160 100 L 165 130 L 170 160 L 165 190 L 160 220 Q 155 240 150 250 L 140 245 L 145 220 L 140 190 L 135 160 L 130 190 L 125 220 L 120 250 L 115 220 L 110 190 L 105 160 L 100 190 L 95 220 L 90 250 L 85 220 L 80 190 L 75 160 L 70 190 L 65 220 L 60 245 L 50 250 Q 45 240 40 220 L 35 190 L 30 160 L 35 130 L 40 100 Z" 
                fill="#1a1a1a" />
          
          {/* Ears */}
          <ellipse cx="48" cy="110" rx="10" ry="18" fill="#d4967a" />
          <ellipse cx="152" cy="110" rx="10" ry="18" fill="#d4967a" />
          
          {/* Gold Earrings */}
          <circle cx="48" cy="125" r="6" fill="#FFD700" />
          <circle cx="48" cy="125" r="4" fill="#FFA500" />
          <circle cx="152" cy="125" r="6" fill="#FFD700" />
          <circle cx="152" cy="125" r="4" fill="#FFA500" />
          
          {/* Face Shading */}
          <ellipse cx="100" cy="120" rx="45" ry="55" fill="#d4967a" />
          
          {/* Hair Front - Center parting with side swept bangs */}
          <path d="M 100 40 Q 90 35 80 40 Q 70 45 65 55 Q 60 65 60 75 Q 65 70 70 65 Q 80 55 90 50 Q 95 45 100 40" 
                fill="#1a1a1a" />
          <path d="M 100 40 Q 110 35 120 40 Q 130 45 135 55 Q 140 65 140 75 Q 135 70 130 65 Q 120 55 110 50 Q 105 45 100 40" 
                fill="#1a1a1a" />
          
          {/* Forehead */}
          <ellipse cx="100" cy="80" rx="35" ry="20" fill="#d4967a" />
          
          {/* Bindi */}
          <circle cx="100" cy="80" r="3" fill="#DC143C" />
          
          {/* Eyebrows - Natural arch */}
          <path d="M 70 88 Q 80 85 88 88" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 112 88 Q 120 85 130 88" stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          
          {/* Eyes with golden eyeshadow */}
          <g className="animate-blink">
            {/* Left Eye */}
            <ellipse cx="78" cy="100" rx="10" ry="6" fill="#FFD700" opacity="0.3" />
            <ellipse cx="78" cy="102" rx="12" ry="8" fill="#fff" />
            <ellipse cx="78" cy="102" rx="7" ry="7" fill="#2d1810" />
            <ellipse cx="80" cy="100" rx="2" ry="2" fill="#fff" />
            <path d="M 66 102 Q 78 98 90 102" stroke="#1a1a1a" strokeWidth="1" fill="none" />
            <path d="M 70 104 Q 78 106 86 104" stroke="#1a1a1a" strokeWidth="0.8" fill="none" />
            
            {/* Right Eye */}
            <ellipse cx="122" cy="100" rx="10" ry="6" fill="#FFD700" opacity="0.3" />
            <ellipse cx="122" cy="102" rx="12" ry="8" fill="#fff" />
            <ellipse cx="122" cy="102" rx="7" ry="7" fill="#2d1810" />
            <ellipse cx="124" cy="100" rx="2" ry="2" fill="#fff" />
            <path d="M 110 102 Q 122 98 134 102" stroke="#1a1a1a" strokeWidth="1" fill="none" />
            <path d="M 114 104 Q 122 106 130 104" stroke="#1a1a1a" strokeWidth="0.8" fill="none" />
          </g>
          
          {/* Nose - Delicate */}
          <path d="M 100 105 L 97 120 Q 95 125 97 125" stroke="#c8876b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M 100 105 L 103 120 Q 105 125 103 125" stroke="#c8876b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <ellipse cx="97" cy="125" rx="2" ry="1.5" fill="#c8876b" opacity="0.5" />
          <ellipse cx="103" cy="125" rx="2" ry="1.5" fill="#c8876b" opacity="0.5" />
          
          {/* Lips - Beautiful pink lips with subtle animation */}
          <g>
            {isPlaying ? (
              <g className="animate-subtle-talk">
                {/* Upper lip */}
                <path d="M 85 140 Q 90 137 95 138 Q 100 136 105 138 Q 110 137 115 140 Q 107 142 100 142 Q 93 142 85 140" 
                      fill="#e91e63" />
                {/* Lower lip - slightly animated */}
                <path d="M 85 140 Q 93 142 100 142 Q 107 142 115 140 Q 110 147 100 148 Q 90 147 85 140" 
                      fill="#ec407a" />
                {/* Teeth hint - very subtle */}
                <rect x="92" y="141" width="16" height="1.5" rx="1" fill="#fff" opacity="0.7" />
              </g>
            ) : (
              <g>
                {/* Upper lip */}
                <path d="M 85 140 Q 90 137 95 138 Q 100 136 105 138 Q 110 137 115 140 Q 107 141 100 141 Q 93 141 85 140" 
                      fill="#e91e63" />
                {/* Lower lip */}
                <path d="M 85 140 Q 93 141 100 141 Q 107 141 115 140 Q 110 145 100 146 Q 90 145 85 140" 
                      fill="#ec407a" />
                {/* Lip shine */}
                <ellipse cx="100" cy="138" rx="4" ry="2" fill="#fff" opacity="0.2" />
              </g>
            )}
          </g>
          
          {/* Cheeks - subtle blush */}
          <circle cx="65" cy="115" r="10" fill="#ff6b6b" opacity="0.15" />
          <circle cx="135" cy="115" r="10" fill="#ff6b6b" opacity="0.15" />
          
          {/* Chin highlight */}
          <ellipse cx="100" cy="165" rx="8" ry="5" fill="#e5a788" opacity="0.3" />
          
          {/* Hair strands for realism */}
          <path d="M 45 80 Q 48 100 50 120" stroke="#2a2a2a" strokeWidth="1" opacity="0.5" fill="none" />
          <path d="M 155 80 Q 152 100 150 120" stroke="#2a2a2a" strokeWidth="1" opacity="0.5" fill="none" />
          
          {/* Neck shading */}
          <ellipse cx="100" cy="195" rx="15" ry="8" fill="#c8876b" opacity="0.3" />
          
          {/* Traditional clothing hint - saree/dress neckline */}
          <path d="M 70 220 Q 100 210 130 220 L 135 240 Q 100 235 65 240 Z" fill="#9c27b0" />
          <path d="M 85 225 Q 100 220 115 225" stroke="#7b1fa2" strokeWidth="1" fill="none" />
        </svg>
        
        {/* Sound waves when speaking - more subtle */}
        {isPlaying && (
          <div className="absolute -right-8 top-1/2 -translate-y-1/2">
            <div className="space-y-2">
              <div className="w-6 h-0.5 bg-yellow-400 animate-sound-wave" />
              <div className="w-8 h-0.5 bg-pink-400 animate-sound-wave animation-delay-100" />
              <div className="w-5 h-0.5 bg-yellow-400 animate-sound-wave animation-delay-200" />
              <div className="w-9 h-0.5 bg-pink-400 animate-sound-wave animation-delay-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('ta');
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [audioData, setAudioData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const audioRef = useRef(null);

  // Fetch supported languages on component mount
  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/languages`);
      const data = await response.json();
      setLanguages(data.languages);
    } catch (err) {
      setError('Failed to load languages');
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');
    setAudioData(null);
    setIsPlaying(false);
    setShowAvatar(false);

    try {
      const response = await fetch(`${API_BASE_URL}/translate-and-speak`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          targetLanguage: targetLanguage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }

      setTranslatedText(data.translatedText);
      
      // Set audio data if available
      if (data.audio) {
        setAudioData(data.audio);
        setShowAvatar(true);
      }
    } catch (err) {
      setError(err.message || 'Translation failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = () => {
    if (audioData && audioRef.current) {
      const audioBlob = base64ToBlob(audioData, 'audio/mp3');
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current.src = audioUrl;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Error playing audio:', err);
          setError('Failed to play audio');
        });
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleLanguageSelect = (langCode) => {
    setTargetLanguage(langCode);
    setIsDropdownOpen(false);
    setTranslatedText('');
    setShowAvatar(false);
  };

  // Handle audio ended event
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  const selectedLanguage = languages.find(lang => lang.code === targetLanguage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <style jsx>{`
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0; }
        }
        
        @keyframes subtle-talk {
          0%, 100% { 
            transform: scaleY(1);
          }
          50% { 
            transform: scaleY(1.1);
          }
        }
        
        @keyframes gentle-sway {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-1px) rotate(-0.3deg); }
          75% { transform: translateX(1px) rotate(0.3deg); }
        }
        
        @keyframes sound-wave {
          0%, 100% { 
            transform: scaleX(1);
            opacity: 0.3;
          }
          50% { 
            transform: scaleX(1.3);
            opacity: 0.8;
          }
        }
        
        .animate-blink {
          animation: blink 5s infinite;
        }
        
        .animate-subtle-talk {
          animation: subtle-talk 0.6s infinite ease-in-out;
        }
        
        .animate-gentle-sway {
          animation: gentle-sway 4s infinite ease-in-out;
        }
        
        .animate-sound-wave {
          animation: sound-wave 1.2s infinite ease-in-out;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <Globe className="w-10 h-10 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">AI Language Translator</h1>
          </div>
          <p className="text-gray-600">Translate English to Indian Languages with Voice</p>
        </div>

        {/* Main Translation Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Language Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Language
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full md:w-64 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span className="font-medium">
                  {selectedLanguage ? selectedLanguage.name : 'Select Language'}
                </span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full md:w-64 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={`w-full px-4 py-3 text-left hover:bg-indigo-50 transition-colors ${
                        lang.code === targetLanguage ? 'bg-indigo-100 font-semibold' : ''
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Translation Areas */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                English Text
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <div className="mt-2 text-sm text-gray-500">
                {inputText.length} characters
              </div>
            </div>

            {/* Output Area with Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {selectedLanguage ? `${selectedLanguage.name} Translation` : 'Translation'}
              </label>
              
              {/* Avatar appears when translation is ready */}
              {showAvatar && translatedText && !isLoading && (
                <AnimatedAvatar isPlaying={isPlaying} isSpeaking={isPlaying} />
              )}
              
              <div className="w-full h-48 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                  </div>
                ) : translatedText ? (
                  <div>
                    <p className="text-lg mb-4">{translatedText}</p>
                    {audioData && (
                      <button
                        onClick={isPlaying ? stopAudio : playAudio}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg transform hover:scale-105"
                      >
                        {isPlaying ? (
                          <>
                            <VolumeX className="w-5 h-5 mr-2" />
                            Stop Speaking
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-5 h-5 mr-2" />
                            Listen to Translation
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 italic">Translation will appear here...</p>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Translate Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleTranslate}
              disabled={isLoading || !inputText.trim()}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Translating...
                </>
              ) : (
                <>
                  Translate
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p>Powered by Mistral AI & Ollama</p>
        </div>
      </div>
      
      {/* Hidden audio element */}
      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}

export default App;