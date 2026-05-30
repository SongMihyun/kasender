import { HashRouter, Routes, Route } from "react-router-dom";
import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import DownloadPage from "../pages/DownloadPage.jsx";
import NoticePage from "../pages/NoticePage.jsx";
import FaqPage from "../pages/FaqPage.jsx";
import ManualPage from "../pages/ManualPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";

function App() {
  return (
    <HashRouter>
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/manual" element={<ManualPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </RootLayout>
    </HashRouter>
  );
}

export default App;
