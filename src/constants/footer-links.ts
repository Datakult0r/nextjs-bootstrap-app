export type FooterLink = Readonly<{
  groupLabel: string;
  sub: {
    label: string;
    href: string;
    target?: string;
  }[];
}>[];

export const footerLinks: FooterLink = [
  {
    groupLabel: "legal",
    sub: [
      {
        label: "terms",
        href: "/terms",
      },
      {
        label: "policy",
        href: "/policy",
      },
      {
        label: "gdpr",
        href: "/gdpr",
      },

      {
        label: "contact",
        href: "/contact",
      },
    ],
  },
  {
    groupLabel: "resources",
    sub: [
      {
        label: "tutorials",
        href: "/",
      },
      {
        label: "blog",
        href: "/",
        target: "_blank",
      },
    ],
  },
];
