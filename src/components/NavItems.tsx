"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import React, { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const NavItems = () => {
  const [activeIndex, setactiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setactiveIndex(null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setactiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setactiveIndex(null);
          } else {
            setactiveIndex(i);
          }
        };

        const isOpen = i === activeIndex;

        return (
          <NavItem
            key={category.label}
            category={category}
            isOpen={isOpen}
            handleOpen={handleOpen}
            isAnyOpen={isAnyOpen}
            close={close}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
