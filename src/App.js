import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./views/Login";
import Booking from "./views/Booking";
import Event from "./views/Event";
import EventDetail from "./views/EventDetail";
import Signup from "./views/Signup";
import { AuthProvider } from "./components/Auth";
import { LoaderProvider } from "./components/Loader";
function App() {
  return (
    <AuthProvider>
      <LoaderProvider>
        <Router>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Signup} />
            <ProtectedRoute exact path="/booking" component={Booking} />
            <Route exact path="/events" component={Event} />
            <Switch>
              <Route exact path="/events/:id" component={EventDetail} />
            </Switch>
          </div>
        </Router>
      </LoaderProvider>
    </AuthProvider>
  );
}

export default App;
