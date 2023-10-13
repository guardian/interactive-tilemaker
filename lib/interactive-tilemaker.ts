import type { GuStackProps } from '@guardian/cdk/lib/constructs/core';
import { GuStack } from '@guardian/cdk/lib/constructs/core';
import { GuVpc, SubnetType } from '@guardian/cdk/lib/constructs/ec2';
import type { App } from 'aws-cdk-lib';
import {
	Cluster,
	Compatibility,
	ContainerImage,
	CpuArchitecture,
	FargateService,
	OperatingSystemFamily,
	TaskDefinition,
} from 'aws-cdk-lib/aws-ecs';

export class InteractiveTilemaker extends GuStack {
	constructor(scope: App, id: string, props: GuStackProps) {
		super(scope, id, props);

		const privateSubnets = GuVpc.subnetsFromParameter(this, {
			type: SubnetType.PRIVATE,
		});

		const vpc = GuVpc.fromIdParameter(this, 'vpc', {
			/*
      CDK wants privateSubnetIds to be a multiple of availabilityZones.
      We're pulling the subnets from a parameter at runtime.
      We know they evaluate to 3 subnets, but at compile time CDK doesn't.
      Set the number of AZs to 1 to avoid the error:
        `Error: Number of privateSubnetIds (1) must be a multiple of availability zones (2).`
       */
			availabilityZones: ['ignored'],
			privateSubnetIds: privateSubnets.map((subnet) => subnet.subnetId),
		});

		const cluster = new Cluster(this, 'TileMakerCluster', { vpc });

		const task = new TaskDefinition(this, 'TileMakerTask', {
			compatibility: Compatibility.FARGATE,
			runtimePlatform: {
				operatingSystemFamily: OperatingSystemFamily.LINUX,
				cpuArchitecture: CpuArchitecture.X86_64,
			},
			cpu: (1 * 1024).toString(),
			memoryMiB: (2 * 1024).toString(),
		});

		task.addContainer('HelloWorldContainer', {
			image: ContainerImage.fromRegistry('hello-world'),
			memoryLimitMiB: 2048,
		});

		new FargateService(this, 'TileMakerService', {
			cluster,
			taskDefinition: task,
		});
	}
}
