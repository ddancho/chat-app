import Globals from "./components/styles/Globals.styled";
import Topbar from "./components/topbar/Topbar";
import WsComponent from "./components/wsComponent/WsComponent";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { WsContext, wsSocket } from "./components/wsComponent/WsContext";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(wsSocket);
  }, []);

  const { userInfo: user } = useSelector((state) => state.user);

  return (
    <Router>
      <WsContext.Provider value={socket}>
        <Globals />
        <WsComponent />
        <Topbar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/register'>
            {!user.id ? <Register /> : <Redirect to='/' />}
          </Route>
          <Route exact path='/login'>
            {!user.id ? <Login /> : <Redirect to='/' />}
          </Route>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </WsContext.Provider>
    </Router>
  );
}

export default App;
