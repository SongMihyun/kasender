import Header from "./Header";

function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default RootLayout;