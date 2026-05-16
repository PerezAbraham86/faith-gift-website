"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createChart, ColorType } from 'lightweight-charts';
import { TrendingUp, TrendingDown, AlertCircle, Eye, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SignalData {
  symbol: string;
  timeframe: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  confidence: number;
  bullScore: number;
  bearScore: number;
  netBias: number;
  bullPressure: number;
  bearPressure: number;
  ghostConfidence: number;
  chopRisk: number;
  macroRisk: number;
}

const PressureGauge = ({ label, value, color }: { label: string; value: number; color: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs font-semibold text-gray-300">{label}</div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs text-gray-400 text-right">{value}%</div>
    </div>
  );
};

export default function SignalDashboard() {
  const [signalData, setSignalData] = useState<SignalData>({
    symbol: 'BTC/USD',
    timeframe: '4H',
    signal: 'BUY',
    confidence: 87,
    bullScore: 78,
    bearScore: 32,
    netBias: 46,
    bullPressure: 92,
    bearPressure: 18,
    ghostConfidence: 72,
    chopRisk: 14,
    macroRisk: 28,
  });

  const chartContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainer.current) return;

    const chart = createChart(chartContainer.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#0f172a' },
        textColor: '#9ca3af',
      },
      width: chartContainer.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#22c55e',
      downColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
    });

    // Mock candle data
    const candleData = [
      { time: 1620000000, open: 58000, high: 59000, low: 57500, close: 58500 },
      { time: 1620003600, open: 58500, high: 60000, low: 58000, close: 59500 },
      { time: 1620007200, open: 59500, high: 61000, low: 59000, close: 60500 },
      { time: 1620010800, open: 60500, high: 62000, low: 60000, close: 61500 },
      { time: 1620014400, open: 61500, high: 63000, low: 61000, close: 62000 },
      { time: 1620018000, open: 62000, high: 64000, low: 61500, close: 63500 },
    ];

    candleSeries.setData(candleData);

    // Ghost candles (projected)
    const ghostCandleData = [
      { time: 1620021600, open: 63500, high: 65000, low: 63000, close: 64200 },
      { time: 1620025200, open: 64200, high: 65500, low: 64000, close: 64800 },
    ];

    const ghostSeries = chart.addCandlestickSeries({
      upColor: '#22c55e33',
      downColor: '#ef444433',
      wickUpColor: '#22c55e33',
      wickDownColor: '#ef444433',
      borderUpColor: '#22c55e66',
      borderDownColor: '#ef444466',
    });

    ghostSeries.setData(ghostCandleData);

    // Buy marker on latest candle
    const markerSeries = chart.addMarkerSeries();
    markerSeries.setMarkers([
      {
        time: 1620018000,
        position: 'belowBar',
        color: '#22c55e',
        shape: 'circle',
        text: 'BUY',
        size: 2,
      },
    ]);

    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainer.current) {
        chart.applyOptions({
          width: chartContainer.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  // TODO: Replace mock data with API call
  // useEffect(() => {
  //   const fetchSignalData = async () => {
  //     try {
  //       const res = await fetch("https://YOUR-FASTAPI-URL.com/api/latest-signal");
  //       const json = await res.json();
  //       setSignalData(json);
  //     } catch (error) {
  //       console.error('Failed to fetch signal data:', error);
  //     }
  //   };
  //   fetchSignalData();
  // }, []);

  const factors = [
    { name: 'SMC Structure', strength: 85 },
    { name: 'AlphaX DLM', strength: 72 },
    { name: 'Ghost Candles', strength: 68 },
    { name: 'Open Interest', strength: 78 },
    { name: 'Footprint Delta', strength: 81 },
    { name: 'Session', strength: 64 },
    { name: 'FRED Macro', strength: 55 },
    { name: 'FINRA Short Vol', strength: 70 },
    { name: 'COT', strength: 66 },
  ];

  const recentSignals = [
    { time: '14:32', symbol: 'ETH/USD', type: 'BUY', confidence: 82 },
    { time: '12:15', symbol: 'SOL/USD', type: 'SELL', confidence: 75 },
    { time: '10:48', symbol: 'BTC/USD', type: 'BUY', confidence: 87 },
    { time: '08:20', symbol: 'XRP/USD', type: 'NEUTRAL', confidence: 58 },
  ];

  const ghostCandles = [
    { number: 1, direction: 'UP', open: 63500, high: 65000, low: 63000, close: 64200, confidence: 84 },
    { number: 2, direction: 'UP', open: 64200, high: 65500, low: 64000, close: 64800, confidence: 72 },
  ];

  const signalColor =
    signalData.signal === 'BUY' ? 'text-green-400' : signalData.signal === 'SELL' ? 'text-red-400' : 'text-yellow-400';
  const signalBgColor =
    signalData.signal === 'BUY'
      ? 'bg-green-500/20 border-green-500/50'
      : signalData.signal === 'SELL'
        ? 'bg-red-500/20 border-red-500/50'
        : 'bg-yellow-500/20 border-yellow-500/50';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Trading Intelligence Dashboard</h1>
          <p className="text-gray-400">Real-time signal analysis and market insights</p>
        </div>

        {/* Top Signal Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`mb-8 p-6 rounded-lg border ${signalBgColor} backdrop-blur-sm`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-white">{signalData.symbol}</h2>
                <span className="px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full">{signalData.timeframe}</span>
              </div>
              <div className={`text-4xl font-bold mb-2 ${signalColor} flex items-center gap-2`}>
                {signalData.signal === 'BUY' ? <TrendingUp size={32} /> : <TrendingDown size={32} />}
                {signalData.signal}
              </div>
              <p className="text-gray-300 text-lg">Signal Confidence: {signalData.confidence}%</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">Bull Score</p>
                <p className="text-2xl font-bold text-green-400">{signalData.bullScore}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">Bear Score</p>
                <p className="text-2xl font-bold text-red-400">{signalData.bearScore}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">Net Bias</p>
                <p className="text-2xl font-bold text-blue-400">+{signalData.netBias}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className="text-sm font-semibold text-emerald-400">🟢 Active</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Eye size={20} />
              Market Chart
            </h3>
            <div ref={chartContainer} className="w-full" />
            <div className="mt-4 flex gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400 rounded"></span> Actual Candles</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 bg-green-400/30 rounded"></span> Ghost Projection</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full"></span> BUY Signal</span>
            </div>
          </motion.div>

          {/* Pressure Gauges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Pressure Metrics</h3>
            <div className="space-y-6">
              <PressureGauge label="Bull Pressure" value={signalData.bullPressure} color="bg-green-500" />
              <PressureGauge label="Bear Pressure" value={signalData.bearPressure} color="bg-red-500" />
              <PressureGauge label="Ghost Confidence" value={signalData.ghostConfidence} color="bg-blue-500" />
              <PressureGauge label="Chop Risk" value={signalData.chopRisk} color="bg-orange-500" />
              <PressureGauge label="Macro Risk" value={signalData.macroRisk} color="bg-purple-500" />
            </div>
          </motion.div>
        </div>

        {/* Factor Confirmation Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm mb-8"
        >
          <h3 className="text-lg font-semibold text-white mb-6">Factor Confirmation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {factors.map((factor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-semibold text-white">{factor.name}</p>
                  <span className="text-xs font-bold text-green-400">{factor.strength}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.strength}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Grid - Ghost Candles, Warnings, Recent Signals */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Ghost Candle Projection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Ghost Candle Projection</h3>
            <div className="space-y-3">
              {ghostCandles.map((candle, idx) => (
                <div key={idx} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50 text-xs">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white">#{candle.number}</span>
                    <span className={`px-2 py-1 rounded ${candle.direction === 'UP' ? 'bg-green-500/30 text-green-300' : 'bg-red-500/30 text-red-300'}`}>
                      {candle.direction}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-gray-300">
                    <div>O: <span className="text-white">${candle.open}</span></div>
                    <div>H: <span className="text-white">${candle.high}</span></div>
                    <div>L: <span className="text-white">${candle.low}</span></div>
                    <div>C: <span className="text-white">${candle.close}</span></div>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-400">Confidence:</span>
                    <span className="font-semibold text-blue-300">{candle.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Warnings Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              Warnings
            </h3>
            <div className="space-y-3">
              <div className="bg-orange-500/20 border border-orange-500/50 rounded-lg p-3 text-sm">
                <p className="font-semibold text-orange-300 mb-1">🔶 High Volatility</p>
                <p className="text-orange-200 text-xs">Market showing increased volatility. Use tighter stops.</p>
              </div>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-sm">
                <p className="font-semibold text-yellow-300 mb-1">⚠️ Market News</p>
                <p className="text-yellow-200 text-xs">Major economic event expected in 2 hours.</p>
              </div>
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-sm">
                <p className="font-semibold text-green-300 mb-1">✅ Conditions Favorable</p>
                <p className="text-green-200 text-xs">All technical factors aligned with signal.</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Signals Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-6 border border-gray-700/50 backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold text-white mb-4">Recent Signals</h3>
            <div className="space-y-2">
              {recentSignals.map((signal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + idx * 0.05 }}
                  className="bg-gray-800/50 rounded-lg p-3 flex items-center justify-between text-sm border border-gray-700/50 hover:border-gray-600/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-gray-400 text-xs">{signal.time}</p>
                    <p className="text-white font-semibold">{signal.symbol}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${signal.type === 'BUY' ? 'text-green-400' : signal.type === 'SELL' ? 'text-red-400' : 'text-yellow-400'}`}>
                      {signal.type}
                    </p>
                    <p className="text-gray-400 text-xs">{signal.confidence}%</p>
                  </div>
                  <ChevronRight size={16} className="ml-2 text-gray-600" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-300 text-sm text-center">
          <p>Dashboard displays mock data. Connect to FastAPI endpoint to receive live trading signals.</p>
        </div>
      </div>
    </div>
  );
}
