
import { Container } from "inversify";
import { container as rootContainer	} from "../container";

export function Module(metadata: { controllers?: any[]; providers?: any[], imports?: any[], exports?: any[] }) {
	return function (target: any) {
		
		Reflect.defineMetadata("controllers", metadata.controllers || [], target);
		Reflect.defineMetadata("providers", metadata.providers || [], target);
		Reflect.defineMetadata("imports", metadata.imports || [], target);
		Reflect.defineMetadata("exports", metadata.exports || [], target);

		const container = new Container();
		(metadata.controllers || []).forEach((controllers) => {
			container.bind(controllers).toSelf().inSingletonScope();
		});
		(metadata.providers || []).forEach((provider) => {
			container.bind(provider).toSelf().inSingletonScope();
		});
		(metadata.imports || []).forEach((importedModule) => {
			rootContainer.bind(importedModule).toSelf().inSingletonScope();
		});
		(metadata.imports || []).forEach((imports) => {
			container.bind(imports).toSelf().inSingletonScope();
		});
		
		if (metadata.exports) {
			metadata.exports.forEach((exportedProvider) => {
				container.bind(exportedProvider).toSelf().inSingletonScope();
			});
		}

		Reflect.defineMetadata("container", container, target);
		console.log('Module initialized', target);
	};
}
