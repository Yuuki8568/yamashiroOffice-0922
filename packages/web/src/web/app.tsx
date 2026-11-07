import { Route, Switch } from "wouter";
import Index from "./pages/index";
import Store from "./pages/store";
import Service from "./pages/service";
import Demo from "./pages/demo";
import Privacy from "./pages/legal/privacy";
import Terms from "./pages/legal/terms";
import Tokusho from "./pages/legal/tokusho";
import Disclaimer from "./pages/legal/disclaimer";
import CookiePolicy from "./pages/legal/cookie";
import { Provider } from "./components/provider";
import { CookieBanner } from "./components/site/cookie-banner";
import { initAnalytics } from "./lib/analytics";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <Provider>
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/store" component={Store} />
        <Route path="/service" component={Service} />
        <Route path="/demo" component={Demo} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/tokusho" component={Tokusho} />
        <Route path="/disclaimer" component={Disclaimer} />
        <Route path="/cookie" component={CookiePolicy} />
      </Switch>
      <CookieBanner />
    </Provider>
  );
}

export default App;
