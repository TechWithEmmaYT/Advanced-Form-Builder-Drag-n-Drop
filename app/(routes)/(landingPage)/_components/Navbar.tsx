import React from "react";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  return (
    <div>
      <LoginLink postLoginRedirectURL="/dashboard">Sign in</LoginLink>
      <RegisterLink postLoginRedirectURL="/dashboard">Sign up</RegisterLink>
    </div>
  );
};

export default Navbar;
