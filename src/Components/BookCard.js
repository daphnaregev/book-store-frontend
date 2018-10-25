import React from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import Modal from 'react-modal';
import Book from '../models/Book';


class BookCard extends React.Component {

    constructor() {
        super();
        this.state = {
          detailsVisible: false,
        };
    }
    showDetails = () => {
        this.setState({ detailsVisible: true, });
    };

    afterShowDetails = () => {
    };

    closeDetails = () => {
        this.setState({ detailsVisible: false, });
    };
    render() {

        let textColor = this.props.book && this.props.book.color ? tinycolor(this.props.book.color).isDark() ? '#fafafa' : '#000' : "fafafa";

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
            <BookContainer>
                <BookCoverContainer onClick={this.showDetails} color={this.props.book.color}>
                    <AuthorTitleContainer>
                        <AuthorRow color={textColor}>{this.props.book.author}</AuthorRow>
                        <Separator color={textColor}/>
                        <TitleRow color={textColor}>{this.props.book.title}</TitleRow>
                    </AuthorTitleContainer>
                </BookCoverContainer>
                <DetailsContainer>
                    <DetailsRow>
                        <Label>Author:</Label>
                        <div>{this.props.book.author}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Title:</Label>
                        <div>{this.props.book.title}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Description:</Label>
                        <div>{this.props.book.description}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Publication Date:</Label>
                        <div>{this.props.book.publicationDate}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Genre:</Label>
                        <div>{this.props.book.genre}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Price:</Label>
                        <div>{`${this.props.book.price}$`}</div>
                    </DetailsRow>
                </DetailsContainer>
                <Modal
                    isOpen={this.state.detailsVisible}
                    onAfterOpen={this.afterShowDetails}
                    onRequestClose={this.closeDetails}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ModalContainer>
                        <DetailsRow>
                            <Label>ISBN Number:</Label>
                            <input value={this.props.book.isbnNumber}/>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Title:</Label>
                            <input value={this.props.book.title}/>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Author:</Label>
                            <input value={this.props.book.author}/>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Description:</Label>
                            <input value={this.props.book.description}/>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Publication Date:</Label>
                            <div>{this.props.book.publicationDate}</div>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Genre:</Label>
                            <div>{this.props.book.genre}</div>
                        </DetailsRow>
                        <DetailsRow>
                            <Label>Price:</Label>
                            <div>{`${this.props.book.price}$`}</div>
                        </DetailsRow>
                        <ButtonsRow>
                            <SaveRemoveButton>{"SAVE BOOK"}</SaveRemoveButton>
                            <SaveRemoveButton>{"REMOVE BOOK"}</SaveRemoveButton>
                        </ButtonsRow>
                    </ModalContainer>
                </Modal>
            </BookContainer>
        );
    }
}

BookCard.propTypes = {
  book: Book.PropTypes,
};

export default BookCard;

const Separator = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
  height: 1px;
  width: 60%;
  background-color: ${props=>props.color};
`;
const AuthorTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const BookContainer = styled.div`
  font-family: "Open Sans";
  background-color: #fafafa;
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;
  padding: 50px;
`;

const BookCoverContainer = styled.div`
  -webkit-box-shadow: 10px 10px 25px -11px rgba(0,0,0,0.75);
  -moz-box-shadow: 10px 10px 25px -11px rgba(0,0,0,0.75);
  box-shadow: 10px 10px 25px -11px rgba(0,0,0,0.75);
  background-color: ${props=>props.color};
  justify-content: space-between;
  align-items: center;
  height: 250px;
  width: 200px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-self: center;
  opacity: 0.8;
    &:hover {
    opacity: 1;
  }

`;
const AuthorRow = styled.div`
  color: ${props=>props.color};
`;
const TitleRow = styled.div`
  color: ${props=>props.color};
  font-size: x-large;
  text-align: center;
`;

const SaveRemoveButton = styled.div`
  font-family: "Open Sans";
  font-weight: bold;
  color: ghostwhite;
  text-transform: uppercase;
  background-color: steelblue;
  cursor: pointer;
  text-align: center;
  alig
  width: 100px;
  padding: 16px;
      &:hover {
    opacity: 0.8;
  }
 `;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  margin-top: 30px;
 `;

const Label = styled.div`
  color: steelblue;
  font-weight: bold;
`;

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ModalContainer = styled.div`
    display: flex;
    height: 500px;
    width: 900px;
    flex-direction: column;
    justify-content: space-between;
    font-family: "Open Sans";
`;
