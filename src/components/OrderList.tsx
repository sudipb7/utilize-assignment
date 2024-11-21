import { useState } from "react";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";

import { Order } from "../types";
import OrderForm from "./OrderForm";

interface OrderListProps {
  orders: Order[];
  updateOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
}

type SortField = "id" | "customer_name" | "product" | "quantity" | "order_value";

function OrderList({ orders, updateOrder, deleteOrder }: OrderListProps) {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleUpdate = async (updatedOrder: Order) => {
    setLoadingOrderId(updatedOrder.id);
    try {
      await updateOrder(updatedOrder);
    } finally {
      setLoadingOrderId(null);
      setEditingOrder(null);
    }
  };

  const handleDelete = async (orderId: string) => {
    setLoadingOrderId(orderId);
    try {
      await deleteOrder(orderId);
    } finally {
      setLoadingOrderId(null);
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="border-b border-b-gray-300">
            <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => handleSort("id")}>
              Order ID <SortIcon field="id" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("customer_name")}
            >
              Customer Name <SortIcon field="customer_name" />
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("product")}
            >
              Product <SortIcon field="product" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("quantity")}
            >
              Quantity <SortIcon field="quantity" />
            </th>
            <th
              scope="col"
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort("order_value")}
            >
              Order Value <SortIcon field="order_value" />
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-3 text-[13px]">{order.id}</td>
              <td className="px-6 py-3 text-[13px]">{order.customer_name}</td>
              <td className="px-6 py-3 text-[13px]">{order.customer_email}</td>
              <td className="px-6 py-3 text-[13px]">{order.product}</td>
              <td className="px-6 py-3 text-[13px]">{order.quantity}</td>
              <td className="px-6 py-3 text-[13px]">${order.order_value.toFixed(2)}</td>
              <td className="px-6 py-3 text-[13px]">
                {loadingOrderId === order.id ? (
                  <Loader2 className="animate-spin h-5 w-5 text-blue-500" />
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(order)}
                      className="bg-blue-500 text-[13px] text-white px-2 py-1 rounded mr-2 hover:bg-opacity-90 focus-visible:ring-blue-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="bg-red-500 text-[13px] text-white px-2 py-1 rounded hover:bg-opacity-90 focus-visible:ring-red-500"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingOrder && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-30 flex items-center justify-center overflow-y-auto h-full w-full">
          <div className="relative p-6 border w-96 shadow-md rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">Edit Order</h3>
            <OrderForm
              order={editingOrder}
              addOrder={handleUpdate}
              closeModal={() => setEditingOrder(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderList;
