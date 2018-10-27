import React from "react";
import styled from "styled-components";

class TextInputImitation extends React.Component {
    render() {
        return(
            <Container onClick={this.props.onClick}>
                {this.props.value}
            </Container>
        );
    }
}

const Container = styled.div`
  font-family: "Open Sans"; //TODO - make font available for all the app
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 8px; 
  font-size: 16px;
`;

export default TextInputImitation;