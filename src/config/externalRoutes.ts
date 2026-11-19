export const externalRoutes = {
  fixed: [
    {
      path: "/alcateia",
      url: "https://alcateia.phricardo.com",
    },
  ],
  dynamic: {
    github: "https://github.com/phricardo",
    youtube: "https://www.youtube.com/@phricardorj",
    instagram: "https://www.instagram.com/phricardorj/",
    linkedin: "https://www.linkedin.com/in/phricardorj/",
  },
} as const;

export type ExternalRouteKey = keyof typeof externalRoutes.dynamic;

export const getExternalRoutePath = (key: ExternalRouteKey) => `/go/${key}`;
