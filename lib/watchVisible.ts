/**
 * Scroll-based visibility watcher — port từ watchVisible() trong app.js gốc.
 * Gọi `cb(el)` một lần cho mỗi phần tử khi nó lọt vào viewport (hoặc đã cuộn qua),
 * rồi tự gỡ listener khi tất cả đã kích hoạt.
 *
 * Trả về hàm teardown để caller chủ động dọn (dùng trong cleanup của useEffect).
 * Dùng chung cho reveal-on-scroll / count-up (YuzuClient) và reveal thanh backing
 * (TransparencyClient) — thay cho biến global window.yuzuWatch của bản gốc.
 */
export function watchVisible(
  els: NodeListOf<Element> | Element[],
  cb: (el: Element) => void,
  margin = 60
): () => void {
  const pending: Element[] = [];
  els.forEach((el) => pending.push(el));
  if (!pending.length) return () => {};

  let ticking = false;

  const teardown = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    clearInterval(poll);
  };

  const run = () => {
    ticking = false;
    for (let i = pending.length - 1; i >= 0; i--) {
      const el = pending[i];
      if (el.getBoundingClientRect().top < window.innerHeight - margin) {
        pending.splice(i, 1);
        cb(el);
      }
    }
    if (!pending.length) teardown();
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    setTimeout(run, 40);
  };

  const poll = setInterval(run, 350);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  run();

  return teardown;
}
