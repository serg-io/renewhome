import {LoadingSpinner} from 'components/shared';
import {Cart} from 'pages/cart';
import {Confirmation} from 'pages/confirmation';
import {Menu} from 'pages/menu';
import {Welcome} from 'pages/welcome';
import {Suspense} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {Store} from 'store';

/**
 * THE APP
 */
function App(): JSX.Element {
  return (
    <Store>
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            <Route path="/menu">
              <Menu />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/confirmation">
              <Confirmation />
            </Route>
            <Route>
              <Welcome />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Store>
  );
}

/**
 * THE APP
 */
export default App;
