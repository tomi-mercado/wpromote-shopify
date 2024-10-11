"use client";

import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SearchButton() {
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex justify-end w-52 h-10">
      <AnimatePresence>
        {isExpanded ? (
          <motion.form
            key="form"
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-y-0 right-0"
            action={(formData) => {
              router.push(`/search?q=${formData.get("q")}`);
            }}
          >
            <div className="relative w-full h-full">
              <Input
                className="w-full h-full pl-3 pr-10 rounded-full"
                placeholder="Search..."
                autoFocus
                aria-label="Search"
                name="q"
              />
              <button
                className="size-9 text-button-primary-foreground bg-primary hover:bg-button-primary-hover active:bg-button-primary-active absolute right-0 top-0 h-full flex rounded-full items-center justify-center rounded-l-none"
                type="submit"
                aria-label="Do the search"
              >
                <motion.div
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  exit={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SendHorizonal className="size-4" />
                </motion.div>
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="button"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 top-0"
          >
            <button
              className="size-10 text-button-primary-foreground bg-transparent hover:bg-button-primary-hover active:bg-button-primary-active rounded-full flex items-center justify-center border border-primary"
              onClick={() => setIsExpanded(true)}
              aria-label="Open search"
            >
              <Search className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
