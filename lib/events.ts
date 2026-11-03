/* Events data, shared by the Dashboard promo, the sidebar and the Events page. */

/** The live event shown on the Dashboard banner and the launch popup. */
export const LIVE_EVENT = {
  id: "sleigh-the-yield",
  title: "Sleigh the Yield",
  summary: "Three rooms, about five minutes. Up to 5,000 Juice for a clean run.",
  /** Where the banner, popup and sidebar take you: the Events page inside the app. */
  href: "/events",
  /** The game itself is a self-contained build in public/, embedded by app/events. */
  embed: "/sleigh-the-yield.html?embed=1#/events/christmas-2026",
  banner: "/assets/events/sleigh-the-yield-banner.webp",
  popup: "/assets/events/sleigh-the-yield-popup.webp",
};
