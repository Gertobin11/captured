import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/" render={() => <h1>Homepage</h1>} />
          <Route exact path="/sign-in" render={() => <h1>Sign-in</h1>} />
          <Route exact path="/logout" render={() => <h1>Logout</h1>} />
          <Route render={() => <h2>Sorry Page Not Found</h2>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
