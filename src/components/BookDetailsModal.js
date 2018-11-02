import React from "react";
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import {connect} from "react-redux";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import moment from 'moment';
import TextInputImitation from '../components/TextInputImitation';
import booksActions from "../redux/actions/booksActions";
import TextInput from "./TextInput";
import Book from '../models/Book';


class BookDetailsModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newBook: !props.book.id,
            isbnNumber: props.book.isbnNumber,
            title: props.book.title,
            author: props.book.author,
            description: props.book.description,
            price: props.book.price,
            publicationDate: moment(props.book.publicationDate),
            genre: props.book.genre,
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props.removingBook === true && nextProps.removingBook === false) {
            if (!nextProps.errorMessage || !nextProps.errorMessage.length) {
                this.onRequestClose();
            }
        }
        if (this.props.savingBook === true && nextProps.savingBook === false) {
            if (!(nextProps.errorMessage && nextProps.errorMessage.length)) {
                this.onRequestClose();
            }
        }
        if (this.props.updatingBook === true && nextProps.updatingBook === false) {
            if (!(nextProps.errorMessage && nextProps.errorMessage.length)) {
                this.onRequestClose();
            }
        }
    }

    saveBook = () => {
        try {
            if (!this.props.book.id) {
                // New Book
                const book = {
                    isbnNumber: parseInt(this.state.isbnNumber),
                    description: this.state.description,
                    genre: this.state.genre,
                    title: this.state.title,
                    author: this.state.author,
                    price: parseFloat(this.state.price),
                    publicationDate: this.state.publicationDate.format('YYYY-MM-DD').toString(),
                };
                this.props.saveBook(book);
            } else {
                // Update Book
                const book = {
                    id: this.props.book.id,
                    isbnNumber: parseInt(this.state.isbnNumber),
                    description: this.state.description,
                    genre: this.state.genre,
                    title: this.state.title,
                    author: this.state.author,
                    price: parseFloat(this.state.price),
                    publicationDate: this.state.publicationDate.format('YYYY-MM-DD').toString(),
                };
                this.props.updateBook(book);
            }
        } catch (e) {
            console.warn(`exception while trying to saving/updteing book: ${e}`);
        }
    };

    onRequestClose = () => {
        if (this.state.newBook) {
            this.setState({
                isbnNumber: this.props.book.isbnNumber,
                title: this.props.book.title,
                author: this.props.author,
                description: this.props.description,
                price: this.props.price,
                publicationDate: moment(this.props.publicationDate),
                genre: this.props.genre,
            });
        }
        this.props.onRequestClose();
    };

    render () {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };

        return (
            <Modal
                isOpen={this.props.visible}
                onAfterOpen={this.props.onAfterShow}
                onRequestClose={this.props.onRequestClose}
                style={customStyles}
            >
                <ModalContainer>
                    <DetailsRow>
                        <Label>ISBN Number:</Label>
                        <TextInput
                            onChange={(text) => { this.setState({ isbnNumber: text })}}
                            value={this.state.isbnNumber}
                        />
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Title:</Label>
                        <TextInput
                            onChange={(text) => {this.setState({ title: text })}}
                            value={this.state.title}
                        />
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Author:</Label>
                        <TextInput
                            onChange={(text) => {this.setState({ author: text })}}
                            value={this.state.author}
                        />
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Genre:</Label>
                        <GenreComboboxContainer>
                            <Dropdown
                                options={Object.values(Book.Genre)}
                                onChange={(newGenre) => { this.setState({ genre: newGenre.value }); }}
                                value={this.state.genre}
                                placeholder="Select a Genre"
                            />
                        </GenreComboboxContainer>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Description:</Label>
                        <TextInput
                            onChange={(text) => {this.setState({ description: text })}}
                            value={this.state.description}
                        />
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Publication Date:</Label>
                        <DatePicker
                            dateFormat="MMM DD, YYYY"
                            customInput={<TextInputImitation/>}
                            selected={this.state.publicationDate}
                            onChange={(date)=>{ this.setState({ publicationDate: date })}}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            popperPlacement={"left"}
                        />
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Price:</Label>
                        <TextInput
                            onChange={(text) => {this.setState({ price: text })}}
                            value={this.state.price}
                        />
                    </DetailsRow>
                    <Label style={{color: 'red'}}>{this.props.errorMessage}</Label>
                    <ButtonsRow>
                        <SaveRemoveButton
                            onClick={this.saveBook}
                        >{"Save Book"}</SaveRemoveButton>
                        <SaveRemoveButton style={this.props.book.id ? {} : { backgroundColor: 'grey' }}
                            onClick={this.props.book.id ? () => {this.props.removeBook(this.props.book.id)} : () => {}}>
                            {"Remove Book"}
                        </SaveRemoveButton>
                    </ButtonsRow>
                </ModalContainer>
            </Modal>
        );
    }
}

export default connect((state) => {
    return {
        removingBook: state.removingBook,
        savingBook: state.savingBook,
        updatingBook: state.updatingBook,
        errorMessage: state.errorMessage,
    };
}, {
    removeBook: booksActions.removeBook,
    saveBook: booksActions.saveBook,
    updateBook: booksActions.updateBook,
})(BookDetailsModal);

BookDetailsModal.propTypes = {
    book: Book.propTypes,
    savingBook: PropTypes.bool.isRequired,
    updatingBook: PropTypes.bool.isRequired,
    removingBook: PropTypes.bool.isRequired,
};
BookDetailsModal.defaultProps = {
    book: Book.defaultProps,
    savingBook: PropTypes.bool.isRequired,
    updatingBook: PropTypes.bool.isRequired,
    removingBook: PropTypes.bool.isRequired,
};

const Label = styled.div`
  color: steelblue;
  font-weight: bold;
`;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalContainer = styled.div`
    display: flex;
    height: 60vh;
    width: 40vw;
    flex-direction: column;
    justify-content: space-around;
    font-family: "Open Sans",serif;
`;
const SaveRemoveButton = styled.div`
  font-family: "Open Sans", serif;
  text-transform: uppercase;
  font-weight: bold;
  color: ghostwhite;
  background-color: steelblue;
  cursor: pointer;
  text-align: center;
  width: 120px;
  padding: 16px;
      &:hover {
    opacity: 0.8;
  }
 `;

const ButtonsRow = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GenreComboboxContainer = styled.div`
  width: 200px;
  min-height: 50px;
`;

