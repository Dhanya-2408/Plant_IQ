import React from "react";
import { useTheme } from "@/context/theme-provider";
import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";
import { ThemeToggle } from "./theme-toggle";

export const Header: React.FC = () => {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <img
            src={theme === "dark" ? "/logo_dark.png" : "/logo_light.png"}
            alt="Plant_IQ logo"
            className="h-16"
          />
        </Link>
        <div className="flex gap-4">
          <CitySearch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
