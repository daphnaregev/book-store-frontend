import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import TextInput from "./TextInput";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import 'react-widgets/dist/css/react-widgets.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import Book from '../models/Book';
import { Combobox, DateTimePicker  } from 'react-widgets'
import moment from 'moment';

import TextInputImitation from '../components/TextInputImitation';

// import DayPicker from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

class BookDetailsModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isbnNumber: props.isbnNumber,
            title: props.title,
            author: props.author,
            description: props.description,
            price: props.price,
            // publicationDate: props.publicationDate,
            publicationDate: moment(),
            genre: props.genre,
        }
    }

    handleChangePublicationDate = (date) => {
        this.setState({ publicationDate: date, });
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
                            onChange={(text) => {this.setState({ isbnNumber: text })}}
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
                        <div style={{width: 200, minHeight: 50}}>
                            <Dropdown
                                options={Object.values(Book.Genre)}
                                onChange={(newGenre) => { this.setState({ genre: newGenre }); }}
                                value={this.state.genre}
                                placeholder="Select a Genre"
                            />

                        </div>
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
                    <ButtonsRow>
                        <SaveRemoveButton>{"Save Book"}</SaveRemoveButton>
                        <SaveRemoveButton>{"Remove Book"}</SaveRemoveButton>
                    </ButtonsRow>
                </ModalContainer>
            </Modal>
        );
    }
}

export default BookDetailsModal;

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
    font-family: "Open Sans";
`;
const SaveRemoveButton = styled.div`
  font-family: "Open Sans";
  text-transform: uppercase;
  font-weight: bold;
  color: ghostwhite;
  text-transform: uppercase;
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

