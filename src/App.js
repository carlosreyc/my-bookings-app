import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './views/Login';
import Booking from './views/Booking';
import Event from './views/Event';
import Signup from './views/Signup';
import { AuthProvider } from './components/Auth';
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Signup} />
          <ProtectedRoute exact path="/booking" component={Booking} />
          <Route exact path="/events/:id" component={Event} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
