import React from "react";
import { useRouter } from 'next/router';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { SSLogo } from './SSLogo';

export default function ManagerNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const menuItems = [
    { name: "Usuários", route: "/manager" },
    { name: "Administradores", route: "/administradores" },
    { name: "Funcionários", route: "/funcionarios" },
    { name: "Fornecedores", route: "/fornecedores" },
  ];

  const handleMenuItemClick = (route: any) => {
    router.push(route);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="cursor-pointer" />
        <NavbarBrand>
          <SSLogo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="danger" href="#" variant="flat">
            Sair
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={"foreground"}
              className="w-full cursor-pointer"
              size="lg"
              onClick={() => handleMenuItemClick(item.route)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
