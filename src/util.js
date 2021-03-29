export function randomNumberBetweenInterval(min, max) {
  return min - 1 + Math.ceil(Math.random() * (max - min));
  // min + Math.floor(Math.random() * (max - min + 1))
}
