import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
    display: flex;
    div {
        width: 100%;
        min-height: 3rem;
    }
    textarea {
        width: 100%;
        height: ${props => props.height};
        resize: none;
        border: none;
    }
`

export default class EditText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: this.props.content
        }
    }

    edit = () => {
        this.setState({
            editing: true
        })
    }

    save = () => {
        let val = this.refs.newText.value;
        if (val !== this.state.text) {
            this.setState({
                text: val,
                editing: false
            })
            this.props.handler(val)
        } else {
            this.setState({
                editing: false
            })
        }

    }

    renderNormal = () => {
        return (
            <div onClick={this.edit} >{this.state.text}</div>
        )
    }

    renderForm = () => {
        return (
            <textarea
                autoFocus
                ref='newText'
                onBlur={this.save}
                defaultValue={this.state.text}
                style={{height: this.props.content ? this.props.height : '3rem'}}
            ></textarea>
        )
    }

    render() {
        return (
            <Wrapper height={this.props.height}>
                {this.state.editing ? this.renderForm() : this.renderNormal()}
            </Wrapper>
        )
    }
}