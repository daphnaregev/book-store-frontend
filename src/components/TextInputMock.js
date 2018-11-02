import React from "react";
import styled from "styled-components";
import {sharedStyledComponents} from "./sharedStyledComponents";

class TextInputMock extends React.Component {
    render() {
        return(
            <Container onClick={this.props.onClick}>
                {this.props.value}
            </Container>
        );
    }
}

const Container = styled(sharedStyledComponents.Text)`
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 8px; 
  font-size: 16px;
`;

export default TextInputMock;