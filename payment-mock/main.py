from threading import Thread
from flask import Flask, request
import requests
import os
import time

RESPOSE_URL = os.environ["RESPONSE_URL"]
WAIT_SECONDS = int(os.environ["WAIT_SECONDS"])
PORT = int(os.environ["PORT"])

app = Flask(__name__)

payments = []


def confirm_payment(identifier):
    time.sleep(WAIT_SECONDS)

    response = requests.post(RESPOSE_URL, json={"identifier": identifier, "status": "approved"})
    print("confirm", response, flush=True)


@app.post("/payment")
def receive_payment():
    Thread(target=confirm_payment, args=(request.json["identifier"],)).start()

    return ""


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
