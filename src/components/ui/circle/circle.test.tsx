// import renderer from "react-test-renderer";
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states'

const renderer = require('react-test-renderer');

describe("Рендер Circle", () => { 
  test('Рендер Circle с текстом', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с текстом', () => {
    const tree = renderer.create(<Circle letter="test" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с head', () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с react-элементом', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с tail', () => {
    const tree = renderer.create(<Circle tail="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с index', () => {
    const tree = renderer.create(<Circle index={2} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с пропом isSmall ===  true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с состоянием default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с состоянием changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Рендер Circle с состоянием modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
})