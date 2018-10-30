import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TextInput from "./TextInput";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import Book from '../models/Book';
import moment from 'moment';

import TextInputImitation from '../components/TextInputImitation';
import {connect} from "react-redux";
import booksActions from "../redux/actions/booksActions";
import Spinner from 'react-spinkit';

class BookDetailsModal extends React.Component {

    constructor(props) {
        super(props);

        // TODO - default props
        this.state = {
            error: '',
            isbnNumber: props.isbnNumber,
            title: props.title,
            author: props.author,
            description: props.description,
            price: props.price,
            publicationDate: moment(props.publicationDate),
            genre: props.genre,
        }
    }
    componentWillReceiveProps(nextProps){
        if (this.props.removingBook === true && !nextProps.removingBook === false) {
            if (!nextProps.errorMessage || !nextProps.errorMessage.length) {
                this.onRequestClose();
            } else {
                this.setState({error: "error removing book"})
            }
        }
        if (this.props.savingBook === true && !nextProps.savingBook === false) {
            if (!nextProps.errorMessage || !nextProps.errorMessage.length) {
                this.onRequestClose();
            } else {
                this.setState({error: "error saving book"})
            }
        }
        if (this.props.updatingBook === true && !nextProps.updatingBook === false) {
            if (!nextProps.errorMessage || !nextProps.errorMessage.length) {
                this.onRequestClose();
            } else {
                this.setState({error: "error updating book"})
            }
        }
    }

    saveBook = () => {
        try {
            if (!this.props.id) {
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
                    id: this.props.id,
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
                            customInput={<TextInputImitation/>}
                            selected={this.state.publicationDate}
                            onChange={(date)=>{ this.setState({ publicationDate: date })}}
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            popperPlacement={"auto"}
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
                        <SaveRemoveButton style={this.props.id ? {} : { backgroundColor: 'grey' }}
                            onClick={this.props.id ? () => {this.props.removeBook(this.props.id)} : () => {}}>
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

