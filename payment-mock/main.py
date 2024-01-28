from threading import Thread
from flask import Flask, request
import requests
import os
import time

RESPOSE_URL = os.environ["RESPONSE_URL"]
WAIT_SECONDS = int(os.environ["WAIT_SECONDS"])
PORT = int(os.environ["PORT"])

app = Flask(__name__)

will_approve = True

def get_status():
    if will_approve:
        return 'approved'
    return 'canceled'

@app.put("/toggle")
def toggle_result():
    global will_approve

    will_approve = not will_approve

    return f"Now the payments will be {get_status()}"

def confirm_payment(identifier):
    print("Sleeping", flush=True)
    time.sleep(WAIT_SECONDS)
    
    print("Sending", flush=True)
    response = requests.post(RESPOSE_URL, json={"identifier": identifier, "status": get_status()}, timeout=5)
    print("confirm", response, flush=True)
    print("status", get_status(), flush=True)


@app.post("/payment")
def receive_payment():
    Thread(target=confirm_payment, args=(request.json["identifier"],)).start()

    return ""

@app.get("/health")
def health_check():
    return ""

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
