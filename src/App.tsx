import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Navbar/>
      <Outlet />
    </div>
  );
}
export default App;
