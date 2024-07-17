"use client";

import { ChevronsLeft, MenuIcon } from "lucide-react";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizing = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    let newwidth = e.clientX;
    if (newwidth < 240) {
      newwidth = 240;
    }
    if (newwidth > 480) {
      newwidth = 480;
    }
    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newwidth}px`;
      navbarRef.current.style.setProperty("left", `${newwidth}px`);
      navbarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newwidth}px)`
      );
    }
  };
  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "240px";

      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 240px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "0" : "240px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
        ref={sidebarRef}
      >
        <div
          role="button "
          className={cn(
            "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="h-6 w-6" />
        </div>
        <div>
          <p>Action Item</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out",
          isMobile && "left-0 w-full"
        )}
        ref={navbarRef}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              className="h-6 w-6 text-muted-foreground"
              role="button"
              onClick={resetWidth}
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
