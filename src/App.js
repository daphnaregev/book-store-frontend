import React, { Component } from 'react';
import StringUtils from "./utils/StringUtils";
import styled from "styled-components";
import Book from "./models/Book";
import BookCard from "./Components/BookCard";


const books = [
    {
        id: StringUtils.generateGUID(),
        title: 'Hamlet',
        description: 'Hamlet book',
        isbnNumber: 981094580945,
        author: 'William Shakespeare',
        publicationDate: '21-10-2018',
        genre: Book.Genre.ROMANCE,
        price: 20,
        color: StringUtils.getRandomBookCoverColor()
    }, {
        id: StringUtils.generateGUID(),
        title: 'Pride and Prejudice',
        description: '',
        isbnNumber: 1234,
        author: 'Jane Austen',
        publicationDate: '21-10-2018',
        genre: Book.Genre.ROMANCE,
        price: 45,
        color: StringUtils.getRandomBookCoverColor()
    }, {
        id: StringUtils.generateGUID(),
        title: 'Catcher in the Rye',
        description: 'b',
        isbnNumber: 1234,
        author: 'J.D. Salinger',
        publicationDate: '21-10-2018',
        genre: Book.Genre.DRAMA,
        price: 35,
        color: StringUtils.getRandomBookCoverColor()
    },
    {
        id: StringUtils.generateGUID(),
        title: 'It',
        description: 'Stephen King',
        isbnNumber: 1234,
        author: 'Stephen King',
        publicationDate: '21-10-2018',
        genre: Book.Genre.ACTION,
        price: 200,
        color: StringUtils.getRandomBookCoverColor()
    },
];

class App extends Component {
  render() {
    return (
        <AppContainer>
            <BookList>
                {
                    books.map((item) => (
                        <BookCard
                            book={item}
                        />
                    ))
                }
                <AddBookContainer
                    onClick={() => {}}
                >
                    <ButtonContainer>
                        <i style={{ fontSize: 50, color: "steelblue" }} className="fas fa-plus-circle"/>
                        <NewBookLabel>{"ADD A NEW BOOK"}</NewBookLabel>
                    </ButtonContainer>
                </AddBookContainer>
            </BookList>
        </AppContainer>

    );
  }
}

export default App;

const AppContainer = styled.div`
  font-family: "Open Sans";
`;
const BookList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const AddBookContainer = styled.div`
    font-family: "Open Sans";
    background-color: #fafafa;
    height: 400px;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px;
    padding: 50px;
`;
const NewBookLabel = styled.div`
font-weight: bold;
color: steelblue;
margin: 7px;
  
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
  cursor: pointer;
`;

