// https://www.codegrepper.com/code-examples/javascript/scroll+to+top+react+router
// react-router scroll to top on every transition

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
