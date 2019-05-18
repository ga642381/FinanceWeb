# -*- coding: utf-8 -*-
import pandas as pd
import time
import datetime
import os
from stock_code import StockCode
from MongoDB import Mongo_update_collection
import pymongo

class StockDaily():
    def __init__(self, STOCKCODE):
        #=== time ===#
        self.start_year = 2016        
        self.now = datetime.datetime.now()
        self.now_year = self.now.year
        self.now_month = self.now.month
        self.now_day = self.now.day
        
        self.STOCKCODE = STOCKCODE # a class from the outside
        self.Code_Name_dict = self._getCode_Name_dict()  
        
    def craw_daily(self):
        StockCode_list = self._getStockCode_list()
        Date_list = self._getDate_list()
        mongo_url = "mongodb+srv://ga642381:abc@taiwanstock-2i5kf.gcp.mongodb.net/test?retryWrites=true"
        client = pymongo.MongoClient(mongo_url)
        time.sleep(5)
        
        ##initialize crawled.log
        if not os.path.exists("crawled.log"):            
            with open("crawled.log", "w") as f :
                f.write(str(self.now))       
        
        
        TWSE_url = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=html&date={}&stockNo={}"
        for stock_code in StockCode_list:
            for date in Date_list:
                start_time = time.time()
                
                #=== see if the stamp has been crawled ===#
                stamp = str(stock_code) + "_" + str(date)
                stamp_exist = False
                with open("crawled.log", "r") as f:
                    if (stamp+"\n") in f.readlines():                        
                        stamp_exist = True
                if stamp_exist:
                    print("{} has been crawled!".format(stamp))
                    continue
                
                
                #=== handle crawling ===#
                url = TWSE_url.format(date, stock_code)
                finished = False
                passed = False
                try:
                    raw_data = pd.read_html(url)[0]  
                    finished = True
                    
                except ValueError:
                    finished = True                 
                    passed = True
                    
                except:
                    while finished is False:
                        try:
                            raw_data = pd.read_html(url)[0]
                            finished = True
                        except:
                            print('try again after 30 seconds...')
                            time.sleep(30)                            
                            

                #=== add to MongoDB ===#
                df = self._cleanRawData(raw_data, stock_code)
                Daily_collection = client["TaiwanStock"]["Daily"]
                Mongo_update_collection(Daily_collection, df)
                if passed:
                    print("{} {}  {} Passed...".format(stock_code, self.Code_Name_dict[stock_code], date))
                elif not passed:
                    print("{} {}  {} Crawled!".format(stock_code, self.Code_Name_dict[stock_code], date))
                
                #=== add to crawled.log ===#
                with open('crawled.log', 'a') as f:
                    f.write(stamp + "\n")
                
                #=== wait until 5 secs ===#
                end_time = time.time()
                while end_time - start_time < 5:
                    time.sleep(1)
                    end_time = time.time()
                    
        #=== stock daily to mongo ===#

        
    
    
    #--------private method--------#
    def _cleanRawData(self, raw_data, code):
        raw_data.columns = raw_data.columns.droplevel(0)
        CODE = code
        NAME = self.Code_Name_dict[CODE]
        raw_data['名稱'] = NAME
        raw_data['代號'] = CODE
        
        return raw_data
    
    
    def _getCode_Name_dict(self):
        return self.STOCKCODE.getCode_Name_dict()
    def _getStockCode_list(self):
        StockCode_list = self.STOCKCODE.getStockCode_list() 
        return StockCode_list
    
    def _getDate_list(self):      
        ## Date_list ##
         #-- past years --#
        Date_list = []
        for year in range(self.start_year, self.now_year):
            for month in range(1, 12+1):
                date = str(year) + (str(month).zfill(2)) + (str(1).zfill(2))
                Date_list.append(date)
         #-- this year --#
        for month in range(1, self.now_month + 1):
            date = str(self.now_year) + (str(month).zfill(2)) + (str(1).zfill(2))
            Date_list.append(date)
        ##
        
        return Date_list

if __name__ == "__main__":
    STOCKCODE = StockCode()
    STOCKDAILY = StockDaily(STOCKCODE)    
    STOCKDAILY.craw_daily()
    
        
        