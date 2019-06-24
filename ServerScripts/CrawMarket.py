# -*- coding: utf-8 -*-
import pandas as pd
import time
import datetime
import argparse
from stock_code import StockCode
from MongoDB import Mongo_update_collection
import pymongo
import requests

def parse():
    parser = argparse.ArgumentParser(description="crawler type: crawling history data or doing the daily update")
    parser.add_argument("--daily_update", action="store_true", help="whether doing the daily update")
    parser.add_argument("--craw_history", action="store_true", help="crawling history data")
    
    args = parser.parse_args()
    return args

class MarketDailyCrawler():
    def __init__(self, STOCKCODE):
        #=== time ===#
        self.start_year = 2019     
        self.now = datetime.datetime.now()
        self.now_year = self.now.year
        self.now_month = self.now.month
        self.now_day = self.now.day
        
        self.STOCKCODE = STOCKCODE # a class from the outside
        
        #=== pre work ===#
        self.createLogFile()        
        self.mongo_url = "mongodb+srv://Finance_python:Finance_python@cluster0-uvsdu.gcp.mongodb.net/test?retryWrites=true&w=majority"
        self.client = pymongo.MongoClient(self.mongo_url)
        time.sleep(5) 
        
    def createLogFile(self):
        with open("crawled.log", "a") as f :
            f.write(str(self.now) + " start crawling\n")        
    
    def crawToday(self):
        Date_list = self._getTodayDate_list()
        self._craw("TAIEX", Date_list, force=True)
        self._craw("STOCK_DAY", Date_list, force=True)
            
    def crawHistory(self):
        Date_list = self._getHistoryDate_list()
        self._craw("TAIEX", Date_list)
        self._craw("STOCK_DAY", Date_list)
        
        
        
       
    #--------private method--------#                   
    def _craw(self, _type, Date_list, force=False):
        fake_headers = {'user-agent': 'Mozilla/5.0 (Macintosh Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36'}
        
        if _type == "STOCK_DAY":
            print("STOCK_DAY start crawling!")
            
            TWSE_url = "http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=html&date={}&stockNo={}"
            StockCode_list = self._getStockCode_list()
            Code_Name_dict = self._getCode_Name_dict()
            
            
            
        elif _type == "TAIEX":
            print("TAIEX start crawling!")
            TWSE_url = "https://www.twse.com.tw/exchangeReport/FMTQIK?response=html&date={}"
            StockCode_list = ["TAIEX"]
            Code_Name_dict = {"TAIEX" : "台灣加權指數"}
            
            
        
        last_stock_code = ""
        for stock_code in StockCode_list:
            for date in Date_list:
                start_time = time.time()
                
                #=== see if the stamp has been crawled ===#
                stamp = str(stock_code) + "_" + str(date)
                
                if not force:                    
                    stamp_exist = False
                    with open("crawled.log", "r") as f:
                        if (stamp+"\n") in f.readlines():                        
                            stamp_exist = True
                            
                    if stamp_exist:
                        if (not (str(stock_code) == str(last_stock_code))):
                            print("{} has been crawled!".format(str(stock_code)))
                            last_stock_code = stock_code
                            continue
                        else:
                            last_stock_code = stock_code
                            continue               
                
                #=== handle crawling ===#
                url = TWSE_url.format(date, stock_code)
                finished = False
                passed = False
                try:
                    raw_data = pd.read_html(requests.get(url, headers=fake_headers).text)[0]
                    finished = True
                    
                except ValueError:
                    finished = True                 
                    passed = True
                    
                except:
                    while finished is False:
                        try:
                            raw_data = pd.read_html(requests.get(url, headers=fake_headers).text)[0]
                            finished = True
                            
                        except ValueError:
                            finished = True                 
                            passed = True
                            
                        except Exception as e:
                            print('try again after 1 minute...error: {}'.format(e))
                            time.sleep(60)                            
                            

                #=== add to MongoDB ===#     
                if passed:
                    print("{} {}  {} Passed...".format(stock_code, Code_Name_dict[stock_code], date))
                elif not passed:                    
                    df = self._cleanRawData(raw_data, _type, stock_code, Code_Name_dict)                          
                    self._insertIntoMongoDB(df, _type)
                    print("{} {}  {} Crawled!".format(stock_code, Code_Name_dict[stock_code], date))
                
                #=== add to crawled.log ===#
                with open('crawled.log', 'a') as f:
                    f.write(stamp + "\n")
                    
                #== add to website data ===#
                if not passed:
                    if not force:
                        with open('crawled_website.log', 'a') as f:
                            
                            log_name = "{}{}".format(stock_code, Code_Name_dict[stock_code])
                            log_date = "{}年{}月".format(str(date[:4]), str(date[4:6]))
                            
                            website_log = "{}  {}".format(log_name, log_date)                            
                            f.write(website_log + "\n")
                    elif force:
                        with open('crawled_website.log', 'a') as f:
                            log_name = "{}{}".format(stock_code, Code_Name_dict[stock_code])
                            log_date = "{}年{}月{}日".format(str(date[:4]),
                                                            str(date[4:6]),
                                                            str(self.now_day)
                                                            )  
                            
                            website_log = "{}  {}".format(log_name, log_date)                            
                            f.write(website_log + "\n")
                
                #=== wait until 5 secs ===#
                end_time = time.time()
                while end_time - start_time < 4.5:
                    time.sleep(0.5)
                    end_time = time.time()        
       
    
    def _insertIntoMongoDB(self,df, _type):
        if _type == "STOCK_DAY":
            Daily_collection = self.client["TaiwanStock"]["Stock_dailys"]
            
        elif _type =="TAIEX":
            Daily_collection = self.client["TaiwanStock"]["TAIEX_dailys"]
            
        Mongo_update_collection(Daily_collection, df)
        
        
    def _cleanRawData(self, raw_data, _type, code=None, Code_Name_dict=None ):
        raw_data.columns = raw_data.columns.droplevel(0)         

        if _type == "STOCK_DAY":
            CODE = code
            NAME = Code_Name_dict[CODE]            
            raw_data['Name'] = NAME
            raw_data['Code'] = CODE
            raw_data = raw_data.rename(columns={"日期":"Date", 
                                                "成交股數":"TradeVolume" ,
                                                "成交金額":"TradeValue", 
                                                "開盤價":"OpeningPrice", 
                                                "最高價":"HighestPrice", 
                                                "最低價":"LowestPrice", 
                                                "收盤價":"ClosingPrice", 
                                                "漲跌價差":"Change",
                                                "成交筆數":"Transaction"
                                                })                    
    
        elif _type == "TAIEX":
            raw_data = raw_data.rename(columns={"日期":"Date", 
                                    "成交股數":"TradeVolume" ,
                                    "成交金額":"TradeValue", 
                                    "成交筆數":"Transaction",
                                    "發行量加權股價指數":"TAIEX",
                                    "漲跌點數":"Change"                                    
                                    })  
            
        return raw_data
    
    def _getCode_Name_dict(self):
        return self.STOCKCODE.getCode_Name_dict()
    
    def _getStockCode_list(self):
        StockCode_list = self.STOCKCODE.getStockCode_list() 
        return StockCode_list
    
    def _getTodayDate_list(self):
        Date_list = []
        date = str(self.now_year) + (str(self.now_month).zfill(2)) + (str(1).zfill(2))
        Date_list.append(date)
        
        return Date_list
    
    def _getHistoryDate_list(self):      
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
    args = parse() 
    if args.daily_update:
        StockCodeObj = StockCode()    
        MarketDailyCrawler = MarketDailyCrawler(StockCodeObj)    
        
        MarketDailyCrawler.crawToday()
    elif args.craw_history:
        StockCodeObj = StockCode()    
        MarketDailyCrawler = MarketDailyCrawler(StockCodeObj)          
        
        MarketDailyCrawler.crawHistory()
    else:
        raise RuntimeError("Please specify what you want to do : --daily_update or --craw_history")
    
        
        