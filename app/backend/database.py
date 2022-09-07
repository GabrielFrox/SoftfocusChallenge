import json
import string
from pymongo import MongoClient

# Environment variables its a better choice to sensible data like this
# fortunately this time, security not is an issue
client = MongoClient(host='db', port=27017)
# client = MongoClient('mongodb://localhost/27017')
db = client.proagro_facil
beneficiary_collection = db.beneficiaries

# Just a helper
def check_existence_by_cpf(cpf: string):
    result = beneficiary_collection.find_one({"cpf": cpf})
    return True if result else False


# Recover every beneficiary from collection
def get_beneficiaries():
    result = beneficiary_collection.find({}, {"_id": False})
    return list(result)


# Create a new document with beneficiary information
def create_beneficiary(person_data: json):
    check = check_existence_by_cpf(person_data["cpf"])
    if check:
        return "CPF já cadastrado!"
    else:
        new_beneficiary = beneficiary_collection.insert_one(person_data)
        return (
            'Beneficiário cadastrado com sucesso! ID:'
            f'{new_beneficiary.inserted_id}'
        )


# Update one beneficiary information after check his existence
def update_beneficiary(new_data: json):
    cpf = new_data["cpf"]
    check = check_existence_by_cpf(cpf)
    if check:
        beneficiary_collection.update_one({"cpf": cpf}, {"$set": new_data})
        return "Atualizado com sucesso!"
    else:
        return "CPF não encontrado!"


# Delete beneficiary from collection
def delete_beneficiary(cpf: string):
    check = check_existence_by_cpf(cpf)
    if check:
        beneficiary_collection.delete_one({"cpf": cpf})
        return "Beneficiário deletado com sucesso!"
    else:
        return "Beneficiário não encontrado"
