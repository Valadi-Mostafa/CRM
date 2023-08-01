import Link from "next/link";

function Layout({ children }) {
  return (
    <>
      <header className="header">
        <h2>CRM</h2>
        <Link href="/add-customer">Add Customer</Link>
      </header>
      <div className="main">{children}</div>
      <footer className="footer">
        Next.js project | CRM by{" "}
        <a
          href="https://github.com/Valadi-Mostafa"
          target="_blank"
          rel="noreferrer"
        >
          Mostafa
        </a>{" "}
        &copy;
      </footer>
    </>
  );
}

export default Layout;
