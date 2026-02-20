export function Inject(identifier: string) {
	return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
		const existingInjectedParameters: { [key: number]: string } =
			Reflect.getOwnMetadata("injectedParameters", target) || {};

		existingInjectedParameters[parameterIndex] = identifier;
		Reflect.defineMetadata("injectedParameters", existingInjectedParameters, target);
	};
}
