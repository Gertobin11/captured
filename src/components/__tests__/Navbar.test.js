import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../contexts/CurrentUserContext";
import NavBar from "../NavBar";

test("Renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Login" });
  expect(signInLink).toBeInTheDocument();
});

test("Renders link to the logged to the user profile for the logged in user", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const profileAvatar = await screen.findByText("Profile");
  expect(profileAvatar).toBeInTheDocument();
});

test("Renders sign-in and sign-out on log out", async () => {
  render(
    <Router>
      <CurrentUserProvider>
        <NavBar />
      </CurrentUserProvider>
    </Router>
  );

  const signOutLink = await screen.findByRole("link", { name: "Logout" });
  fireEvent.click(signOutLink);

  const SignInLink = await screen.findByRole("link", { name: "Login" });
  const SignUpLink = await screen.findByRole("link", { name: "Sign Up" });
  
  expect(SignInLink).toBeInTheDocument();
  expect(SignUpLink).toBeInTheDocument();
});
