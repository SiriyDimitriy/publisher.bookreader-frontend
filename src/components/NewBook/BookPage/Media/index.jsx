import React from 'react';
import {fetcher} from 'react-isomorphic-tools';
import styled from 'styled-components';
import PageMediaIcon from '../../../../../assets/images/svg/page-media.svg'
import RemoveMediaIcon from '../../../../../assets/images/svg/cancel.svg'
import CropImageUpload from '../../../common/CropImageUpload/index'
import PageElementWrapper from '../../../../components/common/PageElementWrapper'
import RemoveMedia from '../../../common/RemoveMedia'

const MediaWrapper = styled.section`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 1rem;
  img {
    object-fit: cover;
    width: 100%;
  }
  &:hover section {
    display: flex;
  }
`;

export default class Media extends React.Component {
    constructor(props) {
        super(props);
        this.b64toBlob = this._b64toBlob.bind(this);
        this.uploadPhoto = this._uploadPhoto.bind(this);
    }

    state = {
        openState: false
    };

    changeStateDialog = () => {
        this.setState({
            openState: !this.state.openState
        });
    };

    handleClose = () => {
        this.setState({
            openState: false,
            loading: false
        });
    };

    removeMedia = () => {
        this.props.removeMedia(
            this.props.bookId,
            this.props.pageNumber,
            this.props.image.image.id,
            this.props.image.order
        );
    };

    async _uploadPhoto(file) {
        let convertedFile = this.b64toBlob(file);
        const formData = new FormData();
        formData.append('file', convertedFile);

        const response = await fetcher('/_uploader/images/upload', {
            method: 'POST',
            params: formData,
            type: 'form-data'
        });

        this.props.selectMedia(
            this.props.bookId,
            this.props.pageNumber,
            JSON.parse(response),
            this.props.mediaOrder
        );
        this.handleClose();
    }

    _b64toBlob = dataURI => {
        let byteString = atob(dataURI.split(',')[1]);
        let ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    };

    render() {
        const {image} = this.props;
        return (
            <PageElementWrapper>
                <PageMediaIcon />
                {image.image !== null ? (
                    <MediaWrapper>
                        <img src={image.image.path}/>
                        <RemoveMedia title='remove media' onClick={this.removeMedia}>
                            <RemoveMediaIcon />
                        </RemoveMedia>
                    </MediaWrapper>
                ) : (
                    <CropImageUpload
                        bookId={this.props.bookId}
                        pageNumber={this.props.pageNumber}
                        mediaOrder={this.props.image.order}
                        selectMedia={this.props.selectMedia}
                        openState={this.state.openState}
                        changeStateDialog={this.changeStateDialog}
                        handleClose={this.handleClose}
                        uploadPhoto={this.uploadPhoto}
                    />
                )}
            </PageElementWrapper>
        );
    }
}
