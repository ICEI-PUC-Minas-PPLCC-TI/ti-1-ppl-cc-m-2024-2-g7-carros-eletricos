const map = L.map('map').setView([-19.919547259770823, -43.95702623091325], 13)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap',
}).addTo(map)

// Coordenadas
const estacoesCoordenadas = [
  [-19.965486199293423, -43.96107933292579],
  [-19.96491120319836, -43.96236893292565],
  [-19.919547259770823, -43.95702623091325],
  [-19.95314527279279, -43.939196964417775],
  [-19.94918062618666, -43.93650023226363],
]

const mecanicasCoordenadas = [
  [-19.89574559293336, -43.93539047459388],
  [-19.895112404385998, -43.95004844575825],
  [-19.83589408144782, -43.94120177459541],
  [-19.89305729276413, -43.91190038993614],
  [-19.91582869419812, -43.99021027459326],
]

// Arrays de marcadores para controle
let estacoesMarkers = []
let mecanicasMarkers = []

// Funções para adicionar e remover marcadores
function addMarkers(coordenadas, markers, descricao) {
  coordenadas.forEach((coord) => {
    const marker = L.marker(coord).bindPopup(`<strong>${descricao}</strong>`)
    marker.addTo(map)
    markers.push(marker)
  })
}

function removeMarkers(markers) {
  markers.forEach((marker) => map.removeLayer(marker))
  markers.length = 0
}

// Eventos para checkboxes
document.getElementById('estacoes').addEventListener('change', function () {
  if (this.checked) {
    addMarkers(estacoesCoordenadas, estacoesMarkers, 'Estação de Carregamento')
  } else {
    removeMarkers(estacoesMarkers)
  }
})

document.getElementById('mecanicas').addEventListener('change', function () {
  if (this.checked) {
    addMarkers(mecanicasCoordenadas, mecanicasMarkers, 'Oficina Mecânica')
  } else {
    removeMarkers(mecanicasMarkers)
  }
})
