import { render, screen } from "@testing-library/react";
import React from "react";

import App from "../components/App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText("django-react-docker-heroku-template");
  expect(linkElement).toBeInTheDocument();
});
