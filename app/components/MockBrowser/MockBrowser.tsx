import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function MockBrowser({ children }: Props) {
  return (
    <div className="relative h-64 overflow-hidden rounded-lg bg-white shadow-xl">
      <div className="flex h-6 items-center space-x-2 rounded-t-lg bg-stone-300 px-2">
        <div className="h-3 w-3 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>

      {children}
    </div>
  );
}
