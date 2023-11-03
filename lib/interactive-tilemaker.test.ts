import { App } from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { InteractiveTilemaker } from "./interactive-tilemaker";

describe("The InteractiveTilemaker stack", () => {
  it("matches the snapshot", () => {
    const app = new App();
    const stack = new InteractiveTilemaker(app, "InteractiveTilemaker", { stack: "interactives", stage: "TEST" });
    const template = Template.fromStack(stack);
    expect(template.toJSON()).toMatchSnapshot();
  });
});
