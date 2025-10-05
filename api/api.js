const https = require('https');

// 币安API代理
module.exports = async (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { query } = req;
    const path = req.url.split('?')[0];

    if (path === '/api/binance/oi') {
      const symbol = query.symbol || 'BTCUSDT';
      const url = `https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&contractType=PERPETUAL&period=5m&limit=100`;

      const data = await fetchBinanceData(url);
      res.json(data);
    } else if (path === '/api/binance/ratio') {
      const symbol = query.symbol || 'BTCUSDT';
      const url = `https://fapi.binance.com/futures/data/topLongShortPositionRatio?symbol=${symbol}&period=5m&limit=100`;

      const data = await fetchBinanceData(url);
      res.json(data);
    } else if (path === '/api/okx/oi') {
      const instId = query.instId || 'BTC-USDT-SWAP';
      const url = `https://www.okx.com/api/v5/rubik/stat/contracts/open-interest-history?instId=${instId}&period=5m&limit=100`;

      const data = await fetchOKXData(url);
      res.json(data);
    } else if (path === '/api/okx/ratio') {
      const instId = query.instId || 'BTC-USDT-SWAP';
      const url = `https://www.okx.com/api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader?instId=${instId}&period=5m&limit=100`;

      const data = await fetchOKXData(url);
      res.json(data);
    } else {
      res.status(404).json({ error: 'Endpoint not found' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function fetchBinanceData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

function fetchOKXData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}