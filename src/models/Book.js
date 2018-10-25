import PropTypes from "prop-types";

const Book = {};

Book.Genre = {
    SCIENCE_FICTION: 'Science fiction',
    SATIRE: 'Satire',
    DRAMA: 'Drama',
    ACTION: 'Action',
    ROMANCE: 'Romance',
    HORROR: 'Horror'
};

Book.PropTypes = PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    isbnNumber: PropTypes.number,
    author: PropTypes.string,
    publicationDate: PropTypes.string,
    genre: PropTypes.oneOf(Object.values(Book.Genre)),
    price: PropTypes.number,
    color: PropTypes.string,
});

export default Book;

