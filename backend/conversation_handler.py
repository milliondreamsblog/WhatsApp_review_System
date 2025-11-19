from enum import Enum
from typing import Dict, Tuple, Optional

class ConversationState(Enum):
    START = "start"
    WAITING_PRODUCT = "waiting_product"
    WAITING_NAME = "waiting_name"
    WAITING_REVIEW = "waiting_review"
    COMPLETE = "complete"

user_sessions: Dict[str, dict] = {}

class ConversationHandler:
    @staticmethod
    def handle_message(contact_number: str, message: str) -> Tuple[str, Optional[Dict]]:
        session = user_sessions.get(contact_number, {
            "state": ConversationState.START,
            "data": {}
        })

        current_state = session["state"]
        response = ""
        review_data = None

        if current_state == ConversationState.START:
            response = "Which product is this review for?"
            session["state"] = ConversationState.WAITING_PRODUCT

        elif current_state == ConversationState.WAITING_PRODUCT:
            session["data"]["product_name"] = message
            response = "What's your name?"
            session["state"] = ConversationState.WAITING_NAME

        elif current_state == ConversationState.WAITING_NAME:
            session["data"]["user_name"] = message
            product = session["data"]["product_name"]
            response = f"Please send your review for {product}."
            session["state"] = ConversationState.WAITING_REVIEW

        elif current_state == ConversationState.WAITING_REVIEW:
            session["data"]["product_review"] = message
            session["data"]["contact_number"] = contact_number

            user_name = session["data"]["user_name"]
            product = session["data"]["product_name"]
            response = f"Thanks {user_name} -- your review for {product} has been recorded."

            review_data = session["data"].copy()

            session["state"] = ConversationState.START
            session["data"] = {}

        user_sessions[contact_number] = session
        return response, review_data
