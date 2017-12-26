import React from 'react';
import ReactDOM from 'react-dom';
import './semantic/dist/semantic.min.css'
import './index.css';
import App from './App';
import Signature from './Signature';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Signature />, document.getElementById('root'));
registerServiceWorker();
