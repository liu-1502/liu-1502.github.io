"use client";

import { useEffect } from "react";

export default function BridgeClient() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];

    const CHAIN_IMG: Record<string, string> = {
      "Plasma": "/assets/chains/plasma.svg",
      "Monad": "/assets/chains/monad.svg",
      "Ethereum": "/assets/chains/ethereum.svg",
    };
    function chainIcon(name: string) {
      if (CHAIN_IMG[name]) return '<img src="' + CHAIN_IMG[name] + '" alt="">';
      return '<i class="ch-l">' + name.charAt(0) + "</i>";
    }

    function makeSel(id: string, list: string[], initial: string) {
      const root = document.getElementById(id) as (HTMLElement & { onpick?: () => void }) | null;
      if (!root) return null;
      const btn = root.querySelector(".chain-btn") as HTMLButtonElement;
      const menu = root.querySelector(".chain-menu") as HTMLElement;
      let val = initial;
      function render() {
        btn.innerHTML = chainIcon(val) + "<span>" + val + '</span><b class="caret">&#9662;</b>';
        menu.innerHTML = list.map(function (c) {
          return '<button type="button" role="option"' + (c === val ? ' class="on"' : "") + ' data-c="' + c + '">' + chainIcon(c) + "<span>" + c + "</span></button>";
        }).join("");
      }
      const onBtnClick = function (e: MouseEvent) {
        e.stopPropagation();
        document.querySelectorAll(".chx.open").forEach(function (x) { if (x !== root) x.classList.remove("open"); });
        const open = root!.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      btn.addEventListener("click", onBtnClick);
      cleanups.push(() => btn.removeEventListener("click", onBtnClick));

      const onMenuClick = function (e: MouseEvent) {
        const b = (e.target as HTMLElement).closest("[data-c]");
        if (!b) return;
        val = b.getAttribute("data-c") as string;
        render();
        root!.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        if (root!.onpick) root!.onpick();
      };
      menu.addEventListener("click", onMenuClick);
      cleanups.push(() => menu.removeEventListener("click", onMenuClick));

      const onDocClick = function () {
        root!.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      };
      document.addEventListener("click", onDocClick);
      cleanups.push(() => document.removeEventListener("click", onDocClick));

      render();
      return {
        root: root,
        get: function () { return val; },
        set: function (v: string) { val = v; render(); },
        setList: function (l: string[]) {
          list = l;
          if (list.indexOf(val) < 0) val = list[0];
          render();
        },
      };
    }

    const LANES: Record<string, string[]> = {
      syzusd: ["Plasma", "Monad", "Ethereum", "HyperEVM", "Sei", "Pharos"],
      yzprime: ["Monad", "Ethereum"],
    };
    const IMG: Record<string, string> = { syzusd: "/assets/tokens/syzUSD.svg", yzprime: "/assets/tokens/yzPrime.svg" };
    const NAME: Record<string, string> = { syzusd: "syzUSD", yzprime: "yzPrime" };

    const from = makeSel("fromChain", LANES.syzusd.slice(), "Plasma");
    const to = makeSel("toChain", LANES.syzusd.slice(), "Monad");
    if (!from || !to) return () => { cleanups.forEach((fn) => fn()); };

    /* picking the same chain on both sides nudges the other one */
    function dedupe(changed: NonNullable<typeof from>, other: NonNullable<typeof to>, lanes: string[]) {
      if (changed.get() !== other.get()) return;
      const i = lanes.indexOf(changed.get());
      other.set(lanes[(i + 1) % lanes.length]);
    }
    let curLanes = LANES.syzusd.slice();
    from.root.onpick = function () { dedupe(from, to, curLanes); };
    to.root.onpick = function () { dedupe(to, from, curLanes); };

    const flipEl = document.getElementById("flipChains");
    const onFlip = function () {
      const a = from.get(); from.set(to.get()); to.set(a);
    };
    if (flipEl) {
      flipEl.addEventListener("click", onFlip);
      cleanups.push(() => flipEl.removeEventListener("click", onFlip));
    }

    const tokenSelectEl = document.getElementById("tokenSelect");
    const onTokenSelect = function (this: HTMLElement, e: MouseEvent) {
      const b = (e.target as HTMLElement).closest("button");
      if (!b || !b.getAttribute("data-token")) return;
      this.querySelectorAll("button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      const t = b.getAttribute("data-token") as string;
      curLanes = LANES[t].slice();
      from.setList(curLanes);
      to.setList(curLanes);
      dedupe(from, to, curLanes);
      ["sendToken", "recvToken"].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<img src="' + IMG[t] + '" alt="">' + NAME[t];
      });
    };
    if (tokenSelectEl) {
      tokenSelectEl.addEventListener("click", onTokenSelect);
      cleanups.push(() => tokenSelectEl.removeEventListener("click", onTokenSelect));
    }

    return () => { cleanups.forEach((fn) => fn()); };
  }, []);

  return null;
}
