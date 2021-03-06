import React, { Component } from 'react';
import styled from "styled-components";
import BookCard from "./BookCard";
import BookDetailsModal from "./BookDetailsModal";
import {connect} from "react-redux";
import booksActions from "../redux/actions/booksActions";
import StringUtils from "../utils/StringUtils";
import {sharedStyledComponents} from "./sharedStyledComponents";


class BooksPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newBookDetailsVisible: false,
        }
    }
    componentWillMount() {
        this.props.getBooks();
    }


    render() {
        if (!this.props.books) {
            return (
              <div>
                  no books
              </div>
            );
        }

        return (
            <BooksContainer>
                <BookList>
                    {
                        this.props.books.map((item) => (
                            <BookCard key={item.id ? item.id : StringUtils.generateGUID()} book={item}/>
                        ))
                    }
                    <AddBookContainer
                        onClick={() => { this.setState({ newBookDetailsVisible: true }); }}
                    >
                        <ButtonContainer>
                            <i style={{ fontSize: 50, color: "steelblue" }} className="fas fa-plus-circle"/>
                            <NewBookLabel>{"ADD A NEW BOOK"}</NewBookLabel>
                        </ButtonContainer>
                    </AddBookContainer>
                    <BookDetailsModal
                        onAfterOpen={() => {}}
                        onRequestClose={() => {this.setState({ newBookDetailsVisible: false, })}}
                        visible={this.state.newBookDetailsVisible}
                        book={this.props.book}
                    />
                </BookList>
            </BooksContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.bookList,
    }
};
const mapDispatchToProps = { getBooks: booksActions.getBooks };

export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);

const BooksContainer = styled(sharedStyledComponents.Text)`
`;

const BookList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const AddBookContainer = styled(sharedStyledComponents.Text)`
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

