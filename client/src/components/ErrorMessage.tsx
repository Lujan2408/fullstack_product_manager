import type { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="text-center bg-red-600 text-white p-3 uppercase font-bold mt-10">{children}</div>
  ) 
}
