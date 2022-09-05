import json
from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
db = client.proagro_facil
beneficiary_collection = db.beneficiaries

# Recover every beneficiary from collection
def get_beneficiaries():
  result = beneficiary_collection.find({}, {"_id": False})
  return list(result)

# Create a new document with beneficiary information
def create_beneficiary(person: json):
  new_beneficiary = beneficiary_collection.insert_one(person)
  return new_beneficiary.inserted_id

# Update one beneficiary information and check his existence
def update_beneficiary(new_data: json):
  cpf = new_data["cpf"]
  check_existence = beneficiary_collection.find_one({"cpf": cpf})
  if check_existence:
    beneficiary_collection.update_one({"cpf": cpf}, {"$set": new_data})
    return "Atualizado com sucesso!"
  else:
    return "CPF não encontrado!"