const getBooksData = "https://www.googleapis.com/books/v1/volumes";

class HomeData {
  async getPopularBooks(page: number) {
    debugger;
    try {
      console.log("page", page);
      const response = await fetch(
        `${getBooksData}?q=SEARCH_TERM/page=${page}`
      );
      debugger;
      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: "Failed to fetch books." };
    }
  }
  async getBookDetails(id: string) {
    try {
      const response = await fetch(`${getBooksData}/${id}`);
      const data = await response.json();
      return { data, error: null };
    } catch {
      return { data: null, error: "Failed to fetch book details." };
    }
  }

  async searchBooks(query: string) {
    try {
      const response = await fetch(
        `${getBooksData}?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      return { data, error: null };
    } catch {
      return { data: null, error: "Failed to fetch search results." };
    }
  }
}

export default new HomeData();
