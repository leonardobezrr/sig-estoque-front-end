import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { deleteUser, fetchUsersData } from "./api";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export interface Users {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

export default function TableUsers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const fetchAllUsers = async () => {
    try {
      const response = await fetchUsersData();
      if (response.users.length > 0) {
        setUsers(response.users);
      }
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (selectedUserId) {
      try {
        await deleteUser(selectedUserId);
        fetchAllUsers();
        handleClose();
      } catch (error) {
        console.log("Erro na requisição", error);
      }
    }
  };

  const handleOpen = (id: string) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  return (
    <div
      className="overflow-x-auto flex w-full"
      style={{
        backgroundColor: "#1d232e",
        padding: "2rem",
        border: "1px solid #8888",
        borderRadius: "8px",
      }}
    >
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th className="text-center">Nome do usuário</th>
            <th className="text-center">E-mail</th>
            <th className="text-center">Função</th>
            <th className="text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="flex justify-center">
                <div className="flex text-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={`${user.name}'s Avatar`}
                          width={48}
                          height={48}
                        />
                      ) : (
                        <FaUserCircle size={40} />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="font-bold w-10">{user.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {user.email}
                <br />
              </td>
              <td className="text-center">
                {user.role}
                <br />
                {user.role === "Administrador" && (
                  <span className="badge badge-ghost badge-sm">
                    Administrador
                  </span>
                )}
              </td>
              <td className="text-center">
                <div className="flex justify-center space-x-2">
                  <button className="btn btn-ghost btn-xs">
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleOpen(user.id)}
                    className="btn btn-ghost btn-xs"
                  >
                    <MdDeleteOutline size={17} color="red" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirmar Exclusão
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tem certeza de que deseja excluir este usuário?
          </Typography>
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteUser}
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
