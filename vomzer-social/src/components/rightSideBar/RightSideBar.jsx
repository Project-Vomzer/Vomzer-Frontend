
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const RightSidebar = () => {
  const [data, setData] = useState({
    pairs: null,
    fiats: null,
    chartData: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const USE_MOCK_DATA = false; // Set to true to use mock data

  const mockData = {
    pairs: {
      BTC: 0.000048,
      ETH: 0.0012,
    },
    fiats: {
      usd: 3.22,
      eur: 2.85,
      ngn: 5100,
    },
    chartData: Array.from({ length: 30 }, (_, i) => ({
      x: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
      y: 3.2 + Math.random() * 0.2,
    })),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (USE_MOCK_DATA) {
          setData(mockData);
          return;
        }

        const [chartRes, priceRes] = await Promise.all([
          fetch('/api/coingecko/coins/sui/market_chart?vs_currency=usd&days=30&interval=daily'),
          fetch('/api/coingecko/simple/price?ids=sui,bitcoin,ethereum&vs_currencies=usd,eur,ngn,btc,eth'),
        ]);

        if (!chartRes.ok || !priceRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const [chartData, priceData] = await Promise.all([
          chartRes.json(),
          priceRes.json(),
        ]);

        // Validate data
        if (!chartData.prices || !Array.isArray(chartData.prices)) {
          throw new Error('Invalid chart data');
        }
        if (!priceData.sui || !priceData.bitcoin || !priceData.ethereum) {
          throw new Error('Invalid price data');
        }

        setData({
          pairs: {
            BTC: parseFloat(priceData.sui.btc || 0),
            ETH: parseFloat(priceData.sui.eth || 0),
          },
          fiats: {
            usd: parseFloat(priceData.sui.usd || 0),
            eur: parseFloat(priceData.sui.eur || 0),
            ngn: parseFloat(priceData.sui.ngn || 0),
          },
          chartData: chartData.prices.map(([timestamp, price]) => ({
            x: new Date(timestamp),
            y: parseFloat(price),
          })),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); 

    return () => clearInterval(interval);
  }, []);

  const chartOptions = {
    chart: {
      type: 'area',
      height: 200,
      toolbar: { show: false },
      zoom: { enabled: false },
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
      },
    },
    xaxis: { type: 'datetime' },
    yaxis: { labels: { formatter: (val) => `$${val.toFixed(2)}` } },
    tooltip: {
      x: { format: 'dd MMM yyyy' },
    },
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm h-40 flex items-center shadow animate-pulse justify-center">
          {/* Loading data... */}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm h-48 flex items-center shadow animate-pulse justify-center">
          {/* Loading data... */}
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm h-60 flex items-center shadow animate-pulse justify-center">
          {/* Loading data... */}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-4 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="bg-white rounded-xl p-4 shadow-sm text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4 h-[calc(100vh-4rem)] overflow-y-auto">
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

      <div className="bg-black  rounded-xl p-4 ">
        <h3 className="font-bold text-white mb-3">SUI PRICE CHART (30D)</h3>
        {data.chartData ? (
          <Chart
            options={chartOptions}
            series={[{ name: 'SUI Price (USD)', data: data.chartData }]}
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