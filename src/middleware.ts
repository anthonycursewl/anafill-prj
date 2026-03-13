import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (path === "/b/@anthonycursewl" || path === "/404") {
    return next();
  }

  if (
    path.startsWith("/_astro") ||
    path.startsWith("/images") ||
    path.startsWith("/favicon") ||
    path.includes(".")
  ) {
    return next();
  }

  return context.redirect("/404");
});
