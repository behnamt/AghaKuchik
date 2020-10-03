import ReactDOM from 'react-dom';
import React, { createProvider } from 'reactn';
import addReactNDevTools from 'reactn-devtools';
import World from './features/World/World';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { INITIAL_REDUCERS, INITIAL_STATE } from './state/state';

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

serviceWorker.unregister();
