const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// 启用CORS
app.use(cors());
app.use(express.static(path.join(__dirname)));

// 代理币安API
app.get('/api/binance/oi', async (req, res) => {
    try {
        const symbol = req.query.symbol || 'BTCUSDT';
        const https = require('https');
        const url = `https://fapi.binance.com/futures/data/openInterestHist?symbol=${symbol}&contractType=PERPETUAL&period=5m&limit=100`;

        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.json(JSON.parse(data));
            });
        }).on('error', (error) => {
            console.error('币安OI请求失败:', error);
            res.status(500).json({ error: '请求失败' });
        });
    } catch (error) {
        console.error('币安OI请求失败:', error);
        res.status(500).json({ error: '请求失败' });
    }
});

app.get('/api/binance/ratio', async (req, res) => {
    try {
        const symbol = req.query.symbol || 'BTCUSDT';
        const https = require('https');
        const url = `https://fapi.binance.com/futures/data/topLongShortPositionRatio?symbol=${symbol}&period=5m&limit=100`;

        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.json(JSON.parse(data));
            });
        }).on('error', (error) => {
            console.error('币安多空比请求失败:', error);
            res.status(500).json({ error: '请求失败' });
        });
    } catch (error) {
        console.error('币安多空比请求失败:', error);
        res.status(500).json({ error: '请求失败' });
    }
});

// 代理欧易API
app.get('/api/okx/oi', async (req, res) => {
    try {
        const instId = req.query.instId || 'BTC-USDT-SWAP';
        const https = require('https');
        const url = `https://www.okx.com/api/v5/rubik/stat/contracts/open-interest-history?instId=${instId}&period=5m&limit=100`;

        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.json(JSON.parse(data));
            });
        }).on('error', (error) => {
            console.error('欧易OI请求失败:', error);
            res.status(500).json({ error: '请求失败' });
        });
    } catch (error) {
        console.error('欧易OI请求失败:', error);
        res.status(500).json({ error: '请求失败' });
    }
});

app.get('/api/okx/ratio', async (req, res) => {
    try {
        const instId = req.query.instId || 'BTC-USDT-SWAP';
        const https = require('https');
        const url = `https://www.okx.com/api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader?instId=${instId}&period=5m&limit=100`;

        https.get(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                res.json(JSON.parse(data));
            });
        }).on('error', (error) => {
            console.error('欧易多空比请求失败:', error);
            res.status(500).json({ error: '请求失败' });
        });
    } catch (error) {
        console.error('欧易多空比请求失败:', error);
        res.status(500).json({ error: '请求失败' });
    }
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log(`请在浏览器中访问 http://localhost:${PORT}`);
});