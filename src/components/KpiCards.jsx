import { formatMoney, formatNumber } from '../utils/formatters.js';

export default function KpiCards({ data }) {
  return (
    <>
      <div className="kpi main">
        <div className="label">{data.title}</div>
        <strong>{formatMoney(data.goodsValue)}</strong>
        <small>{data.change}</small>
      </div>

      <div className="kpi side">
        <div className="label">{data.metricLabel || data.metric}</div>
        <strong>{formatNumber(data.declarations)}</strong>
        <small>{data.change}</small>

        <div className="split">
          {(data.breakdown || []).map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <b>{formatNumber(item.value)}</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
