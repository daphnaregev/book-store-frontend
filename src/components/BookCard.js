import React from 'react';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';
import Book from '../models/Book';
import BookDetailsModal from "./BookDetailsModal";
import moment from "moment";


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

    onAfterShow = () => {};

    onRequestClose = () => {
        this.setState({ detailsVisible: false, });
    };

    render() {
        let textColor = this.props.book && this.props.book.color ? tinycolor(this.props.book.color).isDark() ? '#fafafa' : '#000' : "fafafa";
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
                        <Label>isbnNumber:</Label>
                        <div>{this.props.book.isbnNumber}</div>
                    </DetailsRow>
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
                        <div>{moment(this.props.book.publicationDate).format('MMM DD, YYYY').toString()}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Genre:</Label>
                        <div>{this.props.book.genre}</div>
                    </DetailsRow>
                    <DetailsRow>
                        <Label>Price:</Label>
                        <div>{`${this.props.book.price}$`}</div>
                    </DetailsRow>
                    <BookDetailsModal
                        onAfterOpen={this.onAfterShow}
                        onRequestClose={this.onRequestClose}
                        visible={this.state.detailsVisible}
                        book={this.props.book}
                    />
                </DetailsContainer>
            </BookContainer>
        );
    }
}

BookCard.propTypes = {
  book: Book.propTypes,
};
BookCard.defaultProps = {
  book: Book.defaultProps,
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
  height: 450px;
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
  height: 300px;
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
