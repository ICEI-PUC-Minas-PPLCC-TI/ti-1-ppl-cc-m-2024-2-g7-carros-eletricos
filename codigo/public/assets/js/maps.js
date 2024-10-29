// Inicializando o mapa na localização inicial (exemplo: latitude e longitude para o Brasil)
const map = L.map('map').setView([-14.235004, -51.92528], 4) // Exemplo: Brasil

// Adicionando o mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap',
}).addTo(map)

// Coordenadas a serem destacadas
const coordenadas = [
  { lat: -23.55052, lng: -46.633308, descricao: 'São Paulo' },
  { lat: -22.9068467, lng: -43.1728965, descricao: 'Rio de Janeiro' },
  { lat: -15.7801, lng: -47.9292, descricao: 'Brasília' },
]

// Adicionando marcadores para cada coordenada
coordenadas.forEach((ponto) => {
  L.marker([ponto.lat, ponto.lng])
    .addTo(map)
    .bindPopup(`<strong>${ponto.descricao}</strong>`)
})
