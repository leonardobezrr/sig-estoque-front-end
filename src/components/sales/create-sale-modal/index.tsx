import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  DefaultButton,
  Form,
  Icon,
  StyledInput,
  StyledSelect,
  StyledSelectContainer,
  Text,
} from "@/styles/pages/manager";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { useModal } from "../../../context/sale/modal-context";
import { createSale, fetchSuppliersData, fetchProductsData } from "./api";
import { IoPricetagOutline } from "react-icons/io5";
import { AuthContext } from "@/src/context/AuthContext";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1d232a",
  p: 4,
};

interface CreateSale {
  nf_number: string;
  supplierId: string;
  userId: string;
  items: {
    productId: string;
    quantity: number;
    value: number;
  }[];
}

interface ProductsData {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
}

interface SupplierData {
  id: string;
  social_name: string;
}

export default function CreateSaleModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, closeModal } = useModal();
  const [productsData, setProductsData] = React.useState<ProductsData[]>([]);
  const [suppliersData, setSuppliersData] = React.useState<SupplierData[]>([]);
  const { user } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateSale>({
    defaultValues: {
      items: [],
    },
  });

  const watchedItems = watch("items");

  async function getSuppliersData() {
    try {
      const response = await fetchSuppliersData();
      setSuppliersData(response.supplier);
    } catch (error) {
      console.log("Erro ao buscar fornecedores", error);
    }
  }

  async function getProductsData() {
    try {
      const response = await fetchProductsData();
      setProductsData(response.product);
    } catch (error) {
      console.log("Erro ao buscar produtos", error);
    }
  }

  React.useEffect(() => {
    getSuppliersData();
    getProductsData();
  }, []);

  const onSubmit: SubmitHandler<CreateSale> = async (data) => {
    setLoading(true);
    try {
      const saleData = {
        ...data,
        userId: user,
        items: data.items.map((item) => ({
          ...item,
          quantity: Number(item.quantity),
          value: Number(item.value),
        })),
      };

      await createSale(saleData);
      closeModal();
      window.location.href = "/employee/sales";
    } catch (error) {
      console.error("Erro ao cadastrar a venda", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductChange = (event: SelectChangeEvent<string[]>) => {
    const selectedProductIds = event.target.value as string[];

    const newItems = selectedProductIds.map((productId) => ({
      productId,
      quantity: 1,
      value: productsData.find((product) => product.id === productId)?.price || 0,
    }));

    setValue("items", newItems);
  };

  const handleClose = () => {
    closeModal();
    reset();
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cadastrar Venda
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledSelectContainer>
            <StyledSelect
              defaultValue="none"
              labelId="supplier-select-label"
              id="supplier-select"
              label="Fornecedor"
              className="text-white text-center"
              style={{ width: "328px" }}
              {...register("supplierId", {
                required: "Fornecedor é obrigatório",
              })}
            >
              <MenuItem className="text-white" value="none" disabled>
                Selecione o fornecedor
              </MenuItem>
              {suppliersData?.map((supplier) => (
                <MenuItem
                  key={supplier.id}
                  className="text-white"
                  value={supplier.id}
                >
                  {supplier.social_name}
                </MenuItem>
              ))}
            </StyledSelect>
            {errors.supplierId && <Text>{errors.supplierId.message}</Text>}
          </StyledSelectContainer>
          <Icon>
            <IoPricetagOutline size={24} aria-hidden="true" />
            <StyledInput
              type="text"
              placeholder="Número da Nota Fiscal"
              aria-label="Número da Nota Fiscal"
              {...register("nf_number", {
                required: "Número da Nota Fiscal é obrigatório",
              })}
            />
            {errors.nf_number && <Text>{errors.nf_number.message}</Text>}
          </Icon>

          <FormControl fullWidth>
            <InputLabel id="product-select-label">Produtos</InputLabel>
            <Select
              defaultValue={[]}
              labelId="product-select-label"
              id="product-select"
              style={{ color: "white" }}
              multiple
              value={watchedItems.map((item) => item.productId)}
              onChange={handleProductChange}
              renderValue={(selected) =>
                productsData
                  .filter((product) => selected.includes(product.id))
                  .map((product) => product.name)
                  .join(", ")
              }
            >
              <MenuItem className="text-white" value="none" disabled>
                Selecione o(os) produto (os)
              </MenuItem>
              {productsData?.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button onClick={handleClose} variant="outlined" color="inherit">
            Cancelar
          </Button>

          <DefaultButton
            type="submit"
            aria-label="Cadastrar Venda"
            disabled={loading}
          >
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              "Cadastrar Venda"
            )}
          </DefaultButton>
        </Form>
      </Box>
    </Modal>
  );
}
