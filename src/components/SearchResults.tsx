import { useSearchBooks } from "../Hooks/useSearchBooks";
import { useLocation, useNavigate } from "react-router-dom";
import PaginationButtons from "./PaginationButtons";

function useQueryParam() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchResults() {
  const queryParam = useQueryParam();
  const query = queryParam.get("q") || "";
  const { data, isLoading, error } = useSearchBooks(query);
  const navigate = useNavigate();
  const isArabic = (text: string) => /[\u0600-\u06FF]/.test(text);

  if (!query) {
    return (
      <div className="text-center mt-8 text-gray-500">
        Please enter a search query.
      </div>
    );
  }

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error || !data?.data)
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading results.
      </div>
    );

  const books = data.data.items || [];

  if (books.length === 0) {
    return (
      <div className="text-center mt-8 text-gray-500">
        No results found for "{query}".
      </div>
    );
  }

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Search Results for "{query}"
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book: any, index: number) => {
            const info = book.volumeInfo;
            const id = book.id;
            const imageUrl =
              info.imageLinks?.thumbnail ||
              "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80";

            return (
              <div
                key={index}
                className="flex bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <img
                  src={imageUrl}
                  alt={info.title}
                  className="w-32 object-cover object-center"
                />
                <div className="p-4 flex flex-col justify-between w-full">
                  <h3
                    className={`text-lg font-semibold mt-1 ${
                      isArabic(info.title) ? "text-right" : "text-left"
                    } text-gray-800 dark:text-white`}
                  >
                    {info.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isArabic(info.authors) ? "text-right" : "text-left"
                    } text-gray-600 dark:text-gray-300`}
                  >
                    {info.authors?.join(", ")}
                  </p>
                  <div className="mt-5 flex items-center justify-center">
                    <button
                      className="bg-[#052b58] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100px]"
                      onClick={() => navigate(`/details/${id}`)}
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
