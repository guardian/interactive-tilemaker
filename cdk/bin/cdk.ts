import "source-map-support/register";
import { App } from "aws-cdk-lib";
import { InteractiveTilemaker } from "../lib/interactive-tilemaker";

const app = new App();
new InteractiveTilemaker(app, "InteractiveTilemaker-PROD", { stack: "interactives", stage: "PROD" });
