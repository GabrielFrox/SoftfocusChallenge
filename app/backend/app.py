from crypt import methods
from flask import Flask, request, jsonify
from flask_cors import CORS
import database

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['GET'])
def landing_page_content():
    result = database.get_beneficiaries()
    return jsonify(result)


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

@app.route('/dev/populate', methods=['GET'])
def populate_db():
    result = database.populate_db()
    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
