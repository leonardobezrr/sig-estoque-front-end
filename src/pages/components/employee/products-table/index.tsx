import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEdit, MdLabel } from "react-icons/md";
import { deleteProduct, fetchAllProductsData, fetchAllProductsByIdData, UpdateProduct } from "./api/index";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  DefaultButton,
  Form,
  Icon,
  Text,
  StyledInputUpdateUser,
} from "@/styles/pages/manager";
import { FaUser } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbFileDescription } from "react-icons/tb";
import { IoPricetagsOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";

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

interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  batch: string;
}

export default function TableProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      try {
        await deleteProduct(selectedProductId);
        fetchAllProducts();
        handleClose();
      } catch (error) {
        console.log("Erro na requisição", error);
      }
    }
  };

  const handleOpenDelete = (id: string) => {
    setSelectedProductId(id);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
    setSelectedProductId(null);
  };

  const handleOpenEdit = async (id: string) => {
    setSelectedProductId(id);
    try {
      const response = await fetchAllProductsByIdData(id);
      setProductData(response.product);
      setOpenEdit(true);
    } catch (error) {
      console.error("Erro ao abrir modal de edição:", error);
    }
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedProductId(null);
    setProductData(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductData>();

  const onSubmit: SubmitHandler<ProductData> = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        quantity_in_stock: Number(data.quantity_in_stock),
      };
      if (selectedProductId && productData) {
        await UpdateProduct(productData.id, payload);
        fetchAllProducts();
        handleCloseEdit();
      } else {
        console.error("ID inválido ou dados do produto ausentes");
      }
    } catch (error) {
      console.error("Erro ao editar o produto:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productData) {
      reset(productData);
    }
  }, [productData, reset]);

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
                    <div className="font-bold w-10 flex justify-center">{product.name}</div>
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
              <td className="text-center">
                <div className="flex justify-center space-x-2">
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleOpenEdit(product.id)}
                  >
                    <MdEdit size={17} />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(product.id)}
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
              onClick={handleDeleteProduct}
              variant="contained"
              color="error"
            >
              Excluir
            </Button>
          </div>
        </Box>
      </Modal>

      {productData && (
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Produto
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <label style={{ marginBottom: '-20px'}} htmlFor="name">Nome</label>
              <Icon>
                <FaUser size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Nome"
                  aria-label="Nome"
                  {...register("name", { required: "Nome é obrigatório" })}
                />
              </Icon>
              {errors.name && <Text>{errors.name.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Descrição</label>
              <Icon>
                <TbFileDescription size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Descrição"
                  aria-label="Descrição"
                  {...register("description", { required: "Descrição é obrigatória" })}
                />
              </Icon>
              {errors.description && <Text>{errors.description.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Preço</label>
              <Icon>
                <IoPricetagsOutline size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="number"
                  placeholder="Preço"
                  aria-label="Preço"
                  {...register("price", { required: "Preço é obrigatório" })}
                />
              </Icon>
              {errors.price && <Text>{errors.price.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Quantidade</label>
              <Icon>
                <CiBoxes size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="number"
                  placeholder="Quantidade em estoque"
                  aria-label="Quantidade em estoque"
                  {...register("quantity_in_stock", { required: "Quantidade em estoque é obrigatória" })}
                />
              </Icon>
              {errors.quantity_in_stock && <Text>{errors.quantity_in_stock.message}</Text>}

              <label style={{ marginBottom: '-20px'}} htmlFor="name">Lote</label>
              <Icon>
                <MdLabel size={24} aria-hidden="true" />
                <StyledInputUpdateUser
                  type="text"
                  placeholder="Lote"
                  aria-label="Lote"
                  {...register("batch", { required: "Lote é obrigatório" })}
                />
              </Icon>
              {errors.batch && <Text>{errors.batch.message}</Text>}

              <Button
              onClick={handleCloseEdit}
              variant="outlined"
              color="inherit"
            >
              Cancelar
            </Button>
            
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
