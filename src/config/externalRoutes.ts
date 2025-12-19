export const externalRoutes = {
  fixed: [
    {
      path: "/alcateia",
      url: "https://alcateia.phricardo.com",
    },
  ],
  dynamic: {
    github: "https://github.com/phricardo",
    linkedin: "https://www.linkedin.com/in/phricardorj/",
    x: "https://x.com/phrcd",
    instagram: "https://www.instagram.com/phrcd/",
    youtube: "https://www.youtube.com/@phrcd",
  },
} as const;

export type ExternalRouteKey = keyof typeof externalRoutes.dynamic;

export const getExternalRoutePath = (key: ExternalRouteKey) => `/go/${key}`;
