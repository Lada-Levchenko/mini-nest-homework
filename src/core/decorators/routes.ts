
function createRouteDecorator(method: string) {
	return function (path: string) {
		return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
			if (!Reflect.hasMetadata("routes", target.constructor)) {
				Reflect.defineMetadata("routes", [], target.constructor);
			}
			const routes = Reflect.getMetadata("routes", target.constructor);
			routes.push({ method, path, handler: descriptor.value });
			Reflect.defineMetadata("routes", routes, target.constructor);
		}	;
	};
}

export const Get = createRouteDecorator("get");
export const Post = createRouteDecorator("post");
export const Put = createRouteDecorator("put");
export const Patch = createRouteDecorator("patch");
export const Delete = createRouteDecorator("delete");	
