import { useContext } from "react";
import SSLogo from "./SSLogo";
import ProfileIcon from "./Profile";
import { AuthContext } from "@/src/context/AuthContext";

export default function ManagerNavbar() {
  const { signOut } = useContext(AuthContext);

  function handleSignout() {
    try {
      signOut();
    } catch (error) {
      console.error("Falha ao fazer logout:", error);
    }
  }

  return (
    <div
      className="navbar bg-base-100 flex justify-between"
      style={{ paddingBottom: "4rem !important" }}
    >
      <div className="flex-1">
        <a href="/manager" className="btn btn-ghost text-xl">
          <SSLogo />
        </a>
      </div>
      <div className="flex-none gap-2 flex items-center">
        <div className="form-control">
          <span>Ricardo</span>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <ProfileIcon />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <button
                onClick={handleSignout}
                className="btn btn-error"
                style={{ color: "#fff" }}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
