import { useEffect, useMemo, useRef } from 'react';
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import { formatNumber } from '../utils/formatters.js';
import KpiCards from './KpiCards.jsx';

const fallbackPoint = [24, 45];

function getPosition(item) {
  if (Number.isFinite(Number(item?.lat)) && Number.isFinite(Number(item?.lng))) {
    return [Number(item.lat), Number(item.lng)];
  }

  return fallbackPoint;
}

function MapSizeFix() {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => map.invalidateSize(), 0);
    return () => window.clearTimeout(timer);
  }, [map]);

  return null;
}

function CountryPopupOpener({ activeCountry, markerRefs }) {
  useEffect(() => {
    if (!activeCountry) return;

    const marker = markerRefs.current.get(activeCountry.id || activeCountry.name);
    marker?.openPopup();
  }, [activeCountry, markerRefs]);

  return null;
}

export default function TradeMap({ data, home, activeCountry, onCountrySelect }) {
  const markerRefs = useRef(new Map());
  const centre = getPosition(home);
   const routeColor = data.color || '#74ffed';
  const defaultPinColor = data.pinColor || routeColor;
  
  
  const mapPlaces = useMemo(() => {
    const places = new Map([[home.id, home]]);


    data.routes.forEach((route) => {
      places.set(route.source.id, route.source);
      places.set(route.destination.id, route.destination);
    });
    
    return Array.from(places.values());
  }, [data.routes, home]);

  return (
    <section className="map">
      <MapContainer center={centre} zoom={3} minZoom={2} maxZoom={7} zoomControl={false} attributionControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapSizeFix />
        <CountryPopupOpener activeCountry={activeCountry} markerRefs={markerRefs} />

        {data.routes.map((route) => {
          const isDimmed = activeCountry && ![route.source.id, route.destination.id].includes(activeCountry.id);

          return (
            <Polyline
              key={route.id}
              positions={[getPosition(route.source), getPosition(route.destination)]}
              pathOptions={{
                color: data.color || '#74ffed',
                weight: isDimmed ? 2 : 4,
                opacity: isDimmed ? 0.25 : 0.7,
                dashArray: '6 9',
              }}
            />
          );
        })}

        {mapPlaces.map((place) => {
          const isHome = place.id === home.id;
          const country = data.countries.find((item) => item.id === place.id);
          const placePinColor = place.pinColor || defaultPinColor;
         
          return (
            <CircleMarker
              key={place.id}
              center={getPosition(place)}
              radius={isHome ? 17 : 12}
             
              pathOptions={{
                color: placePinColor,
                fillColor: placePinColor,
                fillOpacity: isHome ? 1 : 0.75,
                weight: isHome ? 3 : 2,
              }}
              eventHandlers={isHome ? undefined : { click: () => onCountrySelect(country || place) }}
              ref={(marker) => {
                if (marker) markerRefs.current.set(place.id, marker);
                else markerRefs.current.delete(place.id);
              }}
            >
              <Popup>
                <b>{place.label || place.name}</b>
                <div className="value">{country ? formatNumber(country.value) : 'المركز الرئيسي'}</div>
                <span className="meta">{country ? data.metric : home.label}</span>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <KpiCards data={data} />
    </section>
  );
}
