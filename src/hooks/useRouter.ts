import { useRouter as useNextRouter, NextRouter } from "next/router";

interface Router extends NextRouter {
  activeRoute: string;
}

export default function useRouter(): Router {
  const nextRouter = useNextRouter();
  const activeRoute = "/" + nextRouter.pathname.split("/")[1];

  return { ...nextRouter, activeRoute };
}
