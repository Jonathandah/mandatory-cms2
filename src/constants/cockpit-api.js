const token = "71576f2b35b3422c108c0e508058a3";

const products = `http://localhost:8081/api/collections/get/Products?token=${token}`;

const reviews = `http://localhost:8081/api/collections/get/Reviews?token=${token}`;

const orders = `http://localhost:8081/api/collections/save/Orders?token=${token}`;

const cockpit__API = {
  products,
  reviews,
  orders
};

export default cockpit__API;
