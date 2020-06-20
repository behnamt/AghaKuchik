import React, { createProvider } from 'reactn';
import ReactDOM from 'react-dom';
import addReactNDevTools from 'reactn-devtools';
import './index.css';
import * as serviceWorker from './serviceWorker';
import World from './features/World/World';
import { INITIAL_STATE, INITIAL_REDUCERS } from './state/state';

const StateProvider = createProvider(INITIAL_STATE, INITIAL_REDUCERS);

addReactNDevTools(StateProvider);


ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <World />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
