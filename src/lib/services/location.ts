import { DAWARICH_API_URL, DAWARICH_API_KEY } from '$env/static/private';

export interface Location {
  district: string | null;
  city: string | null;
  country: string | null;
}

interface CacheEntry {
  location: Location;
  fetchedAt: number;
}

const CACHE_TTL_MS = 30 * 60 * 1000;
const COORD_PRECISION = 3;
const NOMINATIM_USER_AGENT = 'stephenokita.com/1.0 (dev@stephenokita.com)';

const reverseGeocodeCache = new Map<string, CacheEntry>();
let lastKnown: Location | null = null;

function roundCoord(value: number): number {
  return Math.round(value * 10 ** COORD_PRECISION) / 10 ** COORD_PRECISION;
}

async function fetchLatestDawarichPoint(): Promise<{ lat: number; lon: number } | null> {
  const url = `${DAWARICH_API_URL}/api/v1/points?api_key=${DAWARICH_API_KEY}&order_by=timestamp&order_direction=desc&per_page=1`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Dawarich responded ${response.status}`);
  }
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) return null;
  const point = data[0];
  const lat = parseFloat(point.latitude);
  const lon = parseFloat(point.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
}

async function reverseGeocode(lat: number, lon: number): Promise<Location> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=16&addressdetails=1`;
  const response = await fetch(url, { headers: { 'User-Agent': NOMINATIM_USER_AGENT } });
  if (!response.ok) {
    throw new Error(`Nominatim responded ${response.status}`);
  }
  const data = await response.json();
  const address = data?.address ?? {};
  return {
    district:
      address.suburb ?? address.neighbourhood ?? address.quarter ?? address.city_district ?? null,
    city: address.city ?? address.town ?? address.village ?? address.county ?? null,
    country: address.country ?? null,
  };
}

export class LocationService {
  static async getCurrentLocation(): Promise<Location | null> {
    try {
      const point = await fetchLatestDawarichPoint();
      if (!point) return lastKnown;

      const lat = roundCoord(point.lat);
      const lon = roundCoord(point.lon);
      const cacheKey = `${lat},${lon}`;

      const cached = reverseGeocodeCache.get(cacheKey);
      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        lastKnown = cached.location;
        return cached.location;
      }

      const location = await reverseGeocode(lat, lon);
      reverseGeocodeCache.set(cacheKey, { location, fetchedAt: Date.now() });
      lastKnown = location;
      return location;
    } catch (error) {
      console.error('LocationService error:', error);
      return lastKnown;
    }
  }
}
