const MarketOverview = document.createElement("script");
MarketOverview.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
MarketOverview.async = true;
MarketOverview.innerHTML = `{
            "showChart": true,
            "locale": "zh_TW",
            "width": "100%",
            "height": "100%",
            "largeChartUrl": "",
            "plotLineColorGrowing": "rgba(33, 150, 243, 1)",
            "plotLineColorFalling": "rgba(33, 150, 243, 1)",
            "gridLineColor": "rgba(233, 233, 234, 1)",
            "scaleFontColor": "rgba(131, 136, 141, 1)",
            "belowLineFillColorGrowing": "rgba(5, 122, 205, 0.12)",
            "belowLineFillColorFalling": "rgba(5, 122, 205, 0.12)",
            "symbolActiveColor": "rgba(225, 239, 249, 1)",
            "tabs": [
              {
                "title": "指數",
                "symbols": [
                  {
                    "s": "OANDA:SPX500USD",
                    "d": "S&P 500"
                  },
                  {
                    "s": "INDEX:XLY0",
                    "d": "Shanghai Composite"
                  },
                  {
                    "s": "FOREXCOM:DJI",
                    "d": "Dow 30"
                  },
                  {
                    "s": "INDEX:NKY",
                    "d": "Nikkei 225"
                  },
                  {
                    "s": "INDEX:DAX",
                    "d": "DAX Index"
                  },
                  {
                    "s": "OANDA:UK100GBP",
                    "d": "FTSE 100"
                  }
                ],
                "originalTitle": "Indices"
              },
              {
                "title": "原物料",
                "symbols": [
                  {
                    "s": "CME_MINI:ES1!",
                    "d": "E-Mini S&P"
                  },
                  {
                    "s": "CME:E61!",
                    "d": "Euro"
                  },
                  {
                    "s": "COMEX:GC1!",
                    "d": "Gold"
                  },
                  {
                    "s": "NYMEX:CL1!",
                    "d": "Crude Oil"
                  },
                  {
                    "s": "NYMEX:NG1!",
                    "d": "Natural Gas"
                  },
                  {
                    "s": "CBOT:ZC1!",
                    "d": "Corn"
                  }
                ],
                "originalTitle": "Commodities"
              },
              {
                "title": "債券",
                "symbols": [
                  {
                    "s": "CME:GE1!",
                    "d": "Eurodollar"
                  },
                  {
                    "s": "CBOT:ZB1!",
                    "d": "T-Bond"
                  },
                  {
                    "s": "CBOT:UD1!",
                    "d": "Ultra T-Bond"
                  },
                  {
                    "s": "EUREX:GG1!",
                    "d": "Euro Bund"
                  },
                  {
                    "s": "EUREX:II1!",
                    "d": "Euro BTP"
                  },
                  {
                    "s": "EUREX:HR1!",
                    "d": "Euro BOBL"
                  }
                ],
                "originalTitle": "Bonds"
              },
              {
                "title": "外匯",
                "symbols": [
                  {
                    "s": "FX:EURUSD"
                  },
                  {
                    "s": "FX:GBPUSD"
                  },
                  {
                    "s": "FX:USDJPY"
                  },
                  {
                    "s": "FX:USDCHF"
                  },
                  {
                    "s": "FX:AUDUSD"
                  },
                  {
                    "s": "FX:USDCAD"
                  }
                ],
                "originalTitle": "Forex"
              }
            ]
          }
          `

export default MarketOverview