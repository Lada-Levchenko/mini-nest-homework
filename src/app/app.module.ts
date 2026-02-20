import { Module } from "../core/decorators/module";
import { BooksModule } from "./books/books.module";

@Module({
  imports: [BooksModule],
})
export class AppModule {}
