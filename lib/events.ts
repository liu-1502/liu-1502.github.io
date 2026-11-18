/* Events data, shared by the Dashboard promo, the sidebar and the Events page. */

/** The live event shown on the Dashboard banner and the launch popup. */
export const LIVE_EVENT = {
  id: "sleigh-the-yield",
  title: "Sleigh the Yield",
  summary: "Three rooms, about five minutes. Up to 5,000 Juice for a clean run.",
  /** Where the banner, popup and sidebar take you: the Events page inside the app. */
  href: "/events",
  /** The game itself is a self-contained build in public/, embedded by app/events. */
  embed: `/sleigh-the-yield.html?embed=1&v=${process.env.NEXT_PUBLIC_BUILD ?? "dev"}#/events/advent-2026`,
  banner: "/assets/events/sleigh-the-yield-banner.webp",
  popup: "/assets/events/sleigh-the-yield-popup.webp",
};

/** Events shown as tabs in the app top bar. Ids match the build's #/events/<id> routes. */
export const EVENT_TABS = [
  { id: "advent-2026", label: "Advent" },
  { id: "christmas-2026", label: "Christmas" },
] as const;

/** Fired on document by EventFrame whenever the event open in the build changes ({ detail: { id } }). */
export const EVENT_CHANGE = "yuzu-event-change";

/** Advent of Yield, as promoted on the Dashboard (banner + launch popup are drawn in code, not artwork files). */
export const ADVENT_PROMO = {
  title: "Advent of Yield",
  bannerSummary: "One door a day until Christmas. Answer its question right and the Juice behind it is yours.",
  cta: "Open today's door",
  href: "/events",
  illus: "/assets/events/hero-advent.png",
};

/** Which event the Dashboard banner and launch popup promote.
    "christmas" brings the Sleigh the Yield artwork (LIVE_EVENT.banner / .popup) back; it is hidden for now. */
export const PROMO_EVENT: "advent" | "christmas" = "advent";
