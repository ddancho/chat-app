import Globals from "./components/styles/Globals.styled";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { userInfo: user } = useSelector((state) => state.user);

  return (
    <Router>
      <Globals />
      <Topbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/register'>
          {user.length === 0 ? <Register /> : <Redirect to='/' />}
        </Route>
        <Route exact path='/login'>
          {user.length === 0 ? <Login /> : <Redirect to='/' />}
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
