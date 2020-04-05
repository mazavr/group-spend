import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {AppProvider} from './App/AppContext';

ReactDOM.render(<AppProvider><App/></AppProvider>, document.getElementById('root'));

serviceWorker.register();
