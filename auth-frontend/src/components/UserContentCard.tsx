import type { ProtectedMessageResponse } from "../types/auth";

interface UserContentCardProps {
  data: ProtectedMessageResponse;
}

export function UserContentCard({ data }: UserContentCardProps) {
  return (
    <section className="border border-zinc-800 bg-zinc-900 rounded p-4">
      <h2 className="font-semibold">User Content Card</h2>
      <p className="text-sm mt-2 text-zinc-300">{data.message}</p>
    </section>
  );
}
