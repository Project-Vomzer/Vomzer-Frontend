import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const RightSidebar = () => {
  const [data, setData] = useState({
    pairs: null,
    fiats: null,
    chartData: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using CORS proxy
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        
        const response = await Promise.all([
          fetch(`${proxyUrl}https://api.binance.com/api/v3/ticker/24hr?symbols=%5B%22SUIBTC%22,%22SUIETH%22,%22SUIUSDT%22%5D`, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          }),
          fetch('https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd,eur,ngn'),
          fetch(`${proxyUrl}https://api.binance.com/api/v3/klines?symbol=SUIUSDT&interval=1d&limit=30`, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          })
        ]);

        console.log(response);

        // const [pairs, fiats, history] = await Promise.all([
        //   pairsRes.json(),
        //   pricesRes.json(),
        //   historyRes.json()
        // ]);

        // console.log (pairs);
        // console.log (fiats);
        // console.log (history);

        setData({
          pairs: {
            BTC: parseFloat(pairs.find(p => p.symbol === 'SUIBTC')?.lastPrice || 0),
            ETH: parseFloat(pairs.find(p => p.symbol === 'SUIETH')?.lastPrice || 0),
            USDT: parseFloat(pairs.find(p => p.symbol === 'SUIUSDT')?.lastPrice || 0)
          },
          fiats: fiats.sui || { usd: 0, eur: 0, ngn: 0 },
          chartData: history.map(item => ({
            x: new Date(item[0]),
            y: parseFloat(item[4]) // Closing price
          }))
        });

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  // Chart options
  const chartOptions = {
    chart: {
      type: 'area',
      height: 200,
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: ['#6C5DD3'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
      }
    },
    xaxis: { type: 'datetime' },
    yaxis: { labels: { formatter: val => `$${val.toFixed(2)}` } },
    tooltip: {
      x: { format: 'dd MMM yyyy' }
    }
  };

  if (loading) {
    return (
      <div className="space-y-4 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm h-40 flex items-center justify-center">
          Loading data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 py-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Crypto Pairs */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-sm mb-3">SUI PAIRS</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SUI/BTC</span>
            <span className="font-medium">{data.pairs?.BTC?.toFixed(8) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SUI/ETH</span>
            <span className="font-medium">{data.pairs?.ETH?.toFixed(6) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">SUI/USDT</span>
            <span className="font-medium">{data.pairs?.USDT?.toFixed(4) || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Fiat Values */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-sm mb-3">FIAT VALUES</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">USD</span>
            <span className="font-medium">${data.fiats?.usd?.toFixed(4) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">EUR</span>
            <span className="font-medium">€{data.fiats?.eur?.toFixed(4) || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">NGN</span>
            <span className="font-medium">₦{data.fiats?.ngn?.toFixed(2) || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-sm mb-3">SUI CHART (30D)</h3>
        {data.chartData ? (
          <Chart
            options={chartOptions}
            series={[{ name: 'SUI Price', data: data.chartData }]}
            type="area"
            height={200}
          />
        ) : (
          <div className="h-[200px] flex items-center justify-center text-gray-400">
            Chart data not available
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;