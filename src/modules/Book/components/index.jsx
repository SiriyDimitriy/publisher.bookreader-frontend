import React from 'react';
import styled from 'styled-components';
import EditMode from './EditMode/index';
import ViewMode from './ViewMode/index';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export default class BookSingle extends React.Component {
    constructor(props) {
        super(props);
    }

    bookModeHandler = editMode => {
        editMode
            ? this.setState({editMode: false})
            : this.setState({editMode: true});
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <Section>
                {this.props.editMode ? (
                    <EditMode
                        editMode={this.props.editMode}
                        book={this.props.book}
                        pageActions={this.props.pageActions}
                    />
                ) : (
                    <ViewMode
                        book={this.props.book}
                        match={this.props.match}
                        fetchBook={this.props.pageActions.fetchBook}
                    />
                )}
            </Section>
        );
    }
}
