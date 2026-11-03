import "./styles.css";
import { pageMetadata } from "@/lib/pages";
import { EventBanner } from "@/components/EventsPromo";
import { LIVE_EVENT } from "@/lib/events";

export const metadata = pageMetadata("/events");

export default function Events() {
  return (
    <div className="pg-events">
      <div className="opp-head rv" style={{ marginBottom: 24 }}>
        <div>
          <h1>Events</h1>
          <p style={{ color: "var(--text)", margin: 0, fontSize: 13 }}>
            Seasonal games that teach how Yuzu works. Play, get it right, earn Juice.
          </p>
        </div>
      </div>

      <section className="ev-live rv" aria-labelledby="evLiveH">
        <div className="ev-live-head">
          <h2 id="evLiveH">Live now</h2>
          <span className="ev-live-dot">Live</span>
        </div>
        <EventBanner />
        <div className="ev-live-row">
          <div>
            <b>{LIVE_EVENT.title}</b>
            <p>{LIVE_EVENT.summary} Hold $100 in any Yuzu product to unlock the rooms.</p>
          </div>
          <a className="btn btn-accent" href={LIVE_EVENT.href}>Open the event</a>
        </div>
      </section>
    </div>
  );
}
