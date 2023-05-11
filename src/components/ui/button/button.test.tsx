// import renderer from "react-test-renderer";
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

const renderer = require('react-test-renderer');

describe("Рендер кнопки", () => {
  test('Рендер кнопки с текстом', () => {
    const tree = renderer.create(<Button text="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер кнопки без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер заблокированной кнопки', () => {
    const tree = renderer.create(<Button text="test" disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Кнопка с лоадером', () => {
    const tree = renderer.create(<Button isLoader />).toJSON()
    expect(tree).toMatchSnapshot();
  });

  test('Нажатие кнопки', () => {
    const onClick = jest.fn();
    render(<Button text="test" onClick={onClick} />);
    const button = screen.getByText("test");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
})