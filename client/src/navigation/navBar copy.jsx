import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import NavbarContainer from "";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import { useLocation } from "react-router-dom";

function NavBar() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  // console.log(splitLocation)
  const [openNavbar, setOpenNavbar] = useState(false);

  return (
    <Navbar color="lightBlue" navbar className="pl-2">
      <NavbarContainer>
        <NavbarWrapper>
          <NavbarBrand>Navbar</NavbarBrand>
          <NavbarToggler
            color="white"
            onClick={() => setOpenNavbar(!openNavbar)}
            ripple="light"
          />
        </NavbarWrapper>

        <NavbarCollapse open={openNavbar}>
          <Nav leftSide>
            <NavLink
              active={splitLocation[1] === "" ? "light" : ""}
              href="/"
              ripple="light"
            >
              Acceuil
            </NavLink>
          </Nav>
          <Nav
            rightSide
            className="flex flex-row  border-t border-white border-solid lg:border-t-0 lg:border-none"
          >
            <NavLink
              active={splitLocation[1] === "register" ? "light" : ""}
              href="/register"
              ripple="light"
            >
              Register
            </NavLink>
            <span className="text-white hidden lg:block"> | </span>
            <NavLink
              active={splitLocation[1] === "connexion" ? "light" : ""}
              href="connexion"
              ripple="light"
            >
              Connexion
            </NavLink>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  );
}

export default NavBar;
