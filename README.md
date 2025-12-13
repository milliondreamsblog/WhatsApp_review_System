# WhatsApp Product Review Collector

A full-stack application that collects product reviews via WhatsApp and displays them in a beautiful web interface.

## Features

- Conversational WhatsApp bot for collecting reviews
- Stateful conversation flow (Product → Name → Review)
- Real-time review display with auto-refresh
- Clean, responsive UI with Tailwind CSS
- PostgreSQL database via Supabase
- FastAPI backend with Twilio integration

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: Supabase (PostgreSQL)
- **Frontend**: React + TypeScript + Tailwind CSS
- **WhatsApp API**: Twilio

## Architecture

```
User WhatsApp → Twilio → FastAPI Webhook → Supabase → React Frontend
```

### Conversation Flow

1. User sends any message to WhatsApp number
2. Bot asks: "Which product is this review for?"
3. User replies with product name
4. Bot asks: "What's your name?"
5. User replies with their name
6. Bot asks: "Please send your review for [product]"
7. User sends review
8. Bot confirms: "Thanks [name] -- your review for [product] has been recorded"
9. Review saved to database and displayed on frontend

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 16+
- Twilio account (free tier works)
- Supabase project

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

### 2. Frontend Setup

```bash
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 3. Twilio Configuration

1. **Sign up for Twilio**: Go to [twilio.com](https://www.twilio.com/) and create a free account

2. **Join WhatsApp Sandbox**:
   - Navigate to: Console → Messaging → Try it out → Send a WhatsApp message
   - Follow instructions to join the sandbox by sending a code to the Twilio WhatsApp number

3. **Configure Webhook**:
   - In Twilio Console → Messaging → Settings → WhatsApp sandbox settings
   - Set "When a message comes in" to: `https://your-domain.com/webhook/whatsapp`
   - Method: POST

4. **Local Development with ngrok**:
   ```bash
   # Install ngrok: https://ngrok.com/download
   ngrok http 8000

   # Copy the HTTPS URL (e.g., https://abc123.ngrok.io)
   # Set as webhook: https://abc123.ngrok.io/webhook/whatsapp
   ```
###. Open power shell and run this cmd
   ```"C:\Users\Akshat Darshi\Downloads\ngrok-v3-stable-windows-amd64\ngrok.exe" http 8000```

### 4. Database Setup

The database is already configured in Supabase with the following schema:

```sql
reviews
  - id (uuid, primary key)
  - contact_number (text)
  - user_name (text)
  - product_name (text)
  - product_review (text)
  - created_at (timestamptz)
```

Row Level Security (RLS) is enabled with policies for public read access.

## Usage

1. **Start Backend**: `cd backend && uvicorn main:app --reload --port 8000`
2. **Start Frontend**: `npm run dev`
3. **Expose via ngrok** (for testing): `ngrok http 8000`
4. **Configure Twilio webhook** with your ngrok URL
5. **Send WhatsApp message** to Twilio number to test

## API Endpoints

- `GET /` - Health check
- `GET /api/reviews` - Fetch all reviews (sorted by newest first)
- `POST /webhook/whatsapp` - Twilio webhook endpoint

## Project Structure

```
.
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── conversation_handler.py # Stateful conversation logic
│   ├── requirements.txt        # Python dependencies
│   └── .env.example           # Environment template
├── src/
│   ├── App.tsx                # Main React component
│   └── main.tsx               # React entry point
└── README.md
```

## Development Tips

### Testing the Conversation Flow

Test these scenarios:
- Normal flow: Product → Name → Review
- Multiple reviews from same number
- Empty messages
- Very long reviews
- Special characters

### Debugging

- Check FastAPI logs for webhook issues
- Verify Twilio webhook is receiving requests
- Check Supabase dashboard for database entries
- Use browser DevTools for frontend debugging

### Production Deployment

1. **Backend**: Deploy to Railway, Render, or AWS
2. **Frontend**: Deploy to Vercel or Netlify
3. **Twilio**: Upgrade to paid account for production WhatsApp number
4. **Database**: Supabase is production-ready
5. **State Management**: Replace in-memory sessions with Redis for multi-server deployments

## Limitations & Improvements

### Current Limitations
- In-memory session storage (resets on server restart)
- Single server only (won't work with load balancers)
- No authentication for frontend API
- WhatsApp sandbox limited to pre-approved numbers

### Potential Improvements
- Add Redis for persistent session storage
- Implement sentiment analysis on reviews
- Add review moderation dashboard
- Support for images/videos in reviews
- Export reviews to CSV/Excel
- Review analytics and charts
- Email notifications for new reviews

## Troubleshooting

**Webhook not receiving messages:**
- Verify ngrok is running
- Check Twilio webhook URL is correct
- Ensure FastAPI server is running on port 8000

**Reviews not saving:**
- Check Supabase credentials in `.env`
- Verify service role key (not anon key)
- Check FastAPI console for error logs

**Frontend not loading reviews:**
- Verify backend is running
- Check CORS settings in `main.py`
- Check browser console for errors

## License

MIT

## Support

For issues or questions, please check:
- Twilio WhatsApp API docs: https://www.twilio.com/docs/whatsapp
- FastAPI docs: https://fastapi.tiangolo.com/
- Supabase docs: https://supabase.com/docs
