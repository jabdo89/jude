import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import toast from '@common/toast';
import { MdInsertDriveFile } from 'react-icons/md';
import Typography from '@common/typography';
import { FileName, Container } from './elements';

const Dropzone = ({
  acceptMessage,
  rejectMessage,
  defaultMessage,
  accept,
  setFile,
  maxSize,
  file,
  height
}) => {
  const onDropAccepted = useCallback(
    acceptedFiles => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const onDropRejected = useCallback(
    rejectedFiles => {
      if (rejectedFiles[0].size > maxSize) {
        toast.info('Max size excedeed', `Max file size is ${maxSize / 1000000}MB`);
      }
    },
    [maxSize]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept,
    onDropAccepted,
    onDropRejected,
    multiple: false,
    maxSize
  });

  return (
    <Container
      height={height}
      file={file}
      {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
    >
      <input {...getInputProps()} />
      {file ? (
        <FileName>
          <MdInsertDriveFile />
          <Typography textAlign="center" variant="headingSection" uppercase={false}>
            {file.name}
          </Typography>
        </FileName>
      ) : (
        <Fragment>
          {isDragActive ? (
            isDragAccept ? (
              <Typography textAlign="center" variant="muted">
                {acceptMessage}
              </Typography>
            ) : (
              <Typography textAlign="center" variant="muted">
                {rejectMessage}
              </Typography>
            )
          ) : (
            <Fragment>
              <Typography textAlign="center" variant="muted">
                {defaultMessage}
              </Typography>
              <Typography mt={20} textAlign="center" variant="muted" fontSize="12px">
                Tamaño máximo: {maxSize / 1000000}MB
              </Typography>
              <Typography mt={5} textAlign="center" variant="muted" fontSize="10px">
                (
                {accept
                  .split(', ')
                  .map(format => `.${format.split('/')[1]}`)
                  .toString()
                  .replace(/,/g, ', ')}
                )
              </Typography>
            </Fragment>
          )}
        </Fragment>
      )}
    </Container>
  );
};

Dropzone.defaultProps = {
  maxSize: 2000000,
  defaultMessage: 'Arrastra tus archivos aquí, o haz click para seleccionar',
  rejectMessage: 'Tipo de archivo no soportado',
  acceptMessage: 'Suelta aquí',
  file: null,
  height: '200'
};

Dropzone.propTypes = {
  accept: PropTypes.string.isRequired,
  defaultMessage: PropTypes.string,
  acceptMessage: PropTypes.string,
  rejectMessage: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  maxSize: PropTypes.number,
  file: PropTypes.any,
  height: PropTypes.string
};

export default Dropzone;
