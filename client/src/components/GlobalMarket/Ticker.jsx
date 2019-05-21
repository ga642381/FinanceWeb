const Ticker = document.createElement("script");
Ticker.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
Ticker.async = true;
Ticker.innerHTML = `{
      "symbols": [
        {
          "title": "標準普爾500",
          "proName": "OANDA:SPX500USD"
        },
        {
          "title": "上證綜合指數",
          "proName": "INDEX:XLY0"
        },
        {
          "title": "EUR/USD",
          "proName": "FX_IDC:EURUSD"
        },
        {
          "title": "BTC/USD",
          "proName": "BITSTAMP:BTCUSD"
        },
        {
          "title": "ETH/USD",
          "proName": "BITSTAMP:ETHUSD"
        }
      ],
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "zh_TW"
    }

    `

export default Ticker