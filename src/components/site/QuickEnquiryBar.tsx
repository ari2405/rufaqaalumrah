import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { DURATION_BANDS } from "@/lib/content";

const field =
  "w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Quick package finder. The selections are carried into the packages page as
 * URL search parameters, so the filtered results are shareable and bookmarkable.
 */
export function QuickEnquiryBar({
  cities,
  categories,
}: {
  cities: string[];
  categories: string[];
}) {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [type, setType] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void navigate({ to: "/packages", search: { city, duration, type } });
      }}
      className="grid gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur sm:grid-cols-2 lg:grid-cols-4"
      aria-label="Find an Umrah package"
    >
      <label className="text-sm">
        <span className="mb-1.5 block font-medium text-foreground">Departure city</span>
        <select className={field} value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Any city</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1.5 block font-medium text-foreground">Duration</span>
        <select className={field} value={duration} onChange={(e) => setDuration(e.target.value)}>
          <option value="">Any duration</option>
          {DURATION_BANDS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1.5 block font-medium text-foreground">Package type</span>
        <select className={field} value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Any type</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Search className="size-4" aria-hidden="true" />
          Find packages
        </button>
      </div>
    </form>
  );
}
