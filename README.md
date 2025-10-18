This Investment Tracker project is a search engine that allows the user to get up-to-date stock and cryptocurrency values, using AlphaVantage's and CoinGecko's free APIs. The user can request lists of the top stocks and cryptocurrencies and their recent values, as well as real-time values for individual stocks and cryptocurrencies.

Using this app is simple; you are first directed to the real-time cryptocurrency updates page (which has the most information to offer to the user). If you are unsure on what to search for, there are some suggestions on the top right corner, next to the table.
You can then navigate to the daily cryptocurrency updates page through the sidebar (3rd option), as well as the real-time and daily stock market updates (2nd and 4th option, respectively).
At the bottom of the sidebar, you can find a link to the source code on GitHub, and a help center section, which also relays some of the information found in this README.

Several different implementations were tried in this project. Quite a few challenges were faced due to the external APIs' limitations. Ultimately, these workarounds led to some of the biggest improvements in my skillset, both in React and JavaScript. Examples of the aforementioned workarounds include keeping track and blocking excessive API call requests, introducing timer functions to optimise for the least amount of user waiting time after reaching the API call limits, and aggregating data through several expernal APIs to provide more complete information to the user.

CoinGecko's free API for cryptocurrencies is more generous than free stock APIs (such as AlphaVantage). As a result, the cryptocurrency pages have more to offer along with the latest prices e.g., crypto icons and a higher number of API calls. Moreover, unlike the stock market, the cryptocurrency market is open 24/7, making it more suitable for exploring what this project has to offer, such as real-time updates at any time.

One of the the biggest limitations encountered in this project, from a UX perspective, was due to AlphaVantage's API not allowing searches using the full name of stocks and cryptocurrencies (e.g., Apple for AAPL, Bitcoin for BTC, etc). This meant the user would have to search using the stock's and crypto's symbol (AAPL, BTC), which is sub-optimal.

To get around the above issue, I found a CSV file containing both stock symbols and names (currently contains 500 companies - more to come), and turned it into a JS object of key-value pairs, using a small script I wrote for this purpose (see: https://github.com/KostasSp/csv-to-js-object-with-react.git).
Similarly, both names and symbols for cryptocurrencies were easily accessible through the CoinGecko API, and were placed in the CryptoNameToSymbol object.
Now, the user's input first gets looked up in the JS objects (StockNameToSymbol & CryptoNameToSymbol), which return the searched stock and cryptocurrency symbol. Using the returned value, the real-time API call is made.

One additional benefit from utilising the CryptoNameToSymbol object described above, is that I could also look up the cryptocurrencies' icons, which are provided by the CoinGecko API, and aggregate them with the real-time price data provided by the AlphaVantage API.

An important take-away from working on this project was how poor implementation choices early can quickly propagate. For instance, the choice to use Promise.all (which returns an array) for single API calls was the source of most bugs, and new workarounds had to be found constantly, leading to some components reaching 200+ lines of code. This led me to start over and effectively re-write most of the app.

Libraries and packages required to run the app locally; Sass, Material-UI, react-router, react-pro-sidebar, react-icons, emotion/react
