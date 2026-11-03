import { pageMetadata } from "@/lib/pages";
import EventFrame from "./EventFrame";

export const metadata = pageMetadata("/events");

/* The Events page lives in the normal app shell (sidebar + topbar). The game itself is the
   self-contained build in public/sleigh-the-yield.html, shown here in embed mode. */
export default function Events() {
  return (
    <div className="pg-events">
      <EventFrame />
    </div>
  );
}
