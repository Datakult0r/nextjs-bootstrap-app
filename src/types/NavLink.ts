import type { LinkProps } from "next/link";
import type { HTMLAttributeAnchorTarget } from "react";

export interface NavLink extends Omit<LinkProps, "href"> {
  href: string;
  label: string;
  target?: HTMLAttributeAnchorTarget;
}
