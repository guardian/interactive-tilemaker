import "source-map-support/register";
import { GuRootExperimental } from "@guardian/cdk/lib/experimental/constructs/root";
import { InteractiveTilemaker } from "../lib/interactive-tilemaker";

const app = new GuRootExperimental();

new InteractiveTilemaker(app, "InteractiveTilemaker-PROD", { stack: "interactives", stage: "PROD", env: { region: 'eu-west-1' } });
