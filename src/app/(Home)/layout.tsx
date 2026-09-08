import Navbar from "../_navbar-component/Navbar";
import Footer from "../_footer-component/footer";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="z-10 md:px-4">{children}</div>
      <Footer />
    </div>
  );
}
