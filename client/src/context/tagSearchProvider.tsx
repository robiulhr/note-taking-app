import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

type contextValueType = {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
};

export const TagSearchContext = createContext<contextValueType | null>(null);

export default function TagSearchProvider({ children }: { children: ReactNode }) {
  const [searchValue, setSearchValue] = useState("");
  return <TagSearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</TagSearchContext.Provider>;
}
