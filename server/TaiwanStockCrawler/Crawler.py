import os
import requests
import time
import random
from stockCode import stockCode
from stockURL import stockURL
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

class Crawler_CSV():
    def __init__(self,option):  
        self.option = option
        self.stockCSVBaseDir = config['PATH']['STOCKCSV_BASEDIR']
        print('<<{} Crawler>>'.format(self.option))
        
        #create stockCSV basedir
        if not os.path.exists(self.stockCSVBaseDir):
            os.makedirs(self.stockCSVBaseDir)
            print('[DIR] ',self.stockCSVBaseDir,'  has been created')
        
        
        self.stockCode = stockCode()
        self.stockURL = stockURL()
        
        
        
        
    def craw(self):
        self.createStockCodeFiles()
        self.createStockUrlFiles()
        
        STOCKCODES = self.stockCode.getStockCodeList(self.option)
        STOCKNAMEDIC = self.stockCode.getStockNameDic(self.option)        
        print('[Stock List]' ,'{} Stocks will be crawled:'.format(len(STOCKCODES)))        
        print('{}| {}  : {}'.format('No.','代號','名稱'))
        print('------------------')
        for i in range(len(STOCKCODES)):
            code = STOCKCODES[i]
            name = STOCKNAMEDIC[code]  
            number = str(i+1).zfill(2)
            print('{}.| {}  : {}'.format(number,code,name))
        print('\n')
        print('Crawling......\n')
        self.downloadCSV()
        
        
    def createStockCodeFiles(self):        
        self.stockCode.writeStockCodes(self.option)
        
    def createStockUrlFiles(self):
        stockCodeList = self.stockCode.getStockCodeList(self.option)
        self.stockURL.writeURLs(self.option,stockCodeList)
    
    def downloadCSV(self):
        urlBaseDir = os.path.join(self.stockURL.stockUrlBaseDir,self.option) 
        fileList = os.listdir(urlBaseDir)
        
        #./stockUrlBaseDir/option/NNNN
        #./stockCSVBaseDir/option/NNNN

        
        #create folders for different stockCode in different option
        for file in fileList:
            folderPath = os.path.join(self.stockCSVBaseDir,self.option,file)
            if not os.path.exists(folderPath):
                os.makedirs(folderPath)
        
        #download CSV file from TWSE:        
        N = 0 
        for file in fileList:
            fileUrlPath = os.path.join(urlBaseDir,file)            
            with open(fileUrlPath,'r') as urlf:
                for line in urlf:
                    date = line[:8]
                    url = line[8:]
                    url = url.strip('\n')                    
                    
                    folder = os.path.join(self.stockCSVBaseDir,self.option,file)
                    csvPath = os.path.join(folder,date+'.csv')            
                    
                    if not os.path.exists(csvPath):                        
                        try:
                            self.Download(csvPath,file,date,url,N)
                            N = N+1
                        except:
                            try:
                                print('try again after 30 seconds...')
                                time.sleep(30)
                                self.Download(csvPath,file,date,url,N)
                                N = N+1
                            except:
                                print('try again after 30 seconds...')
                                time.sleep(30)
                                self.Download(csvPath,file,date,url,N)
                                N = N+1
                        
                            
    def Download(self,csvPath,file,date,url,N):
        s = requests.Session()
        s.keep_alive = False  
        response = s.get(url)  
        with open(csvPath,'w') as f:
            f.write(response.text)
        if N%20==0:
            print('      代號', ':','日期','      status')
        strN = str(N).zfill(3)
        print(strN,'|',file,':',date,'  ',response.status_code)
        #sleepTime = random.uniform(5,10)
        time.sleep(5)
        del s


    
