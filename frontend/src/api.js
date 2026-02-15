import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const api = {
    getHistory: async (symbol, period = '1y', interval = '1d') => {
        const response = await axios.get(`${API_URL}/market/historical/${encodeURIComponent(symbol)}?period=${period}&interval=${interval}`);
        return response.data;
    },
    getQuote: async (symbol) => {
        const response = await axios.get(`${API_URL}/market/quote/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getMultiQuotes: async (symbols) => {
        const response = await axios.post(`${API_URL}/market/quotes`, symbols);
        return response.data;
    },
    getMarketStatus: async () => {
        const response = await axios.get(`${API_URL}/market/status`);
        return response.data;
    },
    searchSymbols: async (query) => {
        const response = await axios.get(`${API_URL}/market/search/${encodeURIComponent(query)}`);
        return response.data;
    },
    getCompanyInfo: async (symbol) => {
        const response = await axios.get(`${API_URL}/market/company/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getHeatmap: async () => {
        const response = await axios.get(`${API_URL}/market/heatmap`);
        return response.data;
    },
    getIndices: async () => {
        const response = await axios.get(`${API_URL}/market/indices`);
        return response.data;
    },
    getFinancials: async (symbol) => {
        const response = await axios.get(`${API_URL}/market/financials/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getPrediction: async (symbol) => {
        const response = await axios.get(`${API_URL}/ml/predict/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    executeTrade: async (tradeData) => {
        const response = await axios.post(`${API_URL}/trade/execute`, tradeData);
        return response.data;
    },
    getPortfolio: async () => {
        const response = await axios.get(`${API_URL}/trade/portfolio`);
        return response.data;
    },
    getHistoryTrades: async () => {
        const response = await axios.get(`${API_URL}/trade/history`);
        return response.data;
    },
    getAccount: async () => {
        const response = await axios.get(`${API_URL}/trade/account`);
        return response.data;
    },
    exitPosition: async (symbol, price, quantity = null) => {
        let url = `${API_URL}/trade/exit/${encodeURIComponent(symbol)}?price=${price}`;
        if (quantity) url += `&quantity=${quantity}`;
        const response = await axios.post(url);
        return response.data;
    },
    resetAccount: async () => {
        const response = await axios.post(`${API_URL}/trade/reset`);
        return response.data;
    },
    estimateCharges: async (side, productType, price, quantity) => {
        const response = await axios.get(`${API_URL}/trade/charges/estimate?side=${side}&product_type=${productType}&price=${price}&quantity=${quantity}`);
        return response.data;
    },
    runBacktest: async (symbol) => {
        const response = await axios.get(`${API_URL}/strategy/backtest/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getStockDetail: async (symbol) => {
        const response = await axios.get(`${API_URL}/market/stock-detail/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    searchUSSymbols: async (query) => {
        const response = await axios.get(`${API_URL}/us/search/${encodeURIComponent(query)}`);
        return response.data;
    },
    getUSQuote: async (symbol) => {
        const response = await axios.get(`${API_URL}/us/quote/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getUSHistory: async (symbol, period = '1y', interval = '1d') => {
        const response = await axios.get(`${API_URL}/us/historical/${encodeURIComponent(symbol)}?period=${period}&interval=${interval}`);
        return response.data;
    },
    getUSCompanyInfo: async (symbol) => {
        const response = await axios.get(`${API_URL}/us/company/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getUSFinancials: async (symbol) => {
        const response = await axios.get(`${API_URL}/us/financials/${encodeURIComponent(symbol)}`);
        return response.data;
    },
    getUSMarketStatus: async () => {
        const response = await axios.get(`${API_URL}/us/status`);
        return response.data;
    },
    getUSIndices: async () => {
        const response = await axios.get(`${API_URL}/us/indices`);
        return response.data;
    },
    getUSHeatmap: async () => {
        const response = await axios.get(`${API_URL}/us/heatmap`);
        return response.data;
    },
    executeUSTrade: async (tradeData) => {
        const response = await axios.post(`${API_URL}/us-trade/execute`, tradeData);
        return response.data;
    },
    getUSPortfolio: async () => {
        const response = await axios.get(`${API_URL}/us-trade/portfolio`);
        return response.data;
    },
    getUSHistoryTrades: async () => {
        const response = await axios.get(`${API_URL}/us-trade/history`);
        return response.data;
    },
    getUSAccount: async () => {
        const response = await axios.get(`${API_URL}/us-trade/account`);
        return response.data;
    },
    exitUSPosition: async (symbol, price, quantity = null) => {
        let url = `${API_URL}/us-trade/exit/${encodeURIComponent(symbol)}?price=${price}`;
        if (quantity) url += `&quantity=${quantity}`;
        const response = await axios.post(url);
        return response.data;
    },
    resetUSAccount: async () => {
        const response = await axios.post(`${API_URL}/us-trade/reset`);
        return response.data;
    },
    estimateUSCharges: async (side, productType, price, quantity) => {
        const response = await axios.get(`${API_URL}/us-trade/charges/estimate?side=${side}&product_type=${productType}&price=${price}&quantity=${quantity}`);
        return response.data;
    },
    getUSStockDetail: async (symbol) => {
        const response = await axios.get(`${API_URL}/us/stock-detail/${encodeURIComponent(symbol)}`);
        return response.data;
    },
};