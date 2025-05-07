
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/loginPage";
import ConversationList from "./pages/ConversationList";
import ChatPage from "./pages/ChatPage";
import Sidebar from "./pages/SideBar";

function App() {
  return (
    <>
  
      <Routes>
      
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/conversations" element={<ConversationList />} />
        <Route path="/conversations/:id" element={<ChatPage/>} />
        
      </Routes>
    </>
  );
}

export default App;
