"use client";
import { useState, useEffect } from "react";
import { SettingsModal } from "../modals/SettingsModal";
import { CoverImageModal } from "../modals/CoverImageModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
