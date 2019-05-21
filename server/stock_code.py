# -*- coding: utf-8 -*-
import pandas as pd
from MongoDB import Mongo_update_collection
import pymongo


class StockCode():
    def __init__(self):        
        self.TWSE_stockCodeURL = "http://isin.twse.com.tw/isin/C_public.jsp?strMode=2"
        print("Stock Code Source : ", self.TWSE_stockCodeURL)        
        self.stockCodeDataFrame = self._parse() 
        
        
    def getStockCode_df(self):        
        return self.stockCodeDataFrame
    
    def getStockCode_list(self):
        return self.stockCodeDataFrame['代號'].tolist()
    
    def getColumnNames(self):
        return list(self.stockCodeDataFrame)
    
    def getCode_Name_dict(self):
        df = self.getStockCode_df()
        code = df['代號'].tolist()
        name = df['名稱'].tolist()        
        return dict(zip(code, name))
    
    def toMongo(self):
        mongo_url = "mongodb+srv://ga642381:abc@taiwanstock-2i5kf.gcp.mongodb.net/test?retryWrites=true"
        client = pymongo.MongoClient(mongo_url)
        Code_collection = client["TaiwanStock"]["Code"]
        Mongo_update_collection(Code_collection, self.stockCodeDataFrame)
        print("Sucessfully update(insert) data !")
    
    #--------private method--------#
    def _parse(self):
        try:
            raw_data = pd.read_html(self.TWSE_stockCodeURL, encoding="Big5")[0]
        except:
            raise RuntimeError("invalid URL or table not found !")
        
        ## index_head, index_tail ##
        index_head = False
        index_tail = False
        for i in range(len(raw_data)):
            if raw_data[0][i] == '股票':
                index_head = i
            if raw_data[0][i] == '上市認購(售)權證':
                index_tail = i
                break     
        if not (index_head and index_tail):            
            raise RuntimeError("invalid value of index_head or index_tail !")
            
        ##        
        
        ## data ## series of operation to clean stock code table
        data = raw_data[index_head+1 : index_tail]
        data = data.rename(index=str, columns={0:"有價證券代號及名稱", 
                                                       1:"國際證券辨識號碼(ISIN Code)",
                                                       2:"上市日",
                                                       3:"市場別",
                                                       4:"產業別",
                                                       5:"CFICode",
                                                       6:"備註",
                                                      }
                                   )
        data = data.reset_index(drop=True)
        data = data.drop(["備註"], axis=1)
    
        code_name = data["有價證券代號及名稱"].str.split(n=1, expand=True)
        data = data.drop(["有價證券代號及名稱"], axis=1)
        data = pd.concat([code_name, data], axis=1)
        data = data.rename(index=str, columns={0:"代號", 1:"名稱"})
        
        return data
    
    
    
    
    
    
    