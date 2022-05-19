/**
 * @jest-environment jsdom
 */

import { render, screen } from "@testing-library/react";
import InputField from "./InputField";

test("button should be disabled if less than 3 characters in input", () => {
  render(<InputField input={{ value: "ok" }} />);
});
