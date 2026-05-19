import { formatNumber } from '../utils/formatters.js';

export default function RankingPanel({ metric, countries, onCountrySelect }) {
  return (
    <section className="panel">
      <div className="panel-head">
        {/* <span>حسب أعلى خمس دول</span> */}
        <span>{metric}</span>
      </div>

      <div className="ranking">
        {countries.map((country, index) => (
          <button key={country.name} type="button" onClick={() => onCountrySelect(country)}>
            <span className="rank">{String(index + 1).padStart(2, '0')}</span>
            <span className="name">{country.name}</span>
            <span className="value">{formatNumber(country.value)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
