// Toastes
document.querySelectorAll('.toastBtn').forEach(function(button) {
    button.addEventListener('click', function () {
        var toastEl = document.getElementById('liveToast');
        var toast = new bootstrap.Toast(toastEl, {
            delay: 3000
        });
        toast.show();
    });
});

// Json
fetch('../db/db.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao carregar o JSON: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const cardContainer = document.getElementById('card-container');
        const cards = cardContainer.getElementsByClassName('card');

        if (data.carro.length < cards.length) {
            console.warn('O JSON não contém carros suficientes para preencher todos os elementos.');
        }

        for (let i = 0; i < cards.length; i++) {
            if (data.carro[i]) {
                cards[i].setAttribute('data-id', data.carro[i].id);

                const img = cards[i].querySelector('.card-img-top');
                img.src = data.carro[i].imagem;
                img.alt = `Imagem do ${data.carro[i].modelo}`;
                img.classList.add('card-image');

                const cardText = cards[i].querySelector('.card-text');
                cardText.innerHTML = `${data.carro[i].marca} ${data.carro[i].modelo} <br> Ano: ${data.carro[i].ano} <br> Autonomia: ${data.carro[i].autonomia}`;
                cardText.classList.add('card-description');

                cards[i].addEventListener('click', function() {
                    const existingPopover = document.querySelector('.popover');
                    if (existingPopover) {
                        existingPopover.remove();
                    }

                    const popoverContent = `Preço: a partir de ${data.carro[i].preco}`;
                    const popover = new bootstrap.Popover(cards[i], {
                        trigger: 'manual',
                        content: popoverContent,
                        title: 'Informações adicionais',
                        placement: 'bottom',
                        html: true,
                    });
                    popover.show();
                    setTimeout(() => {
                        popover.hide();
                    }, 3000);
                });
            } else {
                const img = cards[i].querySelector('.card-img-top');
                img.src = 'https://via.placeholder.com/150';
                img.alt = 'Imagem indisponível';

                const cardText = cards[i].querySelector('.card-text');
                cardText.textContent = 'Dados indisponíveis';
            }
        }

        document.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', function() {
                const filtroModelo = this.closest('.dropdown').querySelector('.dropdown-toggle').textContent.trim();
                const filtroAno = this.textContent.trim();
                filtroCarros(filtroModelo, filtroAno, data.carro, cards);
            });
        });

        document.getElementById('clearFilter').addEventListener('click', function() {
            filtroCarros('clear', '', data.carro, cards);
        });
    })
    .catch(error => console.error('Erro ao carregar o JSON:', error));

function filtroCarros(filtroModelo, filtroAno, carros, cards) {
    for (let i = 0; i < cards.length; i++) {
        const carData = carros[i];

        if (filtroModelo === 'Marca' && carData.marca !== filtroAno) {
            cards[i].style.display = 'none';
        } else if (filtroModelo === 'Ano') {
            if (filtroAno === '2024' && carData.ano !== '2024') {
                cards[i].style.display = 'none';
            } else if (filtroAno === '2020-2023' && (carData.ano < '2020' || carData.ano > '2023')) {
                cards[i].style.display = 'none';
            } else if (filtroAno === 'Até 2020' && carData.ano > '2020') {
                cards[i].style.display = 'none';
            } else {
                cards[i].style.display = 'block';
            }
        } else if (filtroModelo === 'clear') {
            cards[i].style.display = 'block';
        } else {
            cards[i].style.display = 'block';
        }
    }
}

document.getElementById('addCarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const newCar = {
        id: Date.now(),
        imagem: document.getElementById('carImage').value,
        marca: document.getElementById('carBrand').value,
        modelo: document.getElementById('carModel').value,
        ano: document.getElementById('carYear').value,
        autonomia: document.getElementById('carAutonomy').value,
        preco: document.getElementById('carPrice').value
    };

    fetch('../db/db.json')
        .then(response => response.json())
        .then(data => {
            data.carro.push(newCar);
            saveJson(data);
            alert('Carro adicionado com sucesso!');
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
});

function saveJson(data) {
    fetch('http://localhost:3000/save-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar o JSON: ' + response.statusText);
        }
        return response.json();
    })
    .then(result => {
        console.log(result.message);
    })
    .catch(error => console.error('Erro ao salvar o JSON:', error));
}

function loadRanking() {
    fetch('../db/db.json')
        .then(response => response.json())
        .then(data => {
            const rankingContainer = document.getElementById('rankingContainer');
            rankingContainer.innerHTML = '';

            data.carro.forEach(car => {
                const carElement = document.createElement('div');
                carElement.classList.add('card', 'mb-3');
                carElement.style.width = '18rem';
                carElement.innerHTML = `
                    <img src="${car.imagem}" class="card-img-top" alt="Imagem do ${car.modelo}">
                    <div class="card-body">
                        <h5 class="card-title">${car.marca} ${car.modelo}</h5>
                        <p class="card-text">Ano: ${car.ano}</p>
                        <p class="card-text">Autonomia: ${car.autonomia}</p>
                        <p class="card-text">Preço: ${car.preco}</p>
                    </div>
                `;
                rankingContainer.appendChild(carElement);
            });
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}

document.addEventListener('DOMContentLoaded', loadRanking);

document.addEventListener("DOMContentLoaded", function() {
    fetch('navBar.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
});
