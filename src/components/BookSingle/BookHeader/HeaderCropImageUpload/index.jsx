import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import Dropzone from 'react-dropzone'
import ReactCrop from 'react-image-crop'
import {openModal, closeModal} from 'react-isomorphic-tools'
import 'react-image-crop/dist/ReactCrop.css'
import {fetcher} from 'react-isomorphic-tools'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'
const getOrientedImage = require('exif-orientation-image')
import Rotate from '../../../../../assets/images/svg/rotate-option.svg';
import MediaIcon from '../../../../../assets/images/svg/page-media.svg';


const Wrap = styled.section`
    display: block;
    width: 100%;
`

const ModalContent = styled.div`
    background-color: white;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const ContentTitle = styled.p`
    color: #a3acbd;
    font-size: 2rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
`

const BtnsBlock = styled.section`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
`

const SelectPhoto = styled.section`
  width: 100%;
  display: flex;
  height: 8rem;
  align-items: center;
  border-radius: 1rem;
  justify-content: center;
  background-color: #f0f0f0;
  cursor: pointer;
`;


const UploadButton = styled.button`
  width: 100%;
  display: flex;
  height: 6rem;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  font-family: Qanelas;
  font-size: 1.8rem;
  font-weight: bold;
  letter-spacing: -0px;
  text-align: left;
  color: #4a4a4a;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 1rem;
  &:hover {
    background-color: #d3d3d3;
  }
`;

const RotateBtn = styled.section`
  width: 10%;
  height: 10%;
  margin: 0;
  cursor: pointer;
  transition: transform 200ms linear;
  display: flex;
  flex-direction: column;
  path {
    fill: black;
    width: 100%;
    height: 100%;
  }
`;

const windowStyles = {
    width: '29.2rem',
    borderRadius: '3px',
    overflow: 'hidden'
}

const JPG_QUALIFY = 0.95;

@connect(state=>({
    modals: state.modals,
}), dispatch=>({
    actions: bindActionCreators({
        openModal,
        closeModal,
    }, dispatch)
}))

export default class HeaderCropImageUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            imageDataUrl: null,
            rotate: 0,
            loading: false,
        }
        this._handleOpen = this._handleOpen.bind(this);
        this._handleClose = this._handleClose.bind(this);
        this._rotate = this._rotate.bind(this);
        this._b64toBlob = this._b64toBlob.bind(this);
        this._uploadPhoto = this._uploadPhoto.bind(this);
        this._handleDrop = this._handleDrop.bind(this);
        this._handleCancel = this._handleCancel.bind(this);
        this._handleSave = this._handleSave.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._handleLoad = this._handleLoad.bind(this);

    }

    render() {
        const {modals} = this.props
        const {imageDataUrl, loading} = this.state;

        return (
            <Wrap>
                <SelectPhoto onClick={this._handleOpen} title='select file'>
                    <MediaIcon />
                </SelectPhoto>
                <Dialog
                    modal={false}
                    open={modals.avatarChange || false}
                    onRequestClose={this._handleClose}
                    autoScrollBodyContent={false}
                    autoDetectWindowHeight={false}
                    bodyStyle={{padding: '0'}}
                    contentStyle={windowStyles}
                >
                    <ModalContent>
                        <ContentTitle>select photo</ContentTitle>
                        {imageDataUrl ? <div>
                            <ReactCrop src={imageDataUrl} crop={{width: 100, aspect: 2}} keepSelection={true}
                                       onComplete={this._handleChange} onImageLoaded={this._handleLoad}/>
                            <BtnsBlock>
                                {loading ? <LinearProgress mode='indeterminate' /> : [
                                    <button onClick={this._handleSave} key='saveBtn'>save</button>,
                                    <RotateBtn
                                        onClick={this._rotate.bind(this, imageDataUrl, 90)}
                                        style={{transform: `rotate(${this.state.rotate}deg)`}}
                                        key='rotateBtn'
                                        title='rotate image'
                                    >
                                        <Rotate />
                                    </RotateBtn>,
                                    <button onClick={this._handleCancel} key='cancelBtn'>
                                        cancel
                                    </button>
                                ]}
                            </BtnsBlock>
                        </div> : <Dropzone style={{}} multiple={false} onDrop={this._handleDrop}>
                            <UploadButton>upload</UploadButton>
                        </Dropzone>

                        }
                    </ModalContent>
                </Dialog>
            </Wrap>
        )
    }

    _handleOpen = () => {
        !this.props.actions.openModal('avatarChange')
    }

    _handleClose = () => {
        this.props.actions.closeModal('avatarChange')
    }

    async _uploadPhoto(file) {
        let convertedFile = this._b64toBlob(file);
        const formData = new FormData();
        formData.append('file', convertedFile);

        const response = await fetcher('/_uploader/images/upload', {
            method: 'POST', params: formData, type: 'form-data',
        });

        this.setState({loading: false});
        this.props.selectHeaderMedia(
            JSON.parse(response)
        );
        this._handleClose()
    }

    async _handleDrop(files) {
        for (let i = 0; i < files.length; i++) {
            await getOrientedImage(files[i], (err, canvas) => {
                let base64image = null;
                if(files[i].type === 'image/jpeg') {
                    base64image = canvas.toDataURL('image/jpeg', JPG_QUALIFY);
                }
                else base64image = canvas.toDataURL('image/png');
                this.setState({
                    imageDataUrl: base64image
                })
            })
        }
    }

    _rotate = (dataUrl, angle) => {
        this.setState((prevState) => (
            {
                loading: true,
                rotate: prevState.rotate + angle
            }));
        let img = new Image();
        img.src = dataUrl;

        let canvas = document.createElement('canvas');
        canvas.width = img.naturalHeight;                       //set width of empty canvas
        canvas.height = img.naturalWidth;                       //set height of empty canvas

        let ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);     //set cursor to center
        ctx.rotate(angle * Math.PI / 180);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);      //img to empty canvas
        ctx.restore();
        this.setState({
            loading: false,
            imageDataUrl: canvas.toDataURL(),
        });
    }

    _handleCancel = () => {
        this.setState({
            imageDataUrl: null,
            loading: false
        })
    }

    _handleSave = () => {
        const image = document.createElement('img');
        this.setState({loading: true});
        image.onload = () => {
            const {crop} = this
            var imageWidth = image.naturalWidth;
            var imageHeight = image.naturalHeight;

            var cropX = (crop.x / 100) * imageWidth;
            var cropY = (crop.y / 100) * imageHeight;

            var cropWidth = (crop.width / 100) * imageWidth;
            var cropHeight = (crop.height / 100) * imageHeight;

            var canvas = document.createElement('canvas');
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            this._uploadPhoto(canvas.toDataURL());

        }
        image.src = this.image.src
    }

    _handleChange = (crop) => {
        this.crop = crop
    }

    _handleLoad = (crop, image) => {
        this.image = image
        this.crop = crop
    }

    _b64toBlob = (dataURI) => {

        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/jpeg'});
    }
}
