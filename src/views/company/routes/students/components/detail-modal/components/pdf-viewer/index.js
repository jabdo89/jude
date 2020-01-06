import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@common/typography';
import Loader, { LoaderContainer } from '@common/loader';
import Button from '@common/button';
import { Document, Page, pdfjs } from 'react-pdf';
import Navigator from './elements';

class PreviewPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1
    };
  }

  componentDidMount = () => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  };

  nextPage = () => this.setState(({ pageNumber }) => ({ pageNumber: pageNumber + 1 }));

  prevPage = () => this.setState(({ pageNumber }) => ({ pageNumber: pageNumber - 1 }));

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    const { src } = this.props;
    return (
      <Fragment>
        <Document
          className="pdf"
          loading={
            <LoaderContainer>
              <Loader my={150} />
            </LoaderContainer>
          }
          file={src}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page
            loading={
              <LoaderContainer>
                <Loader my={150} />
              </LoaderContainer>
            }
            width={400}
            pageNumber={pageNumber}
          />
        </Document>
        <Navigator>
          <Button
            onClick={this.prevPage}
            disabled={pageNumber === 1}
            color="secondary"
            size="small"
          >
            {'< Previous'}
          </Button>
          <Typography textAlign="center" variant="muted">
            Page {pageNumber} of {numPages}
          </Typography>
          <Button
            onClick={this.nextPage}
            disabled={pageNumber === numPages}
            color="secondary"
            size="small"
          >
            {'Next >'}
          </Button>
        </Navigator>
      </Fragment>
    );
  }
}

PreviewPDF.propTypes = {
  src: PropTypes.string.isRequired
};

export default PreviewPDF;
