import { useState, useEffect } from 'react';
import { MessageSquare, User, Package, Calendar } from 'lucide-react';

interface Review {
  id: string;
  contact_number: string;
  user_name: string;
  product_name: string;
  product_review: string;
  created_at: string;
}

function App() {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading reviews...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-10 h-10 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Reviews</h1>
              <p className="text-gray-600 mt-1">Collected via WhatsApp</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              No reviews yet. Send a message to WhatsApp to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-start justify-between mb-4 pb-4 border-b-2 border-gray-100">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {review.product_name}
                    </h3>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 italic leading-relaxed">
                    "{review.product_review}"
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      {review.user_name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(review.created_at)}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {review.contact_number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-gray-600">
            Total Reviews: <span className="font-bold text-blue-600">{reviews.length}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
