import type { GuStackProps } from "@guardian/cdk/lib/constructs/core";
import { GuStack } from "@guardian/cdk/lib/constructs/core";
import type { App } from "aws-cdk-lib";
import { Compatibility, ContainerImage, CpuArchitecture, OperatingSystemFamily, TaskDefinition, Cluster, FargateService } from "aws-cdk-lib/aws-ecs";

export class InteractiveTilemaker extends GuStack {
  constructor(scope: App, id: string, props: GuStackProps) {
    super(scope, id, props);

    const cluster = new Cluster(this, "TileMakerCluster");

    const task = new TaskDefinition(this, "TileMakerTask", {
      compatibility: Compatibility.FARGATE,
      runtimePlatform: {
        operatingSystemFamily: OperatingSystemFamily.LINUX,
        cpuArchitecture: CpuArchitecture.X86_64
      },
      cpu: (1 * 1024).toString(),
      memoryMiB: (2 * 1024).toString()
    });


    task.addContainer('HelloWorldContainer', {
      image: ContainerImage.fromRegistry("docker/hello-world"),
      memoryLimitMiB: 2048,
    });

    const service = new FargateService(this, "TileMakerService", {
      cluster,
      taskDefinition: task,
    })
  }
}
