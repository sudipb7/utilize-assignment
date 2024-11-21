import { useState, useEffect } from "react";
import { Order } from "../types";

interface OrderFormProps {
  order?: Order;
  addOrder: (order: Order) => void;
  closeModal: () => void;
}

function OrderForm({ order, addOrder, closeModal }: OrderFormProps) {
  const [formData, setFormData] = useState<Omit<Order, "id" | "order_value">>({
    customer_name: "",
    customer_email: "",
    product: "Product 1",
    quantity: 1,
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        product: order.product,
        quantity: order.quantity,
      });
    }
  }, [order]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "quantity" ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productPrices = {
      "Product 1": 29,
      "Product 2": 49,
      "Product 3": 149,
    };
    const orderValue =
      formData.quantity * productPrices[formData.product as keyof typeof productPrices];
    addOrder({
      ...formData,
      id: order ? order.id : Date.now().toString(),
      order_value: orderValue,
    });
    setFormData({
      customer_name: "",
      customer_email: "",
      product: "Product 1",
      quantity: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="customer_name" className="text-sm text-gray-600 font-medium w-full">
            Customer Name
          </label>
          <input
            type="text"
            name="customer_name"
            id="customer_name"
            value={formData.customer_name}
            onChange={handleChange}
            placeholder="Customer Name"
            required
            minLength={3}
            className="border border-gray-300 text-sm px-2.5 py-2 rounded-md w-full focus-visible:ring-gray-300 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="customer_email" className="text-sm text-gray-600 font-medium w-full">
            Customer Email
          </label>
          <input
            type="email"
            name="customer_email"
            id="customer_email"
            value={formData.customer_email}
            onChange={handleChange}
            placeholder="Customer Email"
            required
            className="border border-gray-300 text-sm px-2.5 py-2 rounded-md w-full focus-visible:ring-gray-300 shadow-sm"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="product" className="text-sm text-gray-600 font-medium w-full">
            Product
          </label>
          <select
            name="product"
            id="product"
            value={formData.product}
            onChange={handleChange}
            className="border border-gray-300 outline-none text-sm px-2.5 py-2 rounded-md w-full focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-300 shadow-sm transition-all"
          >
            <option value="Product 1">Product 1</option>
            <option value="Product 2">Product 2</option>
            <option value="Product 3">Product 3</option>
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="quantity" className="text-sm text-gray-600 font-medium w-full">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            required
            min={1}
            className="border border-gray-300 text-sm px-2.5 py-2 rounded-md w-full focus-visible:ring-gray-300 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 text-sm rounded-md shadow-sm focus-visible:ring-green-500"
          >
            
            {order ? "Order" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => closeModal()}
            className="bg-gray-200 text-gray-700 px-4 py-2 text-sm rounded-md shadow-sm focus-visible:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default OrderForm;
