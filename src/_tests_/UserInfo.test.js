import ReactDom from "react-dom";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(() => {
  cleanup();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<button></button>, div);
});

it("renders button correctly", () => {
  const { getByTestId } = render(<button>Go Back</button>);
  expect(getByTestId("test1")).toHaveTextContent("Go Back");
});

it("matches shapshot", () => {
  const tree = renderer.create(<button>Go Back</button>).toJSON();
  expect(tree).toMatchSnapshot();
});

it("matches shapshot", () => {
  const tree = renderer.create(<button>xxx</button>).toJSON();
  expect(tree).toMatchSnapshot();
});
