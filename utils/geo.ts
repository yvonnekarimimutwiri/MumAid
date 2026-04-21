export interface Location {
  name: string;
  description: string;
  lat: number;
  lng: number;
  type: "DONATE" | "BUY" | "BOTH";
}

// 1. Haversine Formula for approximate distance in KM
export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 2. Gridding Logic: Rounds coordinates to a fixed precision (e.g., 0.1 deg ~ 11km)
export const getGridKey = (lat: number, lng: number, step: number) => {
  const gridLat = Math.floor(lat / step) * step;
  const gridLng = Math.floor(lng / step) * step;
  return `${gridLat.toFixed(2)},${gridLng.toFixed(2)}`;
};