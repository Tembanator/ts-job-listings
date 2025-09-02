"use client";
import { useState, useEffect } from "react";
import Router from "next/router";
import { Loader2 } from "lucide-react";

const LoadingWidget = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  return loading ? (
    <div className="flex items-center justify-center w-screen h-screen bg-green-800 text-white">
      <Loader2 className="animate-spin" />
      Loading...
    </div>
  ) : null;
};

export default LoadingWidget;
