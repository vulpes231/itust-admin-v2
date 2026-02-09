import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../../helpers/api_helper";
import { getAdminInfo } from "../../services/settings";
import { capitalize } from "lodash";
import { logoutAdmin } from "../../services/auth";
import Loader from "./Loader";

const ProfileDropdown = () => {
  const token = getAccessToken();

  const [userName, setUserName] = useState("Admin");
  const [error, setError] = useState("");

  const { data: admin } = useQuery({
    queryKey: ["adminInfo"],
    queryFn: getAdminInfo,
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: logoutAdmin,
    onError: (err) => setError(err.message),
  });

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("clicked logout");
    mutation.mutate();
  };

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      const tmt = setTimeout(() => {
        sessionStorage.removeItem("token");
        sessionStorage.clear();
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(tmt);
    }
  }, [mutation.isSuccess]);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {capitalize(admin?.username) || userName}
              </span>
              <span className="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">
                {admin?.role?.includes("0001") ? "Super User" : "Moderator"}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">
            Welcome {capitalize(admin?.username) || userName}
          </h6>
          <DropdownItem className="p-0">
            <Link to="/profile" className="dropdown-item">
              <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
              <span className="align-middle"> Profile</span>
            </Link>
          </DropdownItem>
          <DropdownItem className="p-0">
            <Link to="/#" className="dropdown-item">
              <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Messages</span>
            </Link>
          </DropdownItem>

          <div className="dropdown-divider"></div>

          <DropdownItem className="p-0">
            <Link to="/settings" className="dropdown-item">
              <span className="badge bg-success-subtle text-success mt-1 float-end">
                New
              </span>
              <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle">Settings</span>
            </Link>
          </DropdownItem>

          <DropdownItem className="p-0">
            <button
              onClick={handleLogout}
              type="button"
              className="dropdown-item"
              disabled={mutation.isPending}
            >
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                {"Logout"}
              </span>
            </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {mutation.isPending && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileDropdown;
