import React from 'react';
import styled from "styled-components";


class TextInput extends React.Component {
    onChange(event) {
        this.props.onChange(event.target.value);
    };

    render () {
        return (
            <Input
                type={"text"}
                value={this.props.value ? this.props.value : ''}
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

export default TextInput;

const Input = styled.input`
  font-family: "Open Sans";
  box-sizing: border-box;
  border-radius: 2px;
  border: 1px solid #ccc;
  //height: 40px;
  padding: 8px; 
  font-size: 16px;
`;