/*global document alert*/

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class Footer extends React.Component {

render () {

    return (
      <footer>
          <div className="container">
            <p className="text-footer">
              <a href='/'> bevallal.in </a> &copy; 2017.  All rights reserved.
            </p>
          </div>
     </footer>
    );
  }
}
