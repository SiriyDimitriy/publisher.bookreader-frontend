import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-isomorphic-tools';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BackIcon from '../../../../../../assets/images/svg/back-chevron-left.svg';
import EditIcon from '../../../../../../assets/images/svg/edit.svg';
import WordslistIcon from '../../../../../../assets/images/svg/wordslist-icon.svg';
import CurrentPageIcon from '../../../../../../assets/images/svg/current-page-or-contents.svg';
import SettingsIcon from '../../../../../../assets/images/svg/settings-icon.svg';
import * as bookActions from '../../../bookActions.js';
import * as utils from '../../../utils/functions.js';

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 3.5rem 5.7rem 3.5rem 6.9rem;
  position: fixed;
  z-index: 1000;
  top: 0;
  width: 100%;
  height: 10rem;
  object-fit: contain;
  -webkit-backdrop-filter: blur(7.4px);
  backdrop-filter: blur(7.4px);
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0.1rem 1.1rem 0 rgba(0, 0, 0, 0.08);
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
`;

const ToMyLibrary = styled.span`
  display: flex;
  align-items: center;
  margin-left: 1.1rem;
  height: 2.3rem;
  font-size: 1.8rem;
  font-weight: bold;
  color: #4a4a4a;
`;

const Button = styled.button`
  width: 112px;
  height: 42px;
  opacity: 0.7;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 600;
  background-color: transparent;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

const SaveButton = Button.extend`
  background-color: rgb(0, 0, 0);
  margin-left: 1rem;
`;

const CancelButton = Button.extend`
  opacity: 0.7;
  color: #000000;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const EditButton = CancelButton.extend`
    display: flex;
    align-items: center;
    justify-content: space-around;
    opacity: 0.3;
    font-size: 16px;
    font-weight: 600;
    color: #000000;
    svg {
        margin-right: 1rem;
    }
`;

const EditButtonContent = styled.span`
    display: flex;
    align-items: center;
`

const SubNavigation = styled.section`
  display: flex;
  justify-content: space-between;
  flex: 33.3%;
`;
const WordList = styled.section`
  display: flex;
  align-items: center;
  opacity: 0.3;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  span {
    margin-left: 1.5rem;
  }
`;
const Main = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Settings = WordList.extend``;
const BookName = styled.span`
  opacity: 0.7;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
`;
const Author = styled.span`
  opacity: 0.5;
  font-size: 12px;
  font-weight: 600;
  color: #000000;
`;
const LeftNav = styled.section`
  display: flex;
  flex: 33.3%;
`;
const RightNav = LeftNav.extend`justify-content: flex-end;`;

const mapStateToProps = state => {
    return {
        bookCopy: state.bookReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(bookActions, dispatch)
    };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class BookSingleNavigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmptyDiff: true,
            editMode: this.props.editMode
        };
    }

    componentWillUnmount() {
        this.props.actions.cleanBook()
    }

    changeBookMode = () => {
        this.props.bookModeHandler(this.state.editMode);
        this.state.editMode
            ? this.setState({editMode: false})
            : this.setState({editMode: true});
    };

    save = () => {
        const {bookCopy} = this.props;
        let reqParams;

        if (this.props.newBook) {
            reqParams = JSON.parse(JSON.stringify(bookCopy));
            reqParams.pages.map(page => {
                utils.findImagesAndSetId(page, 'images');
            });
            reqParams.avatar !== null
                ? (reqParams.avatar = reqParams.avatar.id)
                : (reqParams.avatar = null);

            delete reqParams.createdAt;
            delete reqParams.createdBy;

            utils.filterObject(reqParams, 'id');
            this.props.actions.createNewBook(reqParams);
        } else {
            reqParams = {bookForm: JSON.parse(JSON.stringify(bookCopy))};
            reqParams.bookForm.pages.map(page => {
                utils.findImagesAndSetId(page, 'images');
            });
            reqParams.bookForm.avatar !== null
                ? (reqParams.bookForm.avatar = reqParams.bookForm.avatar.id)
                : (reqParams.bookForm.avatar = null);

            delete reqParams.bookForm.createdAt;
            delete reqParams.bookForm.createdBy;

            utils.filterObject(reqParams.bookForm, 'id');
            this.props.actions.saveAction(reqParams, bookCopy.id);
        }
        console.log('save', reqParams);
    };

    render() {
        return (
            <Section>
                <LeftNav>
                    {!this.state.editMode ? (
                        <Link to={{pathname: '/books'}}>
                            <BackIcon/>
                            <ToMyLibrary>My library</ToMyLibrary>
                        </Link>
                    ) : null}
                </LeftNav>
                <SubNavigation>
                    <WordList>
                        <WordslistIcon />
                        <span>Wordslist</span>
                    </WordList>
                    <Main>
                        <CurrentPageIcon />
                        <BookName>
                            {this.props.book ? this.props.book.title : 'Not specifed'}
                        </BookName>
                        <Author>
                            {this.props.book ? this.props.book.author : 'Not specifed'}
                        </Author>
                    </Main>
                    <Settings>
                        <SettingsIcon />
                        <span>Settings</span>
                    </Settings>
                </SubNavigation>
                <RightNav>
                    {!this.state.editMode ? (
                        this.props.newBook ? (
                            <SaveButton onClick={this.save}>SAVE</SaveButton>
                        ) : (
                            <EditButton onClick={this.changeBookMode}>
                                <EditButtonContent><EditIcon/><span>Edit</span>
                                </EditButtonContent>
                            </EditButton>
                        )
                    ) : (
                        <div>
                            <CancelButton onClick={this.changeBookMode}>cancel</CancelButton>
                            <SaveButton onClick={this.save}>SAVE</SaveButton>
                        </div>
                    )}
                </RightNav>
            </Section>
        );
    }
}
