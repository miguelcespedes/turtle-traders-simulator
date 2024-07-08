import React, { createContext, useState, useContext, useEffect } from 'react';
import { App, View, Page, Navbar, Block, List, ListInput, ListItem, Button, f7 } from 'framework7-react';
import './index.css';

// Crear el contexto
const ResultsContext = createContext();

const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState([]);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

// Página de Resultados
const ResultsPage = () => {
  const { results } = useContext(ResultsContext);

  if (results.length === 0) {
    return (
      <Page>
        <Navbar title="Resultados" backLink="Back" />
        <Block strong>
          <p>No hay resultados disponibles.</p>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar title="Resultados" backLink="Back" />
      <Block strong>
        <List strong inset>
          {results.map((result, index) => (
            <ListItem key={index} title={result.description} after={result.value} />
          ))}
        </List>
      </Block>
    </Page>
  );
};

const TurtleTradersSimulator = () => {
  const [symbol, setSymbol] = useState('BTCUSDT');
  const [capital, setCapital] = useState(100000);
  const [risk, setRisk] = useState(1);
  const [volatility, setVolatility] = useState(2.5);
  const [breakoutHigh, setBreakoutHigh] = useState(2);
  const [breakoutLow, setBreakoutLow] = useState(2);
  const [trailingStop, setTrailingStop] = useState(1);
  const { setResults } = useContext(ResultsContext);
  const [cryptoPrices, setCryptoPrices] = useState({
    BTCUSDT: 0,
    ETHUSDT: 0,
    DOGEUSDT: 0,
  });

  useEffect(() => {
    async function fetchPrices() {
      const prices = await Promise.all([
        getPrice('BTCUSDT'),
        getPrice('ETHUSDT'),
        getPrice('DOGEUSDT'),
      ]);

      setCryptoPrices({
        BTCUSDT: prices[0],
        ETHUSDT: prices[1],
        DOGEUSDT: prices[2],
      });
    }

    fetchPrices();
  }, []);

  async function simulate() {
    const price = await getPrice(symbol);
    const positionSize = calculatePositionSize(capital, risk, volatility);

    const breakoutHighValue = price * (1 + breakoutHigh / 100);
    const breakoutLowValue = price * (1 - breakoutLow / 100);
    const trailingStopValue = price * (1 - trailingStop / 100);

    let potentialProfitLong = 0;
    let potentialProfitShort = 0;

    if (price > breakoutHighValue) {
      potentialProfitLong = (price - breakoutHighValue) * positionSize;
    } else if (price < breakoutLowValue) {
      potentialProfitShort = (breakoutLowValue - price) * positionSize;
    }

    const resultsData = [
      { description: 'Capital Inicial', value: `$${capital}` },
      { description: 'Riesgo por Operación', value: `${risk}%` },
      { description: 'Volatilidad', value: `${volatility}` },
      { description: `Precio Actual de ${symbol}`, value: `$${price}` },
      { description: 'Tamaño de la Posición', value: `$${positionSize.toFixed(2)}` },
      { description: 'Breakout High', value: `$${breakoutHighValue.toFixed(2)}` },
      { description: 'Breakout Low', value: `$${breakoutLowValue.toFixed(2)}` },
      { description: 'Trailing Stop', value: `$${trailingStopValue.toFixed(2)}` },
      { description: 'Potencial Ganancia en Posición Larga', value: `$${potentialProfitLong.toFixed(2)}` },
      { description: 'Potencial Ganancia en Posición Corta', value: `$${potentialProfitShort.toFixed(2)}` },
    ];

    setResults(resultsData);

    f7.views.main.router.navigate('/results/');
  }

  async function getPrice(symbol) {
    const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    const data = await response.json();
    return parseFloat(data.price);
  }

  function calculatePositionSize(capital, riskPercent, volatility) {
    const riskAmount = capital * (riskPercent / 100);
    return riskAmount / volatility;
  }

  return (
    <App theme="ios" routes={[
      {
        path: '/results/',
        component: ResultsPage,
      },
    ]}>
      <View main>
        <Page>
          <Navbar title="Turtle Traders Simulator" />
          <Block>
            <List noHairlinesMd>
              <ListInput
                label="Criptomoneda"
                type="select"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                outline
              >
                <option value="BTCUSDT">BTC - ${cryptoPrices.BTCUSDT.toFixed(2)}</option>
                <option value="ETHUSDT">ETH - ${cryptoPrices.ETHUSDT.toFixed(2)}</option>
                <option value="DOGEUSDT">DOGE - ${cryptoPrices.DOGEUSDT.toFixed(4)}</option>
              </ListInput>
              <ListInput
                label="Capital Inicial"
                type="number"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}
                outline
              />
              <ListInput
                label="Riesgo por Operación (%)"
                type="number"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                outline
              />
              <ListInput
                label="Volatilidad"
                type="number"
                value={volatility}
                onChange={(e) => setVolatility(e.target.value)}
                outline
              />
              <ListInput
                label="Breakout High (% por encima del precio actual)"
                type="number"
                value={breakoutHigh}
                onChange={(e) => setBreakoutHigh(e.target.value)}
                outline
              />
              <ListInput
                label="Breakout Low (% por debajo del precio actual)"
                type="number"
                value={breakoutLow}
                onChange={(e) => setBreakoutLow(e.target.value)}
                outline
              />
              <ListInput
                label="Trailing Stop (% por debajo del precio actual)"
                type="number"
                value={trailingStop}
                onChange={(e) => setTrailingStop(e.target.value)}
                outline
              />
            </List>
            <Button fill onClick={simulate}>
              Simular
            </Button>
          </Block>
        </Page>
      </View>
    </App>
  );
}

const AppWrapper = () => (
  <ResultsProvider>
    <TurtleTradersSimulator />
  </ResultsProvider>
);

export default AppWrapper;
