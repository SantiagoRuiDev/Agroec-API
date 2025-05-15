export function calcMarketTrend(x, y) {
  const n = x.length;
  const sumaX = x.reduce((acc, val) => acc + val, 0);
  const sumaY = y.reduce((acc, val) => acc + val, 0);
  const sumaXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
  const sumaX2 = x.reduce((acc, val) => acc + val * val, 0);

  const m = (n * sumaXY - sumaX * sumaY) / (n * sumaX2 - sumaX * sumaX);
  return m; 
}