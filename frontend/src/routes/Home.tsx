import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAxiosApiCall from "../utils/axios_instance";
import { FaBox, FaUser, FaTag } from "react-icons/fa";
import { AiOutlineDollar } from "react-icons/ai";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const axiosApiCall = useAxiosApiCall();
  const [products, setProducts] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, suppliersRes, categoriesRes] = await Promise.all([
          axiosApiCall.get("products/list"),
          axiosApiCall.get("suppliers/list"),
          axiosApiCall.get("categories/list"),
        ]);
        setProducts(productsRes.data.products);
        setSuppliers(suppliersRes.data.suppliers);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogin = () => {
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <div className="p-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="../../polylogo.jpg" // Update this path to the actual logo path
              alt="Logo"
              className="h-8 w-auto"
            />
            <h1 className="ml-4 text-2xl font-bold text-gray-500">
              Inventory Dashboard
            </h1>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative h-72 bg-gray-200 mb-6">
          <img
            src="../../poly.jpg" // Update this path to the actual image path
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-75"
          />
          <div className="relative flex items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl font-bold text-secondary">
              FPTB <br />
              Welcome to Our Inventory Dashboard
            </h1>
          </div>
        </div>

        <div className="container mx-auto">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaBox className="text-blue-600 mr-2" />
              Products
            </h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              {products.length > 0 ? (
                <ul className="space-y-4">
                  {products.map((product) => (
                    <li
                      key={product.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span>{product.name}</span>
                      <span className="text-green-600 font-semibold">
                        &#8358;{product.price}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No products available.</p>
              )}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaUser className="text-green-600 mr-2" />
              Suppliers
            </h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              {suppliers.length > 0 ? (
                <ul className="space-y-4">
                  {suppliers.map((supplier) => (
                    <li key={supplier.id} className="border-b pb-2">
                      {supplier.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No suppliers available.</p>
              )}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FaTag className="text-yellow-600 mr-2" />
              Categories
            </h2>
            <div className="bg-white shadow-md rounded-lg p-4">
              {categories.length > 0 ? (
                <ul className="space-y-4">
                  {categories.map((category) => (
                    <li key={category.id} className="border-b pb-2">
                      {category.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No categories available.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
