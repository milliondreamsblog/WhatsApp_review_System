import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Reviews from './components/Reviews';
import Analytics from './components/Analytics';
import { Review, TabType } from './types';

// Mock data to be used if fetch fails (simulating the database)
const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    contact_number: '+91 623297123',
    user_name: 'Deepak mishra',
    product_name: 'Cloud Storage Pro',
    product_review: 'The interface is incredibly intuitive. I was able to migrate all my files in minutes. Highly recommended for small businesses!',
    rating: 2,
    sentiment: 'negative',
    created_at: '2023-10-24T10:00:00Z',
  },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    try {
      // In a real scenario, this fetches from the backend. 
      // For this demo, we'll simulate a fetch with a fallback to mock data
      const response = await fetch('http://localhost:8000/api/reviews');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.log('Using mock data due to fetch error:', error);
      // Simulate network delay for realism
      setTimeout(() => {
        setReviews(MOCK_REVIEWS);
        setLoading(false);
      }, 800);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div className={isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-[#eef2f6] dark:bg-slate-900 flex items-center justify-center transition-colors duration-300">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-100 dark:border-slate-700 rounded-full animate-spin border-t-indigo-600 dark:border-t-indigo-400"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-indigo-600 dark:text-indigo-400 text-xs">
              LOADING
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#eef2f6] dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 selection:text-indigo-700 dark:selection:bg-indigo-900 dark:selection:text-indigo-300 transition-colors duration-300">
        
        {/* Background ambient glow effects for glassmorphism depth */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 dark:bg-indigo-900/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/20 dark:bg-blue-900/20 blur-[120px]" />
        </div>

        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Wrapper */}
        <div className="lg:ml-64 min-h-screen flex flex-col transition-all duration-300 relative z-10">
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {activeTab === 'reviews' ? (
                <Reviews reviews={reviews} />
              ) : (
                <Analytics reviews={reviews} isDarkMode={isDarkMode} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;