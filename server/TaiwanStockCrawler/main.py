from Crawler import Crawler_CSV
from dataBaseManager import dataBaseManager
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

#option : 'custom','Taiwan-50','Taiwan-Dividend'
options = config['USER']['OPTION'].split(',')

if __name__ == '__main__': 
    for option in options:
        Crawler = Crawler_CSV(option)        
        Crawler.craw()
        del Crawler
        
        dataBaseManager = dataBaseManager()                
        dataBaseManager.mergeCSV(option)
        dataBaseManager.cleanData(option)