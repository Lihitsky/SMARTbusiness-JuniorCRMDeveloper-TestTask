import "./App.css";
import AppLayout from "./components/layouts/AppLayout";
import AppRouter from "./routes/AppRouter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </>
  );
}

export default App;
