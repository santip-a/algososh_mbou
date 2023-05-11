import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { StringComponent } from "./string"

jest.setTimeout(999999)
describe("Тестирование алгоритма разворота строки", () => {
  test("Разворачивать с чётным количеством символов", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("input")
    const button = screen.getByTestId("button")
    const string = "1234"

    userEvent.type(input, string)
    userEvent.click(button)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("value").map((el) => el.textContent)
        expect(elements.join("")).toBe(Array(string).reverse().join(""))
      },
      {
        timeout: 1000,
      }
    )
  })

  test("Разворачивать с нечетным количеством символов", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("input")
    const btn = screen.getByTestId("button")
    const testString = "qwert"

    userEvent.type(input, testString)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("value").map((el) => el.textContent)
        expect(elements.join("")).toBe(Array(testString).reverse().join(""))
      },
      {
        timeout: 1000,
      }
    )
  })

  test("Разворачивать с одним символом", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("input")
    const btn = screen.getByTestId("button")
    const testString = "1"

    userEvent.type(input, testString)
    userEvent.click(btn)
    await waitFor(
      () => {
        const elements = screen.getAllByTestId("value").map((el) => el.textContent)
        expect(elements.join("")).toBe(Array(testString).reverse().join(""))
      },
      {
        timeout: 1000,
      }
    )
  })

  test("Разворачивать пустую строку", async () => {
    render(
      <BrowserRouter>
        <StringComponent />
      </BrowserRouter>
    )
    const input = screen.getByTestId("input")
    const btn = screen.getByTestId("button")
    const testString = " "

    userEvent.type(input, testString)
    userEvent.click(btn)
    expect(btn).toBeDisabled()
  })

})