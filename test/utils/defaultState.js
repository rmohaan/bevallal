'use strict';

import mockdata from '../../src/middleware/mockdata';
import transformers from '../../src/middleware/transformers';

let state = {
  example: transformers.data(mockdata.data),
  user: {
    name: ''
  }
};

export default state;
