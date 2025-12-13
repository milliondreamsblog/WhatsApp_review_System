import React from 'react';
import { Review } from '../types';
import { Star, ThumbsUp, ThumbsDown, Calendar, User, MessageCircle, CheckCircle2 } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const sentimentColor = 
    review.sentiment === 'positive' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' :
    review.sentiment === 'negative' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300' :
    'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300';

  const sentimentIcon = 
    review.sentiment === 'positive' ? <ThumbsUp className="w-3 h-3 mr-1" /> :
    review.sentiment === 'negative' ? <ThumbsDown className="w-3 h-3 mr-1" /> :
    <MessageCircle className="w-3 h-3 mr-1" />;

  return (
    <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-[1.5rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/50 dark:border-slate-700/50 hover:bg-white/90 dark:hover:bg-slate-800/70 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 group relative overflow-hidden">
      
      
      <div className={`absolute left-0 top-8 bottom-8 w-1 rounded-r-full ${
        review.sentiment === 'positive' ? 'bg-emerald-400 dark:bg-emerald-500' : 
        review.sentiment === 'negative' ? 'bg-rose-400 dark:bg-rose-500' : 'bg-slate-300 dark:bg-slate-600'
      }`} />

      <div className="flex items-start justify-between mb-4 pr-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12   rounded-2xl bg-slate-50/80 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600/50 flex items-center justify-center text-slate-400 dark:text-slate-400 shadow-inner">
               <User className="w-6 h-6"/>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-[0.6rem] px-1.5 py-0.5 rounded-full border-2 border-white dark:border-slate-800 font-bold shadow-sm">
              WA
            </div>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100 leading-tight">{review.user_name}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{review.contact_number}</p>
          </div>
        </div>
        
        <div className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center border border-transparent dark:border-white/5 ${sentimentColor}`}>
          {sentimentIcon}
          <span className="capitalize">{review.sentiment || 'Neutral'}</span>
        </div>
      </div>

      <div className="pl-3 mb-4">
        <div className="flex items-center gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              className={`w-3.5 h-3.5 ${
                (review.rating || 0) >= star 
                  ? 'text-amber-400 fill-amber-400' 
                  : 'text-slate-200 dark:text-slate-700'
              }`} 
            />
          ))}
          <span className="ml-2 text-xs text-slate-400 dark:text-slate-500 font-medium">({review.rating?.toFixed(1)})</span>
        </div>
        
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">{review.product_name}</h4>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
          {review.product_review}
        </p>
      </div>

      <div className="pl-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
        <div className="flex items-center text-xs text-slate-400 dark:text-slate-500 gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(review.created_at).toLocaleDateString()}</span>
        </div>
        
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;