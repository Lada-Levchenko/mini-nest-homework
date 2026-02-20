import { Controller } from "../../core/decorators/controller";
import { Get } from "../../core/decorators/routes";

@Controller("/books")
export class BooksController {
	@Get("/")
	getAllBooks() {
		return [
			{ id: 1, title: "Book 1", author: "Author 1" },
			{ id: 2, title: "Book 2", author: "Author 2" },
		];
	}
}
