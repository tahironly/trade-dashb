export default function TradeTabs({ tabs, activeKey, onChange }) {
  return (
    <div className="trade-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          className={tab.key === activeKey ? 'active' : ''}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
