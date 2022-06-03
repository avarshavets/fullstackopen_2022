const BookFilter = ({ setGenreFilter, genres }) => {
    return (
        <div>
            {
                Array.from(genres).map(genre =>
                    <button key={genre}
                            onClick={() => setGenreFilter(genre)}>
                        {genre}
                    </button>
                )
            }
            <button onClick={() => setGenreFilter(null)}>all genres</button>
        </div>
    )
}

export default BookFilter
