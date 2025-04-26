import { useQuery } from "@tanstack/react-query";
import HomeData from "../services/HomeData";

export const useSearchBooks = (query: string) => {
  return useQuery({
    queryKey: ["searchBooks", query],
    queryFn: () => HomeData.searchBooks(query),
    enabled: !!query,
  });
};
