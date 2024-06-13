import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/SearchBar";
import Sidebar from "./scenes/global/SideBar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ResponsiveAppBar from './Components/Pages/Header';
import ForgotPassword from './Components/Pages/ForgotPassword';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Appointments from "./scenes/calendar/calendar";
import ServerProb from "./Components/Pages/ServerProb";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [email, setEmail] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const email = location.state?.email; // Get the email from the location state
    if (email) {
      setEmail(email); // Set the email in the state
    }
  }, [location]);
  // Function to check if the current path should hide the Topbar and Sidebar
  const isAuthPage = () => {
    const authPaths = ["/", "/register", "/forgotpassword","/server-error"];
    return authPaths.includes(location.pathname);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <div className="app">
          {!isAuthPage() && <Sidebar isSidebar={isSidebar} email={email}/>}
          <main className="content">
            {!isAuthPage() && <Topbar setIsSidebar={setIsSidebar} email={email}/>}
            <ResponsiveAppBar />
            <Routes>
            
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/server-error" element={<ServerProb />} />
              <Route path="/dashboard" element={<Dashboard email={email} />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
