import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './styles/styles.css';
import Home from './pages/home';
import Calendar from './pages/calendar';
import { Provider } from 'react-redux';
import store from './store';
import * as serviceWorker from './serviceWorker';
import * as actionCreators from './store/actions';

const routing = (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/calendar" component={Calendar} />
      </div>
    </Router>
  </Provider>
);
class Index extends React.Component {
  componentWillMount() {
    store.dispatch(actionCreators.fetchCustomers());
  }
  render() {
    return routing;
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
serviceWorker.unregister();
