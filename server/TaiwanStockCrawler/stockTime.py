import datetime
import configparser
config = configparser.ConfigParser()
config.read('config.ini')

#get current time
NOW = datetime.datetime.now()
CURRENTYEAR = NOW.year
CURRENTMONTH = NOW.month


class stockTime():
    def __init__(self):
        self.dateList = []       
        #begining of the query time
        self.startYear = int(config['USER']['STARTYEAR'])
        self.startMonth = int(config['USER']['STARTMONTH'])
        
        #end of the query time, default is 'so far'
        self.endYear = CURRENTYEAR       
        self.endMonth = CURRENTMONTH
        
        self.yearList = []
        self.monthListFull = []
        self.monthListPartial = []
        self.dayList = []
        
    def appendYear(self):
        for year in range(self.startYear, self.endYear+1):
            self.yearList.append(str(year))
    
    def appendMonth(self):
        for i in range(12):
            month = str(i+1)
            month = month.zfill(2)
            self.monthListFull.append(month)
            
        for i in range(self.endMonth):
            month = str(i+1)
            month = month.zfill(2)
            self.monthListPartial.append(month)
            
    def appendDay(self):
        day = str(1)
        day = day.zfill(2)
        self.dayList.append(day)
    
    def appendDate(self):
        self.appendYear()
        self.appendMonth()
        self.appendDay()
        
        currentYear = str(CURRENTYEAR)
        currnetMonth = str(CURRENTMONTH).zfill(2)
        
        for year in self.yearList[:-1]:
            for month in self.monthListFull:
                for day in self.dayList:
                    self.dateList.append(year+month+day)
        
        for month in self.monthListPartial:
            self.dateList.append(currentYear+month+day)
        
    def getDateList(self):
        self.appendDate()
        dateList = self.dateList
        return dateList
