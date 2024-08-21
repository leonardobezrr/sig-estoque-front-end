import { useEffect, useState } from "react";
import { 
  fetchAllSalesData,
} from "./api/index";
import React from 'react';

interface Sale {
  id: string;
  userId: string;
  nf_number: string;
  subTotal: number;
  createdAt: string;
}

export default function TableSales() {
  const [sales, setSales] = useState<Sale[]>([]);

  const fetchAllSales = async () => {
    try {
      const response = await fetchAllSalesData();
      setSales(response.sale);
    } catch (error) {
      console.log("Erro na requisição", error);
    }
  };

  useEffect(() => {
    fetchAllSales();
  }, []);

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
        <thead>
          <tr>
            <th className="text-center">Nota fiscal</th>
            <th className="text-center">Subtotal</th>
            <th className="text-center">Data da venda</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => (
            <tr key={sale.id}>
              <td className="flex justify-center">
                <div className="flex text-center gap-3">
                  <div className="flex items-center">
                    <div className="font-bold w-10 flex justify-center">{sale.nf_number}</div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                {sale.subTotal}
                <br />
              </td>
              <td className="text-center">
                {sale.createdAt}
                <br />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}