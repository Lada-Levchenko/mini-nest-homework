import { container } from "../container";


export function Controller(prefix: string = "") {
	return function (target: any) {
		Reflect.defineMetadata("prefix", prefix, target);
		if (!Reflect.hasMetadata("routes", target)) {
			Reflect.defineMetadata("routes", [], target);
		}

		container.bind(target).toSelf().inSingletonScope();
		console.log('Controller initialized', target);
	};
}
