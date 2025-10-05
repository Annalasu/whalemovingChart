# 交易所主力动向监控面板

一个实时监控币安和欧易交易所主力动向的Web面板，显示持仓量（OI）和精英多空比数据。

## 功能特点

- 🔄 **实时更新**: 每秒刷新2次（500ms间隔）
- 📊 **四张图表**:
  - 币安持仓量（OI）
  - 币安精英多空比
  - 欧易持仓量（OI）
  - 欧易精英多空比
- 🎨 **现代化界面**: 渐变背景、毛玻璃效果、响应式设计
- 🔧 **错误处理**: 自动重试机制和连接状态监控
- 📱 **响应式**: 适配不同屏幕尺寸

## CORS 问题解决方案

由于浏览器的CORS安全策略，直接从HTML文件访问交易所API会被阻止。我们提供了两种解决方案：

### 方案一：使用本地代理服务器（推荐）

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **启动服务器**:
   ```bash
   npm start
   ```

3. **访问页面**:
   打开浏览器访问 `http://localhost:3000`

### 方案二：使用浏览器插件（临时测试）

安装支持CORS的浏览器插件，如：
- Chrome: "CORS Unblock"
- Firefox: "CORS Everywhere"

然后直接打开 `index.html` 文件。

## 技术栈

- **前端**: HTML5, CSS3, JavaScript, Chart.js
- **后端**: Node.js, Express, CORS
- **数据源**:
  - 币安API (`https://fapi.binance.com`)
  - 欧易API (`https://www.okx.com`)

## 数据单位

- **持仓量（OI）**: 使用合约单位（contracts）
- **精英多空比**: 使用比值

## API 端点

### 代理服务器端点
- `GET /api/binance/oi` - 币安持仓量
- `GET /api/binance/ratio` - 币安多空比
- `GET /api/okx/oi` - 欧易持仓量
- `GET /api/okx/ratio` - 欧易多空比

### 原始API端点
- 币安OI: `https://fapi.binance.com/futures/data/openInterestHist`
- 币安多空比: `https://fapi.binance.com/futures/data/topLongShortPositionRatio`
- 欧易OI: `https://www.okx.com/api/v5/rubik/stat/contracts/open-interest-history`
- 欧易多空比: `https://www.okx.com/api/v5/rubik/stat/contracts/long-short-position-ratio-contract-top-trader`

## 配置选项

在 `index-server.html` 中可以修改以下配置：

```javascript
const CONFIG = {
    refreshInterval: 500,    // 刷新间隔（毫秒）
    maxDataPoints: 50,       // 最大数据点数
    retryAttempts: 3,        // 重试次数
    retryDelay: 1000         // 重试延迟（毫秒）
};
```

## 开发模式

使用 nodemon 自动重启服务器：

```bash
npm run dev
```

## 注意事项

1. **API限制**:
   - 币安: 无特定限制
   - 欧易: 10次/2s (OI), 5次/2s (多空比)

2. **数据延迟**: 可能存在几秒的数据延迟

3. **网络要求**: 需要稳定的网络连接访问交易所API

## 故障排除

### 连接问题
- 检查网络连接
- 确认服务器正在运行
- 查看浏览器控制台错误信息

### 数据不更新
- 检查API限制
- 确认交易对正确（BTC-USDT-SWAP, BTCUSDT）
- 查看服务器日志

### 性能问题
- 调整刷新间隔
- 减少最大数据点数
- 关闭不必要的浏览器标签页