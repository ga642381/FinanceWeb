import os
import re
from lxml import etree 
import requests
import html
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

class stockCode():    
    def __init__(self):
        #dictionary {option: list}
        self.stockCodeListDic = {'custom':[],'Taiwan-50':[],'Taiwan-Dividend':[]}
        self.stockNameDic = {'custom':{},'Taiwan-50':{},'Taiwan-Dividend':{}}
        #create BaseDir
        self.stockCodeBaseDir = config['PATH']['STOCKCODE_BASEDIR']
        if not os.path.exists(self.stockCodeBaseDir):
            os.makedirs(self.stockCodeBaseDir)
            print('[DIR] ',self.stockCodeBaseDir,'  has been created')

    
    def writeStockCodes(self,option):    
        
        #get stockCodelist
        self.appendStockCode(option)
        optionPath = os.path.join(self.stockCodeBaseDir,option)
        with open(optionPath,'w') as f:
            for stockCode in self.stockCodeListDic[option]:
                f.write(stockCode)
                f.write('\n')    
                
    def getStockCodeList(self,option):  
        stockCodeList= self.stockCodeListDic[option]
        return stockCodeList
    
    def getStockNameDic(self,option):
        stockNameDic = self.stockNameDic[option]
        return stockNameDic
        
    
    
    
    #One should manually add the custom stock code in config.ini file  
    #Taiwan 50          Stock Codes will be automatically crawled
    #Taiwan Dividend    Stock Codes will be automatically crawled
    def appendStockCode(self,option):        
        if option == 'custom':            
            self.stockCodeListDic[option] = config['USER']['CUSTOM'].split(',')
        else:
            self.crawlStockCode(option)
            
        ''' The composed securities might change, so we should crawl it every time
        #if there's no history data
        if not os.path.exists(os.path.join(self.stockCodeBaseDir,option)):
            self.crawlStockCode(option)    
            
        #if there's history data, directly get the stockCode from it
        else:
            path = os.path.join(self.stockCodeBaseDir,option)             
            with open(path,'r') as f:
                for line in f:
                    line=line.strip('\n') #strip the EOL symbol
                    self.stockCodeListDic[option].append(line)# add each stockCode to the list 
        '''    
    def crawlStockCode(self,option):        
        CODE = False
        if option == 'Taiwan-50':
            CODE = '0050'
        elif option =='Taiwan-Dividend':
            CODE = '0056'
        if not CODE: return
        
        
        #Crawl stockCodes from cnyes.com:
        url = 'http://www.cnyes.com/twstock/Etfingredient/{}.htm'.format(CODE)
        get_url = requests.get(url)
        tree = etree.fromstring(get_url.content, etree.HTMLParser())
        
        TabBx = tree.xpath('//div[@class="TabBx"]')
        TabBx = etree.tostring(TabBx[0],pretty_print=True, method="html").decode('utf-8')
        profileNNNN = re.findall('profile\/[0-9]*',TabBx) 
        
        for element in profileNNNN:
            href = re.findall('\<a.*{}.*\<\/a\>'.format(element),TabBx)[0]
            entities = re.findall('\>.*\<',href)[0].replace(" ","")[1:-1]
            chineseName = html.unescape(entities)
            
            code = element[-4:]
            self.stockCodeListDic[option].append(code)            
            self.stockNameDic[option][code] = chineseName
            

    

            

        
    

