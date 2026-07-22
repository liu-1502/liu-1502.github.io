#!/usr/bin/env node
/**
 * Tách yuzu-source-bundle.txt trở lại thành các file gốc.
 *
 * Cách dùng:
 *   1. Đặt file `yuzu-source-bundle.txt` vào thư mục gốc project (cùng cấp package.json),
 *      hoặc truyền đường dẫn: `node scripts/split-bundle.mjs /duong/dan/toi/yuzu-source-bundle.txt`
 *   2. Chạy: `npm run split`
 *
 * Kết quả:
 *   - legacy-html/<ten>.html   -> 12 trang HTML gốc (nguyên bản, để tham chiếu / convert)
 *   - public/assets/style.css  -> CSS gốc
 *   - public/assets/app.js     -> JS gốc
 *   - styles/yuzu.css          -> bản copy CSS gốc dùng làm global stylesheet cho Next.js
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const candidates = [
  process.argv[2],
  path.join(root, "yuzu-source-bundle.txt"),
  path.join(process.cwd(), "yuzu-source-bundle.txt"),
].filter(Boolean);

const bundlePath = candidates.find((p) => fs.existsSync(p));
if (!bundlePath) {
  console.error(
    "\n✗ Không tìm thấy yuzu-source-bundle.txt.\n" +
      "  Đặt file vào thư mục gốc project rồi chạy lại, hoặc:\n" +
      "  node scripts/split-bundle.mjs /duong/dan/yuzu-source-bundle.txt\n"
  );
  process.exit(1);
}

const raw = fs.readFileSync(bundlePath, "utf8");
const marker = /\n?<<<<<FILE::(.+?)>>>>>\n/g;

const parts = [];
let m;
let last = null;
while ((m = marker.exec(raw)) !== null) {
  if (last) last.end = m.index;
  last = { name: m[1].trim(), start: marker.lastIndex };
  parts.push(last);
}
if (last) last.end = raw.length;

if (parts.length === 0) {
  console.error("✗ Bundle không có marker <<<<<FILE::...>>>>> nào. Sai file?");
  process.exit(1);
}

const writeFile = (rel, content) => {
  const dest = path.join(root, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, content);
  console.log("  ✓", rel, `(${content.length} bytes)`);
};

console.log(`\nĐọc bundle: ${bundlePath}`);
console.log(`Tìm thấy ${parts.length} file:\n`);

for (const p of parts) {
  const content = raw.slice(p.start, p.end);
  const name = p.name.replace(/^\/+/, "");

  if (name === "assets/style.css") {
    writeFile("public/assets/style.css", content);
    writeFile("styles/yuzu.css", content);
  } else if (name === "assets/app.js") {
    writeFile("public/assets/app.js", content);
  } else if (name.endsWith(".html")) {
    writeFile(path.join("legacy-html", name), content);
  } else {
    writeFile(path.join("legacy-html", name), content);
  }
}

console.log(
  "\n✔ Xong. Source gốc đã ở legacy-html/ + public/assets/ + styles/yuzu.css\n" +
    "  Bước tiếp: convert từng file trong legacy-html/ thành page React trong app/.\n"
);
