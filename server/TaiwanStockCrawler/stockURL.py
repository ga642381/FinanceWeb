import os
from stockTime import stockTime
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

class stockURL():
    def __init__(self):
        #get the data from TWSE
        self.url = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=csv&date=YYYYmmdd&stockNo=NNNN'
        self.urlList = []
        self.stockCodeList = []        

        self.stockTime = stockTime()
        self.stockUrlBaseDir = config['PATH']['STOCKURL_BASEDIR']
        
        
        if not os.path.exists(self.stockUrlBaseDir):
            os.makedirs(self.stockUrlBaseDir)
            print('[DIR] ',self.stockUrlBaseDir,'  has been created')
        
    def writeURLs(self,option,stockCodeList):
        #create UrlBaseDir
        optionUrlBaseDir = os.path.join(self.stockUrlBaseDir,option)
        if not os.path.exists(optionUrlBaseDir):
            os.makedirs(optionUrlBaseDir)
            print('[DIR] ',optionUrlBaseDir,'  has been created')
        
        timeList = self.stockTime.getDateList() 
              
        for NNNN in stockCodeList:
            path = os.path.join(optionUrlBaseDir,NNNN)
            with open(path,'w') as f:  
                for YYYYmmdd in timeList:
                    url = self.url
                    url = url.replace('YYYYmmdd',YYYYmmdd)
                    url = url.replace('NNNN',NNNN)
                    f.write(YYYYmmdd+url)
                    f.write('\n')
