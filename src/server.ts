// implementation target file
import "reflect-metadata"
import {AppModule} from "./app/app.module";
import {createApp} from "./core/app";

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

const app = createApp(AppModule);

const port = 8081;

app.listen(port, () => console.log(`Mini-Nest listening on http://localhost:${port}`));
