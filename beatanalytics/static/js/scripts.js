document.addEventListener('DOMContentLoaded', () => {

    const artists = Array.from(document.querySelectorAll('.artist-container'));
    const artistPrevBtn = document.getElementById('artist-prev-btn');
    const artistNextBtn = document.getElementById('artist-next-btn');
    const artistsPerPage = 5;
    let currentArtistPage = 0;

    function updateArtistsDisplay() {
        artists.forEach((artist, index) => {
            if (index >= currentArtistPage * artistsPerPage && index < (currentArtistPage + 1) * artistsPerPage) {
                artist.style.display = 'flex';
            } else {
                artist.style.display = 'none';
            }
        });

        artistPrevBtn.disabled = currentArtistPage === 0;
        artistNextBtn.disabled = currentArtistPage >= Math.ceil(artists.length / artistsPerPage) - 1;
    }

    artistPrevBtn.addEventListener('click', () => {
        if (currentArtistPage > 0) {
            currentArtistPage--;
            updateArtistsDisplay();
        }
    });

    artistNextBtn.addEventListener('click', () => {
        if (currentArtistPage < Math.ceil(artists.length / artistsPerPage) - 1) {
            currentArtistPage++;
            updateArtistsDisplay();
        }
    });

    updateArtistsDisplay();


    const songs = Array.from(document.querySelectorAll('.song-container'));
    const songPrevBtn = document.getElementById('song-prev-btn');
    const songNextBtn = document.getElementById('song-next-btn');
    const songsPerPage = 5;
    let currentSongPage = 0;

    function updateSongsDisplay() {
        songs.forEach((song, index) => {
            if (index >= currentSongPage * songsPerPage && index < (currentSongPage + 1) * songsPerPage) {
                song.style.display = 'flex';
            } else {
                song.style.display = 'none';
            }
        });

        songPrevBtn.disabled = currentSongPage === 0;
        songNextBtn.disabled = currentSongPage >= Math.ceil(songs.length / songsPerPage) - 1;
    }

    songPrevBtn.addEventListener('click', () => {
        if (currentSongPage > 0) {
            currentSongPage--;
            updateSongsDisplay();
        }
    });

    songNextBtn.addEventListener('click', () => {
        if (currentSongPage < Math.ceil(songs.length / songsPerPage) - 1) {
            currentSongPage++;
            updateSongsDisplay();
        }
    });

    updateSongsDisplay();
});


const fileInput = document.getElementById('jsonFileInput');
const processButton = document.getElementById('processJsonButton');
const output = document.getElementById('output');

processButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an JSON file");
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        try {
            const jsonData = JSON.parse(event.target.result);

            const response = await fetch('/process-json/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
                body: JSON.stringify(jsonData),
            });

            const result = await response.json();
            if (response.ok) {
                output.textContent = JSON.stringify(result, null, 4);
            } else {
                alert("Error : " + result.error);
            }
        } catch (error) {
            alert("Error while loading JSON file.");
        }
    };

    reader.readAsText(file);
});

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