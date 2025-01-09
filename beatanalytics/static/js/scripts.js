document.addEventListener('DOMContentLoaded', () => {
    const artists = Array.from(document.querySelectorAll('.artist-container'));
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const itemsPerPage = 5;
    let currentPage = 0;

    function updateArtistsDisplay() {
        artists.forEach((artist, index) => {
            if (index >= currentPage * itemsPerPage && index < (currentPage + 1) * itemsPerPage) {
                artist.style.display = 'flex'; // Maintient la mise en page flex
            } else {
                artist.style.display = 'none';
            }
        });

        prevBtn.disabled = currentPage === 0;
        nextBtn.disabled = currentPage >= Math.ceil(artists.length / itemsPerPage) - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            currentPage--;
            updateArtistsDisplay();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(artists.length / itemsPerPage) - 1) {
            currentPage++;
            updateArtistsDisplay();
        }
    });

    updateArtistsDisplay();
});

const fileInput = document.getElementById('jsonFileInput');
const processButton = document.getElementById('processJsonButton');
const output = document.getElementById('output');

processButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("Veuillez sélectionner un fichier JSON.");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        try {
            const jsonData = JSON.parse(event.target.result);

            // Envoyer les données JSON au backend Django
            const response = await fetch('/process-json/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'), // Inclure le CSRF token
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();
            if (response.ok) {
                output.textContent = JSON.stringify(result, null, 4); // Afficher le résultat
            } else {
                alert("Erreur : " + result.error);
            }
        } catch (error) {
            alert("Erreur lors de l'analyse du fichier JSON.");
        }
    };

    reader.readAsText(file);
});

// Fonction pour récupérer le CSRF token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}