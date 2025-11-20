import { useState, useEffect } from 'react';
import { MessageSquare, User, Package, Calendar, Star, TrendingUp } from 'lucide-react';
import Reviews from './components/Reviews';
import Analytics from './components/Analytics';

type TabType = 'reviews' | 'analytics';

interface Review {
  id: string;
  contact_number: string;
  user_name: string;
  product_name: string;
  product_review: string;
  rating?: number;
  sentiment?: string;
  created_at: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('reviews');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/reviews');
      const data = await response.json();
      setReviews(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-10 h-10 text-slate-700" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Product Reviews</h1>
              <p className="text-slate-600 mt-1">Collected via WhatsApp</p>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'reviews'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Reviews
              </div>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-3 font-medium transition-colors ${
                activeTab === 'analytics'
                  ? 'text-slate-900 border-b-2 border-slate-900'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Analytics
              </div>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'reviews' ? (
          <Reviews reviews={reviews} />
        ) : (
          <Analytics reviews={reviews} />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-slate-600">
            Total Reviews: <span className="font-bold text-slate-900">{reviews.length}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
