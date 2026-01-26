const weatherImages: Record<string, string> = {
  Clear: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
  Clouds: 'https://images.unsplash.com/photo-1527766833261-b09c3163a791',
  Rain: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29',
  Snow: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  Thunderstorm: 'https://images.unsplash.com/photo-1500674425229-f692875b0ab7',
  Drizzle: 'https://images.unsplash.com/photo-1501696461415-6bd6660c6742',
  Mist: 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227',
};

export default function getImageForWeather(weather: string) {
  return weatherImages[weather] || weatherImages.Clear;
}
