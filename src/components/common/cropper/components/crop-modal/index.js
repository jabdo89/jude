import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Button from '@common/button';
import { MdClear } from 'react-icons/md';
import {
  ModalContainer,
  ModalBox,
  ModalTitle,
  CloseButton,
  ModalActions,
  PseudoContainer,
  ContentHeader,
  ContentFooter
} from './elements';

class CropModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
  }

  setRef = element => {
    this.cropper = element;
  };

  componentDidMount = () => {
    const { body } = document;
    body.style.overflow = 'hidden';
  };

  componentWillUnmount = () => {
    const { body } = document;
    body.style.overflow = null;
  };

  onChange = () => {
    this.setState({ file: this.cropper.getCroppedCanvas() });
  };

  dataURItoBlob = dataURI => {
    // convert base64 to raw binary data held in a string
    const byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const _ia = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      _ia[i] = byteString.charCodeAt(i);
    }

    const dataView = new DataView(arrayBuffer);
    const blob = new Blob([dataView], { type: mimeString });
    return blob;
  };

  crop = async () => {
    const { confirm, imageName } = this.props;
    const { file } = this.state;
    const url = file.toDataURL();
    const blobFile = this.dataURItoBlob(url);
    const finalFile = new File([blobFile], imageName);
    confirm(finalFile);
  };

  render() {
    const { imageSrc, aspectRatio, title, cancel } = this.props;
    return (
      <ModalContainer>
        <ModalBox animate>
          <ContentHeader>
            <ModalTitle>{title || 'Recorta tu imagen'}</ModalTitle>
            <CloseButton onClick={cancel}>
              <MdClear />
            </CloseButton>
          </ContentHeader>
          <Cropper
            ref={this.setRef}
            src={imageSrc}
            style={{ height: 400, width: '100%' }}
            // Cropper.js options
            aspectRatio={aspectRatio}
            guides={false}
            crop={this.onChange}
            viewMode={2}
            zoomable={false}
          />
          <ContentFooter>
            <ModalActions>
              <Button color="primary" onClick={this.crop}>
                Confirmar
              </Button>
            </ModalActions>
          </ContentFooter>
        </ModalBox>
        <PseudoContainer onClick={cancel} />
      </ModalContainer>
    );
  }
}

CropModal.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  aspectRatio: PropTypes.number.isRequired
};

export default CropModal;
