import React, { useState } from "react";
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(prevState => !prevState);

    const { user, logout, isAuthenticated } = useAuth();

    return (
        <Navbar color="dark" dark expand="md" className="mb-4">
            <Container>
                <NavbarBrand tag={Link} to="/">
                    Online Queue
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse
                    isOpen={isOpen}
                    navbar
                    className="justify-content-between"
                >
                    <Nav navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        {isAuthenticated && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/visits">
                                        Visits
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/dashboard">
                                        Dashboard
                                    </NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                    <Nav navbar>
                        {isAuthenticated ? (
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {user != null && user.name}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        ) : (
                            <NavItem>
                                <NavLink tag={Link} to="/login">
                                    Login
                                </NavLink>
                            </NavItem>
                        )}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
