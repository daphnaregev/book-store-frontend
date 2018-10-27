import React from 'react';
import styled from "styled-components";
class TextInput extends React.Component {
    constructor(props) {
        super();

        this.state = {
            value: props.value ? props.value : "",
        }
    }

    onChange = (event) => {
        this.setState({ value: event.target.value }, () => {
            if (this.props.onChange()) {
                this.props.onChange(this.state.value);
            }
        });
    };

    render () {
        return (
            <Input type={"text"} value={this.state.value} onChange={this.onChange}/>
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