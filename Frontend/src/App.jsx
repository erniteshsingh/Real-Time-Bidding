import "./App.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import AdminRoutes from "./admin/routes/AdminRoutes";
const App = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
      {/* <Navbar /> */}
      <main className="main-content">
        {/* <AppRoutes /> */}

        <AdminRoutes />
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
