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