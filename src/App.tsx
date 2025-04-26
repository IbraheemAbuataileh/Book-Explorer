import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetails from "./components/BookDetails";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FavoriteBooks from "./components/FavoriteBooks";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-300">
        <Navbar />
        <main className="p-6 text-gray-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<BookDetails />} />
            <Route path="/FavoriteBooks" element={<FavoriteBooks />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
