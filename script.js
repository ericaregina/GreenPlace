
let apartments = JSON.parse(localStorage.getItem('apartments')) || [];

const apartmentForm = document.getElementById('apartmentForm');
const apartmentList = document.getElementById('apartmentList');
const apartmentSelect = document.getElementById('apartmentSelect');

const residentForm = document.getElementById('residentForm');

// Função para salvar no Local Storage
function saveToLocalStorage() {
    localStorage.setItem('apartments', JSON.stringify(apartments));
}

// Função para renderizar os apartamentos e seus moradores
function renderApartments() {
    apartmentList.innerHTML = '';
    apartments.forEach((apartment, apartmentIndex) => {
        const div = document.createElement('div');
        div.classList.add('apartment');
        div.innerHTML = `
            <strong>Apartamento ${apartment.number} - Bloco ${apartment.block}</strong>
            <button onclick="deleteApartment(${apartmentIndex})">Excluir Apartamento</button>
            <ul>
                ${apartment.residents.map((resident, residentIndex) => `
                    <li>${resident.name} (CPF: ${resident.cpf}) 
                        <button onclick="deleteResident(${apartmentIndex}, ${residentIndex})">Excluir Morador</button>
                    </li>`).join('')}
            </ul>
        `;
        apartmentList.appendChild(div);
    });
}

// Função para preencher o seletor de apartamentos
function updateApartmentSelect() {
    apartmentSelect.innerHTML = '';
    apartments.forEach(apartment => {
        const option = document.createElement('option');
        option.value = apartment.number;
        option.text = `Apartamento ${apartment.number} - Bloco ${apartment.block}`;
        apartmentSelect.appendChild(option);
    });
}

// Evento de submit do formulário de apartamentos
apartmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const number = document.getElementById('apartmentNumber').value;
    const block = document.getElementById('block').value;

    // Adicionar apartamento ao array
    apartments.push({
        number: number,
        block: block,
        residents: []
    });

    // Salva no localStorage
    saveToLocalStorage();

    // Limpar formulário e atualizar a tela
    apartmentForm.reset();
    updateApartmentSelect();
    renderApartments();
});

// Evento de submit do formulário de moradores
residentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('residentName').value;
    const cpf = document.getElementById('residentCPF').value;
    const apartmentNumber = document.getElementById('apartmentSelect').value;

    // Encontrar o apartamento selecionado e adicionar o morador
    const apartment = apartments.find(apartment => apartment.number === apartmentNumber);
    apartment.residents.push({
        name: name,
        cpf: cpf
    });

    // Salva no localStorage
    saveToLocalStorage();

    // Limpar formulário e atualizar a tela
    residentForm.reset();
    renderApartments();
});

// Função para excluir um apartamento
function deleteApartment(index) {
    apartments.splice(index, 1); 
    saveToLocalStorage(); 
    updateApartmentSelect(); 
    renderApartments(); 
}

// Função para excluir um morador
function deleteResident(apartmentIndex, residentIndex) {
    const apartment = apartments[apartmentIndex];
    apartment.residents.splice(residentIndex, 1); 
    saveToLocalStorage(); 
    renderApartments(); 
}


document.addEventListener('DOMContentLoaded', () => {
    renderApartments();
    updateApartmentSelect();
});

let notes = JSON.parse(localStorage.getItem('notes')) || [];


function renderNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.innerHTML = `<p>${note} <button onclick="deleteNote(${index})">Excluir</button></p>`;
        notesList.appendChild(noteItem);
    });
}

// Evento para adicionar uma nova nota
document.getElementById('saveNoteButton').addEventListener('click', () => {
    const noteInput = document.getElementById('noteInput');
    const newNote = noteInput.value.trim();
    if (newNote) {
        notes.push(newNote);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        renderNotes();
    }
});

// Função para excluir uma nota
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
}

document.addEventListener('DOMContentLoaded', () => {
    renderNotes();
});
