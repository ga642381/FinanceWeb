# -*- coding: utf-8 -*-
import json
import pandas as pd
import pymongo

mongo_url = "mongodb+srv://ga642381:abc@taiwanstock-2i5kf.gcp.mongodb.net/test?retryWrites=true"
client = pymongo.MongoClient(mongo_url)

def df2bson(df):
    data = json.loads(df.T.to_json()).values()
    return data

def Mongo_show_database_names(client):
    print(client.list_database_names())

#@@@
def Mongo_get_code_data(client):
    Code_mongo = client["TaiwanStock"]["Code"]
    docs = []
    for doc in Code_mongo.find():
        docs.append(doc)
    return docs

def Mongo_del_collection(collection):
    collection.drop()
    
def Mongo_update_collection(collection, dataframe):
    input_data = df2bson(dataframe)
    for doc in input_data:
        collection.update_one(doc, {'$set' : doc}, upsert=True)

