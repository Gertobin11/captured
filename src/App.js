import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import PostCreateForm from "./pages/posts/PostCreateForm";
import PostPage from "./pages/posts/PostPage";


function App() {
  return (
      <div className={styles.App}>
        <NavBar />
        <Container>
          <Switch>
            <Route exact path="/" render={() => <h1>Homepage</h1>} />
            <Route exact path="/sign-up" render={() => <SignUpForm />} />
            <Route exact path="/sign-in" render={() => <SignInForm />} />
            <Route exact path="/logout" render={() => <h1>Logout</h1>} />
            <Route exact path="/posts/create" render={() => <PostCreateForm />} />
            <Route exact path="/posts/:id" render={() => <PostPage />} />
            <Route render={() => <h2>Sorry Page Not Found</h2>} />
          </Switch>
        </Container>
      </div>
  );
}

export default App;
