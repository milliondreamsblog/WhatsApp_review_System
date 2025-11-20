from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from twilio.twiml.messaging_response import MessagingResponse
from supabase import create_client, Client
from conversation_handler import ConversationHandler
from textblob import TextBlob
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

def analyze_sentiment(text: str) -> str:
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    if polarity > 0.1:
        return "positive"
    elif polarity < -0.1:
        return "negative"
    else:
        return "neutral"

@app.post("/webhook/whatsapp")
async def whatsapp_webhook(request: Request):
    form_data = await request.form()
    incoming_msg = form_data.get('Body', '').strip()
    from_number = form_data.get('From', '')

    response_text, review_data = ConversationHandler.handle_message(
        from_number, incoming_msg
    )

    if review_data:
        try:
            review_data["sentiment"] = analyze_sentiment(review_data.get("product_review", ""))
            supabase.table('reviews').insert(review_data).execute()
        except Exception as e:
            print(f"Error saving to database: {e}")

    resp = MessagingResponse()
    resp.message(response_text)

    return Response(content=str(resp), media_type="application/xml")

@app.get("/api/reviews")
def get_reviews():
    try:
        response = supabase.table('reviews').select('*').order('created_at', desc=True).execute()
        return response.data
    except Exception as e:
        print(f"Error fetching reviews: {e}")
        return []

@app.get("/api/analytics")
def get_analytics():
    try:
        response = supabase.table('reviews').select('*').execute()
        reviews = response.data

        if not reviews:
            return {
                "total_reviews": 0,
                "average_rating": 0,
                "sentiment_breakdown": {"positive": 0, "negative": 0, "neutral": 0},
                "products": [],
                "ratings_distribution": {}
            }

        total_reviews = len(reviews)
        ratings = [r.get("rating", 0) for r in reviews if r.get("rating")]
        average_rating = sum(ratings) / len(ratings) if ratings else 0

        sentiment_counts = {"positive": 0, "negative": 0, "neutral": 0}
        for review in reviews:
            sentiment = review.get("sentiment", "neutral")
            if sentiment in sentiment_counts:
                sentiment_counts[sentiment] += 1

        products = {}
        for review in reviews:
            product = review.get("product_name", "Unknown")
            if product not in products:
                products[product] = {
                    "count": 0,
                    "avg_rating": 0,
                    "ratings": []
                }
            products[product]["count"] += 1
            if review.get("rating"):
                products[product]["ratings"].append(review["rating"])

        for product in products:
            if products[product]["ratings"]:
                products[product]["avg_rating"] = sum(products[product]["ratings"]) / len(products[product]["ratings"])
            del products[product]["ratings"]

        ratings_distribution = {}
        for r in ratings:
            ratings_distribution[str(r)] = ratings_distribution.get(str(r), 0) + 1

        return {
            "total_reviews": total_reviews,
            "average_rating": round(average_rating, 2),
            "sentiment_breakdown": sentiment_counts,
            "products": products,
            "ratings_distribution": ratings_distribution
        }
    except Exception as e:
        print(f"Error fetching analytics: {e}")
        return {}

@app.get("/")
def root():
    return {"message": "WhatsApp Review Collector API", "status": "running"}
