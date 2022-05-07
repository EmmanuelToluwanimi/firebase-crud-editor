import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from "./components/PrivateRoute";
import Quill from "./components/Quill";
import Previex from "./components/Previex";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}>

      <div className="w-100" style={{ maxWidth: '600px' }}>
        <Router>
          <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/quill" component={Quill} />
            <PrivateRoute path="/preview/:content" component={Previex} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
          </AuthProvider>

        </Router>

      </div>
    </Container>
  )
}

export default App;
