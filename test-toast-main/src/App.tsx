import { ToastProvider, useToast } from "./context/ToastContext";
import "./App.css";

const TriggerButtons = () => {
  const addToast = useToast(); 

  const handleSuccess = () => {
    addToast({
      text: "Успех!",
      type: "success",
    });
  };

  const handleError = () => {
    addToast({
      text: "Ошибка!",
      type: "error",
      duration: 5000,
    });
  };

  const handleWarning = () => {
    addToast({
      text: "Предупрежение",
      type: "warning",
    });
  };

  return (
    <div className="card">
      <h2>Test Controls</h2>
      <div className="buttons-grid">
        <button className="btn-success" onClick={handleSuccess}>
          Success Toast
        </button>

        <button className="btn-error" onClick={handleError}>
          Error (5s)
        </button>

        <button className="btn-warning" onClick={handleWarning}>
          Warning
        </button>
      </div>
      <p style={{ marginTop: 20, color: "#888" }}>Наведите курсор на тост, чтобы приостановить таймер.</p>
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <div className="app-layout">
        <header className="header">
          <h1>Система управления тостами</h1>
        </header>

        <main className="content">
          <TriggerButtons />
          <div className="dummy-content">
            <p>Основная область содержимого</p>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}

export default App;
