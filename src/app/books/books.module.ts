import { Module } from "../../core/decorators/module";
import { BooksController } from "./books.controller";


@Module(
	{
		controllers: [BooksController],
		providers: [],
	}
)
export class BooksModule {}
