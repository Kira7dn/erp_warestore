"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebounce } from "use-debounce";
import { cn } from "@/lib/utils";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [hover, setHover] = useState(false);
  const [typing, setTyping] = useState(false);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<[]>([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);
  const isExpand = hover || query || typing;

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(
          path.replace(searchParams.toString(), "")
        );
      }

      // const files = await getFiles({
      //   types: [],
      //   searchText: debouncedQuery,
      // });
      // setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${
        file.type === "video" || file.type === "audio"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };

  return (
    <div className="relative w-full md:max-w-[480px] ">
      <div
        className={cn(
          "flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-drop-3 transition-all duration-700 ease-in-out pl-4 pr-2 bg-white",
          isExpand ? "w-full" : "w-1/3"
        )}
      >
        <Input
          value={query}
          placeholder="Search..."
          className="w-full placeholder:body-1 border-none p-0 shadow-none placeholder:text-light-200 outline-none ring-offset-transparent focus:ring-transparent focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
        />
        <div
          className={cn(
            "rounded-full px-1 transition-all duration-700 ease-in-out"
          )}
        >
          <SearchIcon
            className={cn(
              "w-4 h-4 transition-all duration-700 ease-in-out",
              isExpand ? "scale-125 text-primary" : ""
            )}
          />
        </div>

        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    {/* <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    /> */}
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="body-2 text-center text-light-100">
                No files found
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
