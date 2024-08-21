import { useContext, useEffect, useState } from "react";
import SSLogo from "./SSLogo";
import ProfileIcon from "./Profile";
import { AuthContext } from "@/src/context/AuthContext";
import Link from "next/link";
import { fetchUserData } from "./api";
import { useRouter } from "next/router";

interface UserData {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export default function EmployeeNavbar() {
  const { user, signOut } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const getUserProfile = async () => {
    try {
      if (typeof user === "string") {
        const response = await fetchUserData(user);
        setUserData(response.user);
        console.log(response.user);
        if (response.user.role != "EMPLOYEE") {
          router.push("/login");
        }
      }
    } catch (error) {
      console.log("Não foi possível encontrar o colaborador");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [user]);

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
        <Link href="/employee" className="btn btn-ghost text-xl">
          <SSLogo />
        </Link>
      </div>
      <div className="flex-none gap-2 flex items-center">
        <div className="form-control">
          <span>{user ? userData?.name : "Usuário"}</span>
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
              <button
                onClick={handleSignout}
                className="btn btn-error"
                style={{ color: "#fff" }}
              >
                Sair
              </button>
            </li>
            <Link href="/employee">Fornecedores</Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
