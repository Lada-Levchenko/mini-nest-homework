import { container } from "../container";

export function Injectable(identifier: string) {
	return function (target: any) {
		container.bind(identifier).to(target).inSingletonScope();;
	};
}


