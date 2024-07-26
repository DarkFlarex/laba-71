import React from 'react';
import { NavLink } from 'react-router-dom';

const UserToolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Turtle Pizza
                </NavLink>
            </div>
        </nav>
    );
};

export default UserToolbar;
