import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'theme';
import CropModal from './components/crop-modal';

const crop = (imageFile, aspectRatio, title) => {
  // Inside of component because if we put this out, ssr would crash,
  // due to inexistence of document at server
  const modalRoot = document.getElementById('modal');

  return new Promise(resolve => {
    const modalContainer = document.createElement('div');
    modalRoot.appendChild(modalContainer);

    const confirm = croppedFile => {
      resolve(croppedFile);
      ReactDOM.unmountComponentAtNode(modalContainer);
      modalRoot.removeChild(modalContainer);
    };

    const cancel = () => {
      resolve(false);
      ReactDOM.unmountComponentAtNode(modalContainer);
      modalRoot.removeChild(modalContainer);
    };

    ReactDOM.render(
      <ThemeProvider theme={theme}>
        <CropModal
          imageSrc={URL.createObjectURL(imageFile)}
          imageName={imageFile.name}
          aspectRatio={aspectRatio}
          title={title}
          confirm={confirm}
          cancel={cancel}
        />
      </ThemeProvider>,
      modalContainer
    );
  });
};

export default crop;
