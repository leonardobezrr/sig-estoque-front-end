import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
// import {
//   fetchUserData,
//   updateEmployeeUser,
//   updateManagerUser,
// } from "../../manager/update-user/api/index";
import { fetchAllProductsData } from "./api/index";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import { useForm, SubmitHandler } from "react-hook-form";
import {
  DefaultButton,
  Form,
  Icon,
  Text,
  StyledInputUpdateUser,
} from "@/styles/pages/manager";
import { FaUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  batch: string;
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

// interface UserData {
//   userId: string;
//   name: string;
//   email: string;
//   password?: string;
//   role: string;
// }

export default function TableProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  // const [openDelete, setOpenDelete] = useState(false);
  // const [openEdit, setOpenEdit] = useState(false);
  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    try {
      const response = await fetchAllProductsData();
      setProducts(response.product);
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // const handleDeleteUser = async () => {
  //   if (selectedUserId) {
  //     try {
  //       await deleteUser(selectedUserId);
  //       fetchAllUsers();
  //       handleClose();
  //     } catch (error) {
  //       console.log("Erro na requisição", error);
  //     }
  //   }
  // };

  // const handleOpenDelete = (id: string) => {
  //   setSelectedUserId(id);
  //   setOpenDelete(true);
  // };

  // const handleClose = () => {
  //   setOpenDelete(false);
  //   setSelectedUserId(null);
  // };

  // const handleOpenEdit = async (id: string) => {
  //   setSelectedUserId(id);
  //   try {
  //     const response = await fetchUserData(id);
  //     setUserData(response.user);
  //     setOpenEdit(true);
  //   } catch (error) {
  //     console.error("Erro ao abrir modal de edição:", error);
  //   }
  // };

  // const handleCloseEdit = () => {
  //   setOpenEdit(false);
  //   setSelectedUserId(null);
  //   setUserData(null);
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserData>();

  // const onSubmit: SubmitHandler<UserData> = async (data) => {
  //   setLoading(true);
  //   try {
  //     if (selectedUserId && userData) {
  //       const formattedData = { ...data, userId: selectedUserId };

  //       if (userData.role === "MANAGER") {
  //         await updateManagerUser(selectedUserId, formattedData);
  //       } else if (userData.role === "EMPLOYEE") {
  //         await updateEmployeeUser(selectedUserId, formattedData);
  //       }
  //       fetchAllUsers();
  //       handleCloseEdit();
  //     } else {
  //       console.error("ID inválido ou dados do usuário ausentes");
  //     }
  //   } catch (error) {
  //     console.error("Erro ao editar o usuário:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
            <th className="text-center">Nome do produto</th>
            <th className="text-center">Descrição</th>
            <th className="text-center">Preço</th>
            <th className="text-center">Quantidade em estoque</th>
            <th className="text-center">Lote</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.id}>
              <td className="flex justify-center">
                <div className="flex text-center gap-3">
                  <div className="flex items-center">
                    <div className="font-bold w-10">{product.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {product.description}
                <br />
              </td>
              <td className="text-center">
                {product.price}
                <br />
              </td>
              <td className="text-center">
                {product.quantity_in_stock}
                <br />
              </td>
              <td className="text-center">
                {product.batch}
                <br />
              </td>
              {/* <td className="text-center">
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
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Modal
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
      </Modal> */}

      {/* {userData && (
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
      )} */}
    </div>
  );
}
