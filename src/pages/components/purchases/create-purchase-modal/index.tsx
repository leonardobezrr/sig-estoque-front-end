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
import { CircularProgress, MenuItem, FormControl } from "@mui/material";
import { useModal } from "./modal-context";
import { createPurchase, fetchSuppliersData, fetchProductsData } from "./api";
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

interface CreatePurchase {
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

export default function CreatePurchaseModal() {
  const [loading, setLoading] = React.useState(false);
  const { isOpen, closeModal } = useModal();
  const [suppliersData, setSuppliersData] = React.useState<SupplierData[]>([]);
  const [productsData, setProductsData] = React.useState<ProductsData[]>([]);
  const { user } = React.useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreatePurchase>({
    defaultValues: {
      items: [],
    }
  });

  const watchedItems = watch("items");

  React.useEffect(() => {
    getSuppliersData();
    getProductsData();
  }, []);

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

  const handleProductChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedProductIds = event.target.value as string[];

    // Retrieve current items from form state
    const currentItems = watch("items");

    // Map selected product IDs to form items, ensuring that `quantity` and `value` are included
    const newItems = selectedProductIds.map((productId) => {
      const existingItem = currentItems.find(item => item.productId === productId);
      return {
        productId,
        quantity: existingItem?.quantity || 1,
        value: productsData.find(product => product.id === productId)?.price || 0,
      };
    });

    setValue("items", newItems);
  };

  const onSubmit: SubmitHandler<CreatePurchase> = async (data) => {
    setLoading(true);
    try {
      const purchaseData = {
        ...data,
        userId: user,
        items: data.items.map(item => ({
          ...item,
          quantity: Number(item.quantity),
          value: Number(item.value),
        })),
      };

      await createPurchase(purchaseData);
      closeModal();
      window.location.href = "/employee/purchases";
    } catch (error) {
      console.error("Erro ao cadastrar a compra", error);
    } finally {
      setLoading(false);
    }
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
          Cadastrar Compra
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          
          <StyledSelectContainer>
            <label htmlFor="supplier">Fornecedor</label>
            <FormControl fullWidth>
              <StyledSelect
                defaultValue=""
                labelId="supplier-select-label"
                id="supplier-select"
                {...register("supplierId", {
                  required: "Fornecedor é obrigatório",
                })}
              >
                <MenuItem className="text-white" value="" disabled>
                  Selecione o fornecedor
                </MenuItem>
                {suppliersData?.map((supplier) => (
                  <MenuItem key={supplier.id} className="text-white" value={supplier.id}>
                    {supplier.social_name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
            {errors.supplierId && <Text>{errors.supplierId.message}</Text>}
          </StyledSelectContainer>

          <StyledSelectContainer>
            <label htmlFor="nf_number">Nota fiscal</label>
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
            </Icon>
            {errors.nf_number && <Text>{errors.nf_number.message}</Text>}
          </StyledSelectContainer>

          <StyledSelectContainer>
            <label htmlFor="product">Produtos</label>
            <FormControl fullWidth>
              <StyledSelect
                labelId="product-select-label"
                id="product-select"
                multiple
                value={watchedItems.map(item => item.productId)}
                onChange={handleProductChange}
                renderValue={(selected: string[]) =>
                  productsData
                    .filter((product) => selected.includes(product.id))
                    .map((product) => product.name)
                    .join(", ")
                }
              >
                {productsData?.map((product) => (
                  <MenuItem key={product.id} value={product.id}>
                    {product.name}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          </StyledSelectContainer>

          <DefaultButton type="submit" aria-label="Cadastrar Compra" disabled={loading}>
            {loading ? (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            ) : (
              "Cadastrar Compra"
            )}
          </DefaultButton>
        </Form>
      </Box>
    </Modal>
  );
}
