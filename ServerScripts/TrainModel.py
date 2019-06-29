##################################################

def getDataFromDB():
	from MongoDB import Mongo_get_TAIEX_data
	from MongoDB import mongo_url, client
	import pymongo
    docs = pd.DataFrame.from_dict(
	    Mongo_get_TAIEX_data(client=client))
	taiex_values = docs.sort_values('Date')\
	    .TAIEX.to_numpy()
	return taiex_values

def genTrainData(taiex_values):

##################################################