import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/helpers";

/* --------------------------------------------------------------------------
   CloudButton — the site's primary call to action
   --------------------------------------------------------------------------
   A solid brand-blue pill with the airplane icon in a circle at its right
   end. On hover it lifts and the plane loops out and back.
   Styles live in globals.css under "Primary Button".
   -------------------------------------------------------------------------- */
type CloudButtonBase = {
  children: ReactNode;
  /** sky: brand-blue for light backgrounds; white: for blue backgrounds */
  variant?: "sky" | "white";
  size?: "sm" | "md" | "lg";
  /** Show the airplane icon after the label */
  icon?: boolean;
  className?: string;
};

type CloudButtonAsLink = CloudButtonBase & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type CloudButtonAsButton = CloudButtonBase & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type CloudButtonProps = CloudButtonAsLink | CloudButtonAsButton;

function CloudInner({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      <span className="cloud-btn__label">{children}</span>
      {icon && (
        <span className="cloud-btn__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21.5 15.6v-1.8l-8-5V3.3a1.5 1.5 0 0 0-3 0v5.5l-8 5v1.8l8-2.5v5.5l-2 1.5V22l3.5-1 3.5 1v-1.4l-2-1.5v-5.5l8 2.5Z" />
          </svg>
        </span>
      )}
    </>
  );
}

export default function CloudButton(props: CloudButtonProps) {
  const { children, variant = "sky", size = "md", icon = true, className } = props;
  const classes = cn("cloud-btn", `cloud-btn--${variant}`, `cloud-btn--${size}`, className);

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _c, variant: _v, size: _s, icon: _i, className: _cn, href, ...rest } = props;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href) || href.startsWith("#");
    return isExternal ? (
      <a href={href} className={classes} {...rest}>
        <CloudInner icon={icon}>{children}</CloudInner>
      </a>
    ) : (
      <Link href={href} className={classes} {...rest}>
        <CloudInner icon={icon}>{children}</CloudInner>
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children: _c, variant: _v, size: _s, icon: _i, className: _cn, href: _h, type, ...rest } = props;
  return (
    <button type={type ?? "button"} className={classes} {...rest}>
      <CloudInner icon={icon}>{children}</CloudInner>
    </button>
  );
}
