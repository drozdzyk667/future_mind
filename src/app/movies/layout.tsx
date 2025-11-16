import { SearchForm } from "@/components/SearchForm/SearchForm";
import { UIProvider } from "@/lib/UITransitionContext";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative max-w-6xl mx-auto md:p-10 sm:p-6 p-4">
      <UIProvider>
        <SearchForm />
        {children}
      </UIProvider>
    </div>
  );
}
