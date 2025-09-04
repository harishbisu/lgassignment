import "./App.css";
import AppProviders from "./providers/appProvider";
import EmailTracker from "./components/emailTracker";

function App() {
  return (
    <AppProviders>
      <EmailTracker />
    </AppProviders>
  );
}

export default App;
