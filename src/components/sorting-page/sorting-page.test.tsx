import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom"
import { SortingPage } from "./sorting-page"

jest.setTimeout(60000)
describe("Тест сортировки выбором и пузырьком", () => {
  test("сортировка выбором пустой массив", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-selection")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe(""), {
      timeout: 1000,
    })
  })

  test("сортировка пузырьком пустой массив", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-bubble")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe(""), {
      timeout: 1000,
    })
  })

  test("сортировка выбором массив из одного элемента по возрастанию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[1]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const radioSelection = screen.getByTestId("radio-selection")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("1"), {
      timeout: 1000,
    })
  })

  test("сортировка выбором массив из одного элемента по убыванию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[1]}/>
      </BrowserRouter>
    )
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-selection")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("1"), {
      timeout: 1000,
    })
  })

  test("сортировка пузырьком массив из одного элемента по возрастанию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[1]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const radioSelection = screen.getByTestId("radio-bubble")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("1"), {
      timeout: 1000,
    })
  })

  test("сортировка пузырьком массив из одного элемента по убыванию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[1]}/>
      </BrowserRouter>
    )
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-bubble")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("1"), {
      timeout: 1000,
    })
  })

  test("сортировка выбором массив из нескольких элементов по возростанию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[4, 0, 8, 3]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const radioSelection = screen.getByTestId("radio-selection")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("0348"), {
      timeout: 6000,
    })
  })

  test("сортировка выбором массив из нескольких элементов по убыванию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[4, 0, 8, 3]}/>
      </BrowserRouter>
    )
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-selection")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("8430"), {
      timeout: 6000,
    })
  })

  test("сортировка пузырьком массив из нескольких элементов по возростанию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[4, 0, 8, 3]}/>
      </BrowserRouter>
    )
    const buttonSortUp = screen.getByTestId("button-sort-up")
    const radioSelection = screen.getByTestId("radio-bubble")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortUp)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("0348"), {
      timeout: 6000,
    })
  })

  test("сортировка пузырьком массив из нескольких элементов по убыванию", async () => {
    render(
      <BrowserRouter>
        <SortingPage initArray={[4, 0, 8, 3]}/>
      </BrowserRouter>
    )
    const buttonSortDown = screen.getByTestId("button-sort-down")
    const radioSelection = screen.getByTestId("radio-bubble")

    userEvent.click(radioSelection)
    userEvent.click(buttonSortDown)
    await waitFor(() => expect(screen.getByTestId("column-elem").textContent).toBe("8430"), {
      timeout: 6000,
    })
  })


})

