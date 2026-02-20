import { Router as ExpressRouter } from "express";

export class Router {
	private routes: { method: string; path: string; handler: Function }[] = [];

	public registerRoute(method: string, path: string, handler: Function) {
		this.routes.push({ method, path, handler });
	}

	public applyRoutes(router: ExpressRouter) {
		console.log('routes', this.routes);
		this.routes.forEach((route) => {
			(router as any)[route.method](route.path, async (req: any, res: any) => {
				try {
					console.log('route', route.path);
					const result = await route.handler(req, res);
					if (!res.headersSent) {
						res.json(result);
					}
				} catch (error) {
					console.error(`Error handling ${route.method.toUpperCase()} ${route.path}:`, error);
					if (!res.headersSent) {
						res.status(500).json({ error: "Internal Server Error" });
					}
				}
			});
		});
	}
}

