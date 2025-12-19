export const externalRoutes = {
  fixed: [
    {
      path: "/google",
      url: "https://google.com",
    },
  ],
  dynamic: {
    chatgpt: "https://chatgpt.com",
    google: "https://google.com",
    github: "https://github.com",
  },
} as const;
