// src/lib/finish-context.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface FinishContextType {
  selectedFinishName: string;
  setSelectedFinishName: (name: string) => void;
}

const FinishContext = createContext<FinishContextType>({
  selectedFinishName: "",
  setSelectedFinishName: () => {},
});

export function FinishProvider({ children }: { children: React.ReactNode }) {
  const [selectedFinishName, setSelectedFinishName] = useState("");
  return (
    <FinishContext.Provider value={{ selectedFinishName, setSelectedFinishName }}>
      {children}
    </FinishContext.Provider>
  );
}

export function useFinish() {
  return useContext(FinishContext);
}
