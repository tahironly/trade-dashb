import { useState } from 'react';
import Header from './components/Header.jsx';
import RankingPanel from './components/RankingPanel.jsx';
import TradeMap from './components/TradeMap.jsx';
import TradeTabs from './components/TradeTabs.jsx';
import { dashboardData, normaliseTradeData } from './data/dashboardData.js';

export default function App() {
  const [dashboard, setDashboard] = useState(dashboardData);
  const [activeKey, setActiveKey] = useState(dashboardData.tabs[0]?.key);
  const [activeCountry, setActiveCountry] = useState(null);

  const activeData = dashboard.metrics[activeKey] || dashboard.metrics[dashboard.tabs[0]?.key];

  function handleTabChange(tabKey) {
    setActiveKey(tabKey);
    setActiveCountry(null);
  }

  // Use this when the backend endpoint is ready. The UI can now consume the same
  // extensible shape as the embedded <script id="tradeJson"> block.
  // move embedded <script id="tradeJson"> to JSON file.
  async function loadDashboardFromApi() {
    const response = await fetch('/api/dashboard/trade');
    const apiData = await response.json();
    const nextDashboard = normaliseTradeData(apiData, true);
    setDashboard(nextDashboard);
    setActiveKey(nextDashboard.tabs[0]?.key);
    setActiveCountry(null);
  }

  void loadDashboardFromApi;

  return (
    <div className="app">
      <Header navItems={dashboard.navItems} />

      <TradeTabs tabs={dashboard.tabs} activeKey={activeKey} onChange={handleTabChange} />

      <div className="status">
        {/* مصدر البيانات: بيانات تجريبية */}
      </div>

      <main className="canvas">
        <TradeMap
          data={activeData}
          home={dashboard.home}
          activeCountry={activeCountry}
          onCountrySelect={setActiveCountry}
        />

        <RankingPanel metric={activeData.metric} countries={activeData.countries} onCountrySelect={setActiveCountry} />
      </main>
    </div>
  );
}
