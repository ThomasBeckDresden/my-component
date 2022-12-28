import React from "react"
import {screen, render} from "@testing-library/react"

import {MyComponent} from "./my-component";

describe("MyComponent", () => {
    it("should render the component", () => {
        render(<MyComponent contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
