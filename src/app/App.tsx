import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
