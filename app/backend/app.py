from flask import Flask
import database

app = Flask(__name__)

@app.route("/")
def landing_page():
  return database.get_beneficiaries()