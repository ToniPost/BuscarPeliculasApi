document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '6e47ae631f96f9fe7f19704ee55a6ed2';
    const searchInput = document.getElementById('searchInput');
    const moviesContainer = document.getElementById('moviesContainer');

    // Mostrar películas al cargar la página
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`)
        .then(response => response.json())
        .then(data => showMovies(data.results));

    // Manejar la búsqueda de películas
    searchInput.addEventListener('input', debounce(searchMovies, 500));

    function searchMovies() {
        const query = searchInput.value;
        if (query.trim() !== '') {
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`)
                .then(response => response.json())
                .then(data => showMovies(data.results));
        }
    }

    // Mostrar carátulas de películas en el contenedor
    function showMovies(movies) {
        moviesContainer.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}">
            `;
            moviesContainer.appendChild(movieCard);
        });
    }

    // Función para evitar búsquedas excesivas mientras el usuario escribe
    function debounce(func, delay) {
        let timeoutId;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }
});
