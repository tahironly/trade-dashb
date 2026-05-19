const fallbackTradeJson = {
  home: {
    id: 'saudiArabia',
    label: 'السعودية',
    lat: 24,
    lng: 45,
  },
  tabs: [
  { "id": "imports", "label": "الوارد", "color": "#38bdf8" },
  { "id": "exports", "label": "الصادر", "color": "#22c55e" },
  { "id": "transit", "label": "ترانزيت", "color": "#f59e0b" },
  { "id": "localTrade", "label": "التجارة المحلية", "color": "#a855f7" }
],
  places: [
    { id: 'china', label: 'الصين', lat: 35, lng: 103 },
    { id: 'uae', label: 'الإمارات', lat: 24, lng: 54 },
    { id: 'usa', label: 'الولايات المتحدة', lat: 37, lng: -95 },
    { id: 'india', label: 'الهند', lat: 21, lng: 78 },
    { id: 'germany', label: 'ألمانيا', lat: 51, lng: 10 },
    { id: 'pakistan', label: 'باكستان', lat: 30, lng: 70 },
    { id: 'riyadh', label: 'الرياض', lat: 24.7136, lng: 46.6753 },
    { id: 'jeddah', label: 'جدة', lat: 21.4858, lng: 39.1925 },
    { id: 'dammam', label: 'الدمام', lat: 26.4207, lng: 50.0888 },
    { id: 'madinah', label: 'المدينة', lat: 24.5247, lng: 39.5692 },
    { id: 'neom', label: 'نيوم', lat: 28.1122, lng: 35.1883 },
  ],
  flows: [
    { type: 'imports', source: 'china', destination: 'saudiArabia', value: 120000000 },
    { type: 'imports', source: 'uae', destination: 'saudiArabia', value: 95000000 },
    { type: 'imports', source: 'usa', destination: 'saudiArabia', value: 87000000 },
    { type: 'imports', source: 'india', destination: 'saudiArabia', value: 76000000 },
    { type: 'imports', source: 'germany', destination: 'saudiArabia', value: 69000000 },
    { type: 'exports', source: 'saudiArabia', destination: 'china', value: 110000000 },
    { type: 'exports', source: 'saudiArabia', destination: 'uae', value: 98000000 },
    { type: 'exports', source: 'saudiArabia', destination: 'usa', value: 84000000 },
    { type: 'exports', source: 'saudiArabia', destination: 'india', value: 73000000 },
    { type: 'exports', source: 'saudiArabia', destination: 'germany', value: 61000000 },
    { type: 'transit', source: 'china', destination: 'uae', value: 50000000 },
    { type: 'transit', source: 'india', destination: 'uae', value: 42000000 },
    { type: 'transit', source: 'germany', destination: 'saudiArabia', value: 38000000 },
    { type: 'transit', source: 'usa', destination: 'saudiArabia', value: 33000000 },
    { type: 'transit', source: 'china', destination: 'india', value: 29000000 },
    { type: 'localTrade', source: 'riyadh', destination: 'saudiArabia', value: 72000000 },
    { type: 'localTrade', source: 'jeddah', destination: 'saudiArabia', value: 61000000 },
    { type: 'localTrade', source: 'dammam', destination: 'saudiArabia', value: 56000000 },
    { type: 'localTrade', source: 'madinah', destination: 'saudiArabia', value: 39000000 },
    { type: 'localTrade', source: 'neom', destination: 'saudiArabia', value: 31000000 },
  ],
  stats: {
    imports: {
      title: 'إجمالي قيمة البضائع الواردة',
      goodsValue: 528000000,
      change: '+12%',
      declarations: 245000,
      incoming: 180000,
      outgoing: 40000,
      transitCount: 25000,
      metricLabel: 'إجمالي عدد البيانات الجمركية الواردة',
    },
    exports: {
      title: 'إجمالي قيمة البضائع الصادرة',
      goodsValue: 426000000,
      change: '+8%',
      declarations: 198000,
      incoming: 50000,
      outgoing: 130000,
      transitCount: 18000,
      metricLabel: 'إجمالي عدد البيانات الجمركية الصادرة',
    },
    transit: {
      title: 'إجمالي قيمة الترانزيت',
      goodsValue: 192000000,
      change: '+5%',
      declarations: 90000,
      incoming: 20000,
      outgoing: 20000,
      transitCount: 50000,
      metricLabel: 'إجمالي عدد بيانات الترانزيت',
    },
    localTrade: {
      title: 'إجمالي قيمة التجارة المحلية',
      goodsValue: 259000000,
      change: '+6%',
      declarations: 132780,
      incoming: 55200,
      outgoing: 48600,
      transitCount: 28980,
      metricLabel: 'إجمالي عدد بيانات التجارة المحلية',
      breakdown: [
        { label: 'الواردة', value: 55200 },
        { label: 'الصادرة', value: 48600 },
        { label: 'المحلية', value: 28980 },
      ],
    },
  },
};

function readEmbeddedTradeJson() {
  if (typeof document === 'undefined') return null;

  const node = document.getElementById('tradeJson');
  if (!node?.textContent?.trim()) return null;

  try {
    return JSON.parse(node.textContent);
  } catch (error) {
    console.warn('Could not parse #tradeJson. Falling back to bundled sample data.', error);
    return null;
  }
}

function createPlaceLookup(rawData) {
  const entries = [rawData.home, ...(rawData.places || [])].filter(Boolean);
  return new Map(entries.map((place) => [place.id, place]));
}

function getFlowCounterpart(flow, homeId) {
  if (flow.source === homeId) return flow.destination;
  if (flow.destination === homeId) return flow.source;
  return flow.destination || flow.source;
}

function aggregateCountries(flows, placeLookup, homeId) {
  const totals = new Map();

  flows.forEach((flow) => {
    const placeId = getFlowCounterpart(flow, homeId);
    const place = placeLookup.get(placeId);
    const key = place?.id || placeId;
    const current = totals.get(key) || {
      id: key,
      name: place?.label || key,
      label: place?.label || key,
      lat: place?.lat,
      lng: place?.lng,
      value: 0,
    };

    current.value += Number(flow.value || 0);
    totals.set(key, current);
  });

  return Array.from(totals.values())
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

function aggregateRoutes(flows, placeLookup) {
  const totals = new Map();

  flows.forEach((flow) => {
    const source = placeLookup.get(flow.source);
    const destination = placeLookup.get(flow.destination);
    if (!source || !destination) return;

    const key = `${source.id}-${destination.id}`;
    const current = totals.get(key) || {
      id: key,
      source,
      destination,
      value: 0,
    };

    current.value += Number(flow.value || 0);
    totals.set(key, current);
  });

  return Array.from(totals.values()).sort((a, b) => b.value - a.value);
}

export function normaliseTradeData(rawData = fallbackTradeJson, loadedFromApi = false) {
  const placeLookup = createPlaceLookup(rawData);
  const home = rawData.home || fallbackTradeJson.home;
  const tabs = rawData.tabs?.length ? rawData.tabs : fallbackTradeJson.tabs;

  const metrics = tabs.reduce((result, tab) => {
   
    const tabFlows = (rawData.flows || []).filter((flow) => flow.type === tab.id);
    const stats = rawData.stats?.[tab.id] || {};

    result[tab.id] = {
      id: tab.id,
      label: tab.label,
      color: tab.color || '#74ffed',
      title: stats.title || tab.label,
      metric: stats.metricLabel || 'إجمالي عدد البيانات الجمركية',
      metricLabel: stats.metricLabel || 'إجمالي عدد البيانات الجمركية',
      change: stats.change || '',
      goodsValue: Number(stats.goodsValue || tabFlows.reduce((sum, flow) => sum + Number(flow.value || 0), 0)),
      declarations: Number(stats.declarations || 0),
      incoming: Number(stats.incoming || 0),
      outgoing: Number(stats.outgoing || 0),
      transitCount: Number(stats.transitCount || 0),
      breakdown: Array.isArray(stats.breakdown)
        ? stats.breakdown.map((item) => ({ label: item.label, value: Number(item.value || 0) }))
        : [
            { label: 'الواردة', value: Number(stats.incoming || 0) },
            { label: 'الصادرة', value: Number(stats.outgoing || 0) },
            { label: 'الترانزيت', value: Number(stats.transitCount || 0) },
          ],
      countries: aggregateCountries(tabFlows, placeLookup, home.id),
      routes: aggregateRoutes(tabFlows, placeLookup),
    };

    return result;
  }, {});

  return {
    loadedFromApi,
    home: {
      id: home.id,
      name: home.label,
      label: home.label,
      lat: home.lat,
      lng: home.lng,
    },
    navItems: rawData.navItems || [
      'حركة البضائع',
      'المنافذ',
      'المشغل الاقتصادي المعتمد',
      'حركة المسافرين',
      'الفسح',
      'الخدمات الجمركية',
      'المضبوطات',
      'الإيرادات',
    ],
    tabs: tabs.map((tab) => ({ key: tab.id, id: tab.id, label: tab.label, color: tab.color })),
    metrics,
    raw: rawData,
  };
}

const embeddedTradeJson = readEmbeddedTradeJson();

export const dashboardData = normaliseTradeData(embeddedTradeJson || fallbackTradeJson, Boolean(embeddedTradeJson));
