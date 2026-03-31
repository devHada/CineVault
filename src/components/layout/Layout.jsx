import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="scrollbar-hide">
      <Navbar />
      <main style={{ paddingTop: "64px" }}>{children}</main>
    </div>
  );
};

export default Layout;
