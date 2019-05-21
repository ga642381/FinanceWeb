# midterm_FinanceWeb

## Github Repo
  https://github.com/ga642381/midterm_FinanceWeb

## project描述 
一個財經資料的統整平台，並結合網路爬蟲爬取台灣證券交易所資料，將爬取資料放到MongoDB內供研究使用。

## get started
1. clone the repository
2. (terminal 1 : client)

* cd client
* npm install
* npm start

3.(terminal 2 : backend)

* cd backend
* npm install 
* npm start

4.(terminal 3 : crawler)
* cd server/Taiwan
* python stock_daily.py

## 詳細功能描述
目前主要有三個頁面：
1.爬蟲
2.全球市場
3.加密貨幣

* 爬蟲頁面結合terminal3的python程式可以即時取得爬蟲的進度（每兩秒更新一次）,顯示爬取的股票代碼名稱、年份及月份
* 全球市場及加密貨幣套用trading view的api,即時取得市場狀況。

## 使用到的框架及套件
1.前端 : React JS, Bootstrap, react-animated-text
2.後端 : Express, node.js, mongoDB as database
3.前端使用promise、fetch與後端做溝通

## 我的貢獻
這次除了套用trading view上的資料，幾乎是純手刻（從爬蟲,前端(含大部分CSS)到後端 ）


## 心得
這次project做下去才知道webprogramming真的是博大精深，一開始會想到很多功能，但是後來發現要全部實做是需要花很多時間。
因為一開始是一個功能一個功能慢慢做，目標就是希望能架設一個完善的財經網站，但是發現要把一個功能作到完善就已經花非常多的時間。
但是這過程確實也學到很多，前後端的溝通、資料庫、routing等等



## future work
目前還有很多功能只做到一半，過幾天應該可以做完並deploy到AWS上。
包含資料下載, 網頁的美觀, 以及後續deploy後可套用的trading view圖表



