import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

import { deleteUser, fetchUsersData } from "./api/index";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  DefaultButton,
  Form,
  Icon,
  Text,
  StyledInputUpdateUser,
} from "@/styles/pages/manager";
import { FaUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { fetchUserData } from "../manager-navbar/api";
import { updateEmployeeUser, updateManagerUser } from "@/src/pages/manager/update-user/api";

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

interface UserData {
  userId: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

export default function TableUsers() {
  const [users, setUsers] = useState<Users[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleOpenDelete = (id: string) => {
    setSelectedUserId(id);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setSelectedUserId(null);
  };

  const handleOpenEdit = async (id: string) => {
    setSelectedUserId(id);
    try {
      const response = await fetchUserData(id);
      setUserData(response.user);
      setOpenEdit(true);
    } catch (error) {
      console.error("Erro ao abrir modal de edição:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUserId(null);
    setUserData(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    setLoading(true);
    try {
      if (selectedUserId && userData) {
        const formattedData = { ...data, userId: selectedUserId };

        if (userData.role === "MANAGER") {
          await updateManagerUser(selectedUserId, formattedData);
        } else if (userData.role === "EMPLOYEE") {
          await updateEmployeeUser(selectedUserId, formattedData);
        }
        fetchAllUsers();
        handleCloseEdit();
      } else {
        console.error("ID inválido ou dados do usuário ausentes");
      }
    } catch (error) {
      console.error("Erro ao editar o usuário:", error);
    } finally {
      setLoading(false);
    }
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
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleOpenEdit(user.id)}
                  >
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(user.id)}
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

      <Modal
        open={openDelete}
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

      {userData && (
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Usuário
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Icon>
                <FaUser size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Nome"
                  aria-label="Nome"
                  {...register("name", { required: "Nome é obrigatório" })}
                  defaultValue={userData.name}
                />
              </Icon>
              {errors.name && <Text>{errors.name.message}</Text>}

              <Icon>
                <FaUser size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="email"
                  placeholder="Email"
                  aria-label="Email"
                  {...register("email", { required: "Email é obrigatório" })}
                  defaultValue={userData.email}
                />
              </Icon>
              {errors.email && <Text>{errors.email.message}</Text>}
              <DefaultButton
                type="submit"
                aria-label="Salvar"
                disabled={loading}
              >
                {loading ? (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  "Salvar"
                )}
              </DefaultButton>
            </Form>
          </Box>
        </Modal>
      )}
    </div>
  );
}
