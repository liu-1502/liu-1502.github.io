import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Nút dùng chung, ánh xạ sang design system gốc (.btn / .btn-*). Giữ nguyên class
 * nên giao diện không đổi. Đa hình: có `href` → link (nội bộ = next/link, ngoài =
 * <a target=_blank>); không có → <button>. `className` truyền thêm class (vd "gcta").
 */
type Variant = "solid" | "accent" | "line";
const VARIANT: Record<Variant, string> = {
  solid: "btn-solid",
  accent: "btn-accent",
  line: "btn-line",
};

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

type BaseProps = {
  variant?: Variant;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined };
type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string };

export default function Button(props: ButtonProps | LinkProps) {
  const { variant = "accent", block, className, children, ...rest } = props;
  const cls = cx("btn", VARIANT[variant], block && "btn-block", className);

  if (typeof props.href === "string") {
    const { href, ...anchor } = rest as Omit<LinkProps, keyof BaseProps>;
    const external = /^https?:/.test(href);
    if (external) {
      return (
        <a className={cls} href={href} {...anchor}>
          {children}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...anchor}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
