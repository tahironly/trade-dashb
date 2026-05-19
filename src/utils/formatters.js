export function formatMoney(value) {
  return `﷼ ${Number(value).toLocaleString('en-US')}`;
}

export function formatNumber(value) {
  return Number(value).toLocaleString('en-US');
}
