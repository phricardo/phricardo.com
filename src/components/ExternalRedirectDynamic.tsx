import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { externalRoutes } from "@/config/externalRoutes";
import NotFound from "@/pages/NotFound";

type DynamicRouteKey = keyof typeof externalRoutes.dynamic;

export function ExternalRedirectDynamic() {
  const { key } = useParams<{ key?: string }>();

  const target = key
    ? externalRoutes.dynamic[key as DynamicRouteKey]
    : undefined;

  useEffect(() => {
    if (target) {
      window.location.replace(target);
    }
  }, [target]);

  if (!target) {
    return <NotFound />;
  }

  return null;
}
