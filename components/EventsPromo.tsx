"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { ADVENT_PROMO, LIVE_EVENT, PROMO_EVENT } from "@/lib/events";
import "./EventsPromo.css";

const SEEN_KEY = "yz-event-popup-sleigh-the-yield";
const ADVENT = PROMO_EVENT === "advent";

/* Treeline along the bottom of the Advent promo: a snow drift with small pines standing on it, as in the game's hero. */
const TREES: [number, number, number][] = [
  [26, 40, 0.9], [62, 38, 1.15], [138, 33, 0.85], [176, 32, 1.1], [262, 34, 1], [330, 37, 1.2], [366, 38, 0.8],
  [452, 38, 1.05], [512, 36, 0.9], [596, 34, 1.2], [634, 34, 0.85], [716, 36, 1], [786, 38, 1.15], [858, 39, 0.9],
  [902, 38, 1.1], [978, 36, 0.85], [1040, 34, 1.2], [1108, 33, 0.95], [1160, 32, 1.1], [1228, 31, 0.9], [1262, 30, 1.15],
];

function Treeline() {
  /* two layers, both in front of the illustration: the snowy ground hides its base, the pines stand on the ground */
  return (
    <>
      <svg className="adv-promo-trees" viewBox="0 0 1280 64" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {TREES.map(([x, y, s]) => (
          <path key={x} transform={`translate(${x} ${y + 2}) scale(${s})`} fill="#2f7d45"
            d="M0 -30 L8 -19 H4.5 L11 -9.5 H6.5 L14 0 H-14 L-6.5 -9.5 H-11 L-4.5 -19 H-8Z" />
        ))}
      </svg>
      <svg className="adv-promo-ground" viewBox="0 0 1280 64" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        {/* snow drift, as under the tree line on the event page: white at the crest, easing into the sage ground */}
        <defs>
          <linearGradient id="advPromoSnow" gradientUnits="userSpaceOnUse" x1="0" y1="26" x2="0" y2="64">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset=".4" stopColor="#f6faf7" />
            <stop offset=".78" stopColor="#dcebe1" />
            <stop offset="1" stopColor="#c6dccd" />
          </linearGradient>
        </defs>
        <path d="M0 40 Q160 24 320 36 T640 34 T960 38 T1280 30 V64 H0Z" fill="url(#advPromoSnow)" />
        <path d="M0 40 Q160 24 320 36 T640 34 T960 38 T1280 30" fill="none" stroke="#fff" strokeWidth="2" />
      </svg>
    </>
  );
}

/** Dashboard banner. Advent: drawn in code in the event's own style; Christmas: one animated image (1280×300). */
export function EventBanner() {
  if (ADVENT) {
    return (
      <a className="adv-promo adv-promo-banner" href={ADVENT_PROMO.href} aria-label={`${ADVENT_PROMO.title}. ${ADVENT_PROMO.bannerSummary} ${ADVENT_PROMO.cta}.`}>
        <span className="adv-promo-awn" aria-hidden="true" />
        <span className="adv-promo-txt">
          <span className="adv-promo-title">{ADVENT_PROMO.title}</span>
          <span className="adv-promo-sum">{ADVENT_PROMO.bannerSummary}</span>
          <span className="adv-promo-btn">{ADVENT_PROMO.cta}</span>
        </span>
        <img className="adv-promo-illus" src={ADVENT_PROMO.illus} alt="" width={760} height={594} />
        <Treeline />
      </a>
    );
  }
  return (
    <a className="ev-promo-banner" href={LIVE_EVENT.href} aria-label={`${LIVE_EVENT.title}. ${LIVE_EVENT.summary} Unwrap your Juice.`}>
      <img src={LIVE_EVENT.banner} alt="" width={1280} height={300} />
    </a>
  );
}

/** Launch popup: shown once per browser session; it opens the event. */
export function EventPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") return;
    } catch {
      /* storage blocked: still show it */
    }
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  if (!open) return null;
  /* portal to <body>: the page content sits in a transformed container, which would
     otherwise trap the fixed overlay inside the content area instead of the whole screen */
  if (ADVENT) {
    return createPortal(
      <div className="ev-promo-pop adv-promo-ov" onClick={(e) => e.target === e.currentTarget && close()}>
        <div className="adv-promo adv-promo-pop" role="dialog" aria-modal="true" aria-label={ADVENT_PROMO.title}>
          <span className="adv-promo-awn" aria-hidden="true" />
          <div className="adv-promo-txt">
            <h2 className="adv-promo-title">{ADVENT_PROMO.title}</h2>
            <p className="adv-promo-sum">
              25 doors, one question a day. Up to <b>5,000 Juice</b> by Christmas.
            </p>
            <a className="adv-promo-btn" href={ADVENT_PROMO.href} onClick={close}>{ADVENT_PROMO.cta}</a>
          </div>
          <img className="adv-promo-illus" src={ADVENT_PROMO.illus} alt="" width={760} height={594} />
          <Treeline />
          <button type="button" className="adv-promo-x" aria-label="Close" onClick={close}>
            <X />
          </button>
        </div>
      </div>,
      document.body,
    );
  }
  return createPortal(
    <div className="ev-promo-pop" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="ev-promo-pop-in" role="dialog" aria-modal="true" aria-label={LIVE_EVENT.title}>
        <a href={LIVE_EVENT.href} onClick={close} aria-label={`${LIVE_EVENT.title}. ${LIVE_EVENT.summary} Start playing.`}>
          <img src={LIVE_EVENT.popup} alt="" width={760} height={400} />
        </a>
        <button type="button" className="ev-promo-x" aria-label="Close" onClick={close}>
          <X />
        </button>
      </div>
    </div>,
    document.body,
  );
}
