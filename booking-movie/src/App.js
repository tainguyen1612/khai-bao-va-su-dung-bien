import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLayout from "./layout/UserLayout";
import UserPage from "./pages/User";
import NotFound from "./components/NotFound";
import AdminLayout from "./layout/AdminLayout";
import AdminPage from "./pages/Admin";
import Login from "./components/Login/LoginAdmin";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/admin/login" component={Login} />
                    <AdminLayout path="/dashboard" component={AdminPage} />
                    <UserLayout path="/" component={UserPage} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
