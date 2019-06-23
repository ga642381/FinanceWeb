import json
import pymongo

mongo_url = "mongodb+srv://finance:finance@cluster0-uvsdu.gcp.mongodb.net/test?retryWrites=true&w=majority"

client = pymongo.MongoClient(mongo_url)

def df2json(df):
    data = json.loads(df.T.to_json()).values()
    return data

def Mongo_show_database_names(client):
    print(client.list_database_names())

#
def Mongo_get_code_data(client):
    Code_mongo = client["TaiwanStock"]["stocks"]
    docs = []
    for doc in Code_mongo.find():
        docs.append(doc)
    return docs

def Mongo_del_collection(collection):
    collection.drop()
    
def Mongo_update_collection(collection, dataframe):
    input_data = df2json(dataframe)
    for doc in input_data:
        collection.update_one(doc, {'$set' : doc}, upsert=True)

