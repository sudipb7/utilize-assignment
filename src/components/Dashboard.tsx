import { useState, useEffect } from "react";
import { LogOut, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import OrderList from "./OrderList";
import OrderForm from "./OrderForm";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import type { Order } from "../types";
import { useUser } from "../hooks/useUser";
import { logout } from "../store/authSlice";
import { RootState, AppDispatch } from "../store";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "../store/orderSlice";

function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useUser();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(20);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleAddOrder = (order: Order) => {
    dispatch(addOrder(order));
    setIsCreateModalOpen(false);
  };

  const handleUpdateOrder = (order: Order) => {
    dispatch(updateOrder(order));
  };

  const handleDeleteOrder = (orderId: string) => {
    dispatch(deleteOrder(orderId));
  };

  const filteredOrders = orders.filter(order =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalOrderValue = orders.reduce((sum, order) => sum + order.order_value, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-sm font-medium text-gray-900">Hello, {user?.name}</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-500 hover:opacity-90 focus-visible:ring-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Orders Overview</h2>
              <p className="mt-0.5 text-sm text-gray-600">
                Total Order Value:{" "}
                <span className="text-gray-900 font-medium">${totalOrderValue.toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-500 hover:opacity-90 focus-visible:ring-blue-500"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Order
            </button>
          </div>

          <div className="mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : (
            <>
              <OrderList
                orders={currentOrders}
                updateOrder={handleUpdateOrder}
                deleteOrder={handleDeleteOrder}
              />
              <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={filteredOrders.length}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-30 flex items-center justify-center overflow-y-auto h-full w-full">
          <div className="relative p-6 border w-96 shadow-md rounded-lg bg-white">
            <h3 className="text-lg font-semibold mb-4">Create New Order</h3>
            <OrderForm addOrder={handleAddOrder} closeModal={() => setIsCreateModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
