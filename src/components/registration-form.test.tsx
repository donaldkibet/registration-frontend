import React from "react";
import RegistrationForm from "./registration-form.component";
import { render, screen } from "@testing-library/react";
import * as mockUseCounties from "../hooks/useCounties";
import * as mockSubCounties from "../hooks/useSubCounty";
import * as mockWards from "../hooks/useWards";
import userEvent from "@testing-library/user-event";

describe("RegistrationForm", () => {
  test("should render registration form", () => {
    jest.spyOn(mockUseCounties, "useCounties").mockReturnValue({
      isLoading: false,
      counties: [{ id: "01", label: "Mombasa" }],
      error: null,
    });
    jest.spyOn(mockSubCounties, "useSubCounties").mockReturnValue({
      isLoading: false,
      subCounties: [
        {
          label: "Kisauni",
          id: "M01",
          name: "Kisauni",
          wards: [],
        },
      ],
      error: null,
    });
    jest.spyOn(mockWards, "useWardsByCountyAndSubCountyID").mockReturnValue({
      isLoading: false,
      wards: [
        { id: "KS-01", name: "Mtwapa", label: "Mtwapa" },
        { id: "KS-02", name: "Nyali", label: "Nyali" },
      ],
      error: null,
    });
    const { container } = render(<RegistrationForm />);

    const nameInput = screen.getByRole("textbox", { name: /name/i });
    const dateOfBirthInput = screen.getByRole("textbox", {
      name: /Date of birth/i,
    });
    const genderRadioGroup = screen.getByRole("group", {
      name: /Gender/i,
    });
    expect(genderRadioGroup).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(dateOfBirthInput).toBeInTheDocument();

    // Address cascading

    const countySelect = screen.getByRole("listbox", { name: "County" });
    expect(countySelect).toBeInTheDocument();
    userEvent.click(countySelect);

    const subCounty = screen.getByRole("listbox", { name: "Sub County" });
    expect(subCounty).toBeInTheDocument();

    const ward = screen.getByRole("listbox", { name: "Ward" });
    expect(ward).toBeInTheDocument();
  });
});
