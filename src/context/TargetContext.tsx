"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Target {
  icNumber: string;
  fullName: string;
  age: number;
  birthDate: string;
  currentAddress: string;
}

interface TargetContextType {
  addedTargets: Target[];
  addTarget: (target: Target) => void;
}

const TargetContext = createContext<TargetContextType | undefined>(undefined);

export const useTargetContext = () => {
  const context = useContext(TargetContext);
  if (!context)
    throw new Error("useTargetContext must be used within a TargetProvider");
  return context;
};

export const TargetProvider = ({ children }: { children: ReactNode }) => {
  const [addedTargets, setAddedTargets] = useState<Target[]>([]);

  const addTarget = (target: Target) => {
    setAddedTargets((prev) => [...prev, target]);
  };

  return (
    <TargetContext.Provider value={{ addedTargets, addTarget }}>
      {children}
    </TargetContext.Provider>
  );
};

// Test cases (for development or testing purposes)
if (require?.main === module) {
  const log = console.log;
  const mockTarget: Target = {
    icNumber: "890101014321",
    fullName: "John Doe",
    age: 35,
    birthDate: "1989-01-01",
    currentAddress: "123 Main Street",
  };

  const MockProvider = () => {
    const { addedTargets, addTarget } = useTargetContext();
    React.useEffect(() => {
      addTarget(mockTarget);
      log("Targets after add:", addedTargets);
    }, []);
    return null;
  };

  // Note: In practice this test would be done via unit test framework like Jest or React Testing Library
}
