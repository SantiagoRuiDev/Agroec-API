export function calcMarketTrend(x, y) {
  const n = x.length;
  const sumaX = x.reduce((acc, val) => acc + val, 0);
  const sumaY = y.reduce((acc, val) => acc + val, 0);
  const sumaXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumaX2 = x.reduce((acc, val) => acc + val * val, 0);

  const m = (n * sumaXY - sumaX * sumaY) / (n * sumaX2 - sumaX * sumaX);
  return m; 
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
}