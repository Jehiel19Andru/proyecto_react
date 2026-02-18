// client/src/App.jsx
// ============================================
// FRONTEND: Dashboard Reactivo con React
// ============================================
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // ============================================
  // 1 ESTADO REACTIVO
  // ============================================
  const [sensores, setSensores] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    tipo: '',
    valor: ''
  });
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // URL de tu API en Render
  const API_URL = 'https://proyecto-react-np8y.onrender.com/api/sensores';

  // ============================================
  // 2 EFECTOS SECUNDARIOS (Ciclo de vida)
  // ============================================
  useEffect(() => {
    cargarSensores();
  }, []);

  // --- Función para obtener datos (GET) ---
  const cargarSensores = async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(API_URL);
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      const datos = await respuesta.json();
      setSensores(datos);
    } catch (err) {
      console.error("Error al cargar sensores:", err);
      setError("No se pudo conectar con el servidor. ¿Está despertando el backend?");
    } finally {
      setCargando(false);
    }
  };

  // --- Manejar cambios en los inputs ---
  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  // --- Agregar nuevo sensor (POST) ---
  const agregarSensor = async (e) => {
    e.preventDefault();
    if (!formulario.nombre || !formulario.tipo || !formulario.valor) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
      });

      if (!respuesta.ok) throw new Error("Error al crear sensor");
      
      setFormulario({ nombre: '', tipo: '', valor: '' });
      cargarSensores(); // Recarga la lista automáticamente
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Error al agregar el sensor");
    }
  };

  // --- Eliminar sensor (DELETE) ---
  const eliminarSensor = async (id) => {
    if (!confirm(`¿Estás seguro de eliminar este sensor?`)) return;

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      
      if (!respuesta.ok) throw new Error("Error al eliminar");
      cargarSensores();
    } catch (err) {
      console.error("❌ Error al eliminar:", err);
      alert("Error al eliminar el sensor");
    }
  };

  // Lógica de filtrado
  const sensoresFiltrados = filtroTipo === 'todos'
    ? sensores
    : sensores.filter(s => s.tipo === filtroTipo);

  // ============================================
  // 3 VISTA DECLARATIVA (JSX)
  // ============================================
  return (
    <div className="contenedor">
      <header>
        <h1>📡 SensorFlow Dashboard</h1>
        <p className="subtitulo">Programación Reactiva con React + Node.js</p>
      </header>

      {/* Formulario */}
      <form onSubmit={agregarSensor} className="formulario">
        <input
          name="nombre"
          placeholder="Nombre (ej. Sala)"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
        <select
          name="tipo"
          value={formulario.tipo}
          onChange={manejarCambio}
          required
        >
          <option value="">Tipo...</option>
          <option value="Temperatura">🌡️ Temperatura</option>
          <option value="Humedad">💧 Humedad</option>
          <option value="Luz">☀️ Luz</option>
        </select>
        <input
          name="valor"
          type="number"
          placeholder="Valor"
          value={formulario.valor}
          onChange={manejarCambio}
          required
        />
        <button type="submit" disabled={cargando}>
          {cargando ? 'Enviando...' : '➕ Agregar'}
        </button>
      </form>

      {/* Filtros */}
      <div className="filtros">
        <label>Filtrar por tipo: </label>
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="Temperatura">Temperatura</option>
          <option value="Humedad">Humedad</option>
          <option value="Luz">Luz</option>
        </select>
      </div>

      {/* Mensajes de estado */}
      {error && <div className="error">⚠️ {error}</div>}
      {cargando && !sensores.length && <div className="cargando">⏳ Conectando con el servidor...</div>}

      {/* Grid de Sensores */}
      <div className="grid-sensores">
        {sensoresFiltrados.map((sensor) => (
          <article key={sensor.id} className="tarjeta-sensor">
            <h3>{sensor.nombre}</h3>
            <p className="tipo">🏷️ {sensor.tipo}</p>
            <p className="valor">
              📊 {sensor.valor} 
              {sensor.tipo === 'Temperatura' ? '°C' : sensor.tipo === 'Humedad' ? '%' : ' lux'}
            </p>
            <button
              onClick={() => eliminarSensor(sensor.id)}
              className="btn-eliminar"
            >
              🗑️ Eliminar
            </button>
          </article>
        ))}
      </div>

      {/* Mensaje vacío */}
      {sensoresFiltrados.length === 0 && !cargando && (
        <p className="vacio">No hay sensores para mostrar.</p>
      )}
    </div>
  )
}

export default App
