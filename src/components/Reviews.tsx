import React from 'react';
import { Review } from '../types';
import ReviewCard from './ReviewCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2rem] shadow-sm border border-white/50 dark:border-slate-700/50 p-12">
        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
            <Filter className="w-8 h-8 text-slate-300 dark:text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-700 dark:text-slate-200">No reviews found</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mt-2">We couldn't find any reviews matching your criteria. Try adjusting your filters or check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Customer Feedback</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Real-time insights from WhatsApp interactions</p>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl text-slate-600 dark:text-slate-300 text-sm font-medium shadow-sm border border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-xl text-white text-sm font-medium shadow-lg shadow-indigo-200/50 dark:shadow-none hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Customize</span>
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      
  
      <div className="flex justify-center pt-8">
         <button className="px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-full text-slate-500 dark:text-slate-400 text-sm font-medium shadow-sm border border-white/50 dark:border-slate-700/50 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all">
            Load More Reviews
         </button>
      </div>
    </div>
  );
};

export default Reviews;