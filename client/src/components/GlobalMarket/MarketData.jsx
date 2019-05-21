const MarketData = document.createElement("script");
MarketData.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js";
MarketData.async = true;
MarketData.innerHTML = `
{
"width": "100%",
"height": "100%",
"symbolsGroups": [
  {
    "originalName": "Indices",
    "symbols": [
      {
        "displayName": "S&P 500",
        "name": "OANDA:SPX500USD"
      },
      {
        "displayName": "Shanghai Composite",
        "name": "INDEX:XLY0"
      },
      {
        "displayName": "Dow 30",
        "name": "FOREXCOM:DJI"
      },
      {
        "displayName": "Nikkei 225",
        "name": "INDEX:NKY"
      },
      {
        "displayName": "DAX Index",
        "name": "INDEX:DAX"
      },
      {
        "displayName": "FTSE 100",
        "name": "OANDA:UK100GBP"
      }
    ],
    "name": "指數"
  },
  {
    "originalName": "Commodities",
    "symbols": [
      {
        "displayName": "E-Mini S&P",
        "name": "CME_MINI:ES1!"
      },
      {
        "displayName": "Euro",
        "name": "CME:E61!"
      },
      {
        "displayName": "Gold",
        "name": "COMEX:GC1!"
      },
      {
        "displayName": "Crude Oil",
        "name": "NYMEX:CL1!"
      },
      {
        "displayName": "Natural Gas",
        "name": "NYMEX:NG1!"
      },
      {
        "displayName": "Corn",
        "name": "CBOT:ZC1!"
      }
    ],
    "name": "原物料"
  },
  {
    "originalName": "Bonds",
    "symbols": [
      {
        "displayName": "Eurodollar",
        "name": "CME:GE1!"
      },
      {
        "displayName": "T-Bond",
        "name": "CBOT:ZB1!"
      },
      {
        "displayName": "Ultra T-Bond",
        "name": "CBOT:UD1!"
      },
      {
        "displayName": "Euro Bund",
        "name": "EUREX:GG1!"
      },
      {
        "displayName": "Euro BTP",
        "name": "EUREX:II1!"
      },
      {
        "displayName": "Euro BOBL",
        "name": "EUREX:HR1!"
      }
    ],
    "name": "債券"
  },
  {
    "originalName": "Forex",
    "symbols": [
      {
        "name": "FX:EURUSD"
      },
      {
        "name": "FX:GBPUSD"
      },
      {
        "name": "FX:USDJPY"
      },
      {
        "name": "FX:USDCHF"
      },
      {
        "name": "FX:AUDUSD"
      },
      {
        "name": "FX:USDCAD"
      }
    ],
    "name": "外匯"
  }
],
"locale": "zh_TW"
}`

export default MarketData