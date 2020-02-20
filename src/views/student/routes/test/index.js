import React from 'react';
// eslint-disable-next-line import/extensions
import { Container } from './elements';

const script = document.createElement('script');
script.src =
  'https://cdn2.hubspot.net/hubfs/1716276/embeddable_assessments/disc/disc_assessment_v1.1.0.js';
script.async = true;
document.body.appendChild(script);

const Test = () => (
  <Container>
    <div id="disc_assessment_root" data-api-token="d81a03d1163f14098a3d897db7b80dbe"></div>
  </Container>
);

export default Test;
