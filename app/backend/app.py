from crypt import methods
from flask import Flask, request
import database

app = Flask(__name__)


@app.route("/", methods=['GET'])
def landing_page_content():
    return database.get_beneficiaries()


@app.route("/create", methods=["POST"])
def create_new_beneficiary():
    payload = request.get_json()
    result = database.create_beneficiary(payload)
    return result


@app.route('/update', methods=["PUT"])
def update_beneficiary():
  payload = request.get_json()
  result = database.update_beneficiary(payload)
  return result


@app.route('/delete', methods=["DELETE"])
def delete_beneficiary():
  payload = request.args
  result = database.delete_beneficiary(payload["cpf"])
  return result
