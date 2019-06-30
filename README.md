# [107-2] Web Programming Final
### [Group 41] FinanceWeb

## Github Repo
  https://github.com/ga642381/FinanceWeb
  
## deploy網址
  http://www.financeweb.website/

## project描述 
一個財經資料的整合平台，並結合網路爬蟲、機器學習，完整呈現國內外市場狀況供研究使用。

## Folder Structure
  * frontend/ : ReactJS
  * backend/ : NodeJS(後端server)
  * ServerScripts/ : Python, crawler scripts and ML scripts running on AWS
  
## Get Started(local)
---

### Website:
1. clone the repository
2. 在frontend裡面執行:
``` 
$ npm install
$ npm run build
```
3. 在backend裡面執行
```
$ npm install
$ npm start
```
4. 在瀏覽器打上localhost:5000

### Crawler and Machine Learning:
1. pip install -r requirement.txt -- in ServerScript/
2. python CrawMarket.py --history 
3. python CrawMarket.py --update 
4. python MakeModel.py

* P.S. Servercript (網路爬蟲及機器學習) 會放在AWS上面自動運行，透過Crontab，會每日爬蟲進行資料更新並做出大盤預測

## 操作說明
* 進入主頁面後可以從右上角登入或是註冊或是直接使用Google帳戶快速登入
* 登入成功後會跳轉回主頁面, 此時可以輸入想要查詢的股票名稱或代號
* 查詢成功後頁面會跳轉到台灣股市, 並對剛剛查詢的股票歷史收盤價進行作圖
* 同時在台灣股市的頁面可以針對同一筆股市的不同資料作圖（例如最高價、成交量等等）
* 也可以重新查詢其他比股市資料
* 若有登入, 則可進入資料庫查詢確切資料

## 使用之框架
### 前端
* react-router-dom (前端網頁跳轉元件)
* bootstrap (一些好看的tag...XD)
* axios (前端送出請求時使用之套件)
* highcharts-react-official, highcharts (對股市資料作圖)

### 後端
* express (server架構)
* mongo, mongoose (資料庫使用)
* body-parser (req body parsing)
* passport (登入認證)
* passport-google-oauth20 (Google 登入處理)
* bcrypt (註冊密碼加密)

## 主要第三方套件：
1. Highcharts : 股市資料作圖
2. Tradingview : 一些現有財經資料圖表
3. Passport : 登入系統
4. MongoDB : 資料庫

## 分工:
### 張凱為：
* AWS server管理（含domain name申請）
* 網路爬蟲
* 版面設計
* Highchart 繪圖 （首頁及台灣股市）
* Tradingview 圖表 （全球市場及加密貨幣）
* 登入系統--local登入

### 江育誠：
* API 設計
* Query Data for 首頁 台灣股市 及 資料庫頁面
* 登入系統--google登入

### 陳建成：
* Highchart 繪圖
* Machine Learning(Tensorflow) 預測大盤走勢

## 心得
### 張凱為：
&emsp;&emsp;這次是第一次做一個比較完整的專案，從前端 後端到deployment。一開始用react.js和node.js實在很不習慣，常常要增加一個新的功能時發現不知道怎麼整合，雖然可能只是一個簡單的功能（最後也實際上只增加幾行code）卻要查document查老半天。只能說web programming實在是博大精深，能work是一回事，寫一個效能好的網站是另一回事，把code寫得漂亮又是另外一個境界了。
&emsp;&emsp;在修完這堂課之後最想精進的部份是 1.前端設計 2.Redux 3. GraphQL。前端的問題真的非常困擾，到底要怎麼fit各種不同的瀏覽器跟螢幕大小，希望以後可以將這個網站好好改寫成一個更美觀不要更動一下排版就爆掉的網站XD

### 江育誠：
&emsp;&emsp;寒假準備修這門課的時候，上網研究了所謂的網頁前端與後端，看完之後還以為前端就是無腦的刻畫面，後端就是一些比較有邏輯的程式面而且用的是javascript還以為後端應該也不難。....沒想到大錯特錯！！！前端的架構跟處理資料也是非常需要邏輯處理跟程式架構......但身為毫無美感的人類，刻板我真的不行XD 。後端的部份牽扯到了好多express 這類超級high level的 API...好多東西都是 " 我需要某個小小的功能，但是要為了這個可能十行不到的code要去翻一堆document跟網路上的教學 "   真的好難阿QQ 。
&emsp;&emsp;這次的期末專題真的學到了好多，第一次撰寫團體專案(雖然是小小小規模)。為了某一個分頁的某樣功能，我寫資料處理他寫資料拿到後的應用...真的非常有趣！ 唯一美中不足的是...因為並不是規模非常龐大的專案，所以server端其實沒有處理到太多太複雜的東西，學期後半部的的Redux GraphQL 都沒有派上用場XD

### 陳建成：
&emsp;&emsp;這次的final因為有隊友的架構與凱瑞，總算是做出來了一個可以用的東西，雖然其實我只是利用一半Python一半JS實作兩個小feature而已，可是在整合的過程中才發現僅僅只是想要完成一個feature就可能需要動到許多架構上的東西。即使網站上看起來不起眼的小東西，背後可能都是經過許多建構邏輯跟testing所完成的。說實話，即使到了現在，對於學期後半所教的那一堆東西，我可能還需要好一段摸索才能用於實作，以為離實作App還有很遠的距離，但至少現在看了我多少還是有能力做點東西的。感謝這學期老師、同學與助教的指導與協助，讓我終於對網頁設計有了最基礎的能力。
