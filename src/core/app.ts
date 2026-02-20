import express from 'express';
import {container} from './container';
import { Router } from './router';

export function createApp(rootModule: any) {
	const app = express();
	const router = express.Router();
	const appRouter = new Router();
	container.bind(rootModule).toSelf().inSingletonScope();
	resolveModules(rootModule, appRouter);
	
	appRouter.applyRoutes(router);
	app.use(router);
	
	return app;
}

function resolveControllers(module: any, appRouter: Router) {
	const moduleContainer = Reflect.getMetadata("container", module);
	const controllers = Reflect.getMetadata("controllers", module) || [];
	controllers.forEach((controller: any) => {
		const instance = moduleContainer.get(controller) as InstanceType<typeof controller>;
		const prefix = Reflect.getMetadata("prefix", controller);
		const routes = Reflect.getMetadata("routes", controller) || [];
		routes.forEach((route: any) => {
			appRouter.registerRoute(route.method, prefix + route.path, instance[route.handler.name].bind(instance));
		});
	});
}

function resolveModules(module: any, appRouter: Router) {
	const imports = Reflect.getMetadata("imports", module) || [];
	imports.forEach((importedModule: any) => {
		resolveModules(importedModule, appRouter);
	});
	resolveControllers(module, appRouter);
}	
