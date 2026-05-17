import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ExternalRouteKey, externalRoutes } from "@/config/externalRoutes";
import NotFound from "@/pages/NotFound";

export function ExternalRedirectDynamic() {
  const { key } = useParams<{ key?: string }>();

  const target =
    key && key in externalRoutes.dynamic
      ? externalRoutes.dynamic[key as ExternalRouteKey]
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
