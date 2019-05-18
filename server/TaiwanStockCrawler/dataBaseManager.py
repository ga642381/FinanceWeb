import os
import configparser
import re
config = configparser.ConfigParser()
config.read('config.ini')

class dataBaseManager():
    def __init__(self):
        self.stockCSVBaseDir = config['PATH']['STOCKCSV_BASEDIR']
    
    def mergeCSV(self,option):        
        CSVoptionDir = os.path.join(self.stockCSVBaseDir,option)
        
        
        allDir = os.path.join(CSVoptionDir,'ALL')
        if not os.path.exists(allDir):
            os.makedirs(allDir)        
        
        stockCodes = os.listdir(CSVoptionDir)
        stockCodes.remove('ALL')
        
        for stockCode in stockCodes:            
            historyCSVDir = os.path.join(CSVoptionDir,stockCode)
            allCSVPath = os.path.join(allDir,stockCode+'.csv')            
            with open(allCSVPath,'w') as F:                
                historyCSVs = os.listdir(historyCSVDir)
                historyCSVs.sort()
                
                gotFirstFile = False                 
                for historyCSV in historyCSVs :
                    historyCSVPath = os.path.join(historyCSVDir,historyCSV)
                    
                    if os.stat(historyCSVPath).st_size > 3 and (not gotFirstFile):
                        gotFirstFile  = True
                        with open(historyCSVPath,'r') as f:
                            lines = f.readlines()
                            if lines[1].startswith("\"日期\""):
                                fieldLine = lines[1]
                                F.write(fieldLine)
                            for line in lines:
                                dateExist = re.findall('[0-9]+\/[0-9]+\/[0-9]+',line)
                                if dateExist:
                                    F.write(line)
                                
                                
                    elif os.stat(historyCSVPath).st_size > 3 and gotFirstFile: 
                        with open(historyCSVPath,'r') as f:
                            lines = f.readlines()
                            for line in lines:
                                dateExist = re.findall('[0-9]+\/[0-9]+\/[0-9]+',line)
                                if dateExist:
                                    F.write(line)
        
        print('\nAll the csv files of each stock have been merged')
    
    #1.delete the 10th column(redundant) 
    #2.convert the year from "Republic Era" to "A.D. 
    #3.delete some useless information"
    def cleanData(self,option):
        CSVoptionDir = os.path.join(self.stockCSVBaseDir,option)
        stockCodes = os.listdir(CSVoptionDir)

        for stockCode in stockCodes:
            historyCSVDir = os.path.join(CSVoptionDir,stockCode)
            historyCSVs = os.listdir(historyCSVDir)
            historyCSVs.sort()
            for historyCSV in historyCSVs:
                historyCSVPath = os.path.join(historyCSVDir,historyCSV)
                if os.stat(historyCSVPath).st_size > 3: #check if the file is empty
                    with open(historyCSVPath,'r') as f:                    
                            lines = f.readlines()
                            if lines[0].startswith("\"日期\""):
                                lines[0] = lines[0].replace(',\n','\n') #1.delete the 10th column(redundant) 
                                
                    with open(historyCSVPath,'w') as f:
                        f.write(lines[0])
                        for line in lines[1:]:
                            dateExist = re.findall('[0-9]+\/[0-9]+\/[0-9]+',line)
                            if dateExist:                        
                                #2.convert the year from "Republic Era" to "A.D. 
                                if line.startswith("\" 9") or line.startswith("\" 8"):
                                    date = line[2:10]            
                                    year = int(date[0:2])
                                    ADyear = year+1911
                                    ADdate = date.replace(str(year),str(ADyear))
                                    line = line.replace(" "+date,ADdate)
                                elif line.startswith("\"1"):
                                    date = line[1:10]            
                                    year = int(date[0:3])
                                    ADyear = year+1911
                                    ADdate = date.replace(str(year),str(ADyear))
                                    line = line.replace(date,ADdate)
                                f.write(line)
    
    def synchronizeDataset(self):
        pass
    def dailyUpdate(self):
        pass