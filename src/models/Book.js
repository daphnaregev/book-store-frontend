import PropTypes from "prop-types";
import moment from "moment";

const Book = {};

Book.Genre = {
    SCIENCE_FICTION: 'Science fiction',
    SATIRE: 'Satire',
    DRAMA: 'Drama',
    ACTION: 'Action',
    ROMANCE: 'Romance',
    HORROR: 'Horror'
};

Book.propTypes = PropTypes.shape({
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

Book.defaultProps = {
    id: null,
    title: null,
    description: null,
    isbnNumber: null,
    author: null,
    publicationDate: moment().format('YYYY-MM-DD').toString(),
    genre: null,
    price: null,
    color: null,
};

export default Book;

