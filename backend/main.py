from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from twilio.twiml.messaging_response import MessagingResponse
from supabase import create_client, Client
from conversation_handler import ConversationHandler
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

@app.get("/")
def root():
    return {"message": "WhatsApp Review Collector API", "status": "running"}
