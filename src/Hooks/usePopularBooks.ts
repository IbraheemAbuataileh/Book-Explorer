import { useQuery } from "@tanstack/react-query";
import HomeData from "../services/HomeData";

export const usePopularBooks = (page: number) =>
  useQuery({
    queryKey: ["popularBooks", page],
    queryFn: () => HomeData.getPopularBooks(page),
    placeholderData: (previousData) => previousData,
  });
