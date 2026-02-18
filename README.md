# 📡 SensorFlow - Dashboard Reactivo

Este proyecto es una demostración práctica de los fundamentos de la **Programación Reactiva** aplicada al desarrollo Web moderno, utilizando un stack basado en JavaScript (React + Node.js).

---

## 🚀 Temas Cubiertos

### 1.1 Definición de Programación Reactiva
En este Dashboard, la interactividad no se logra manipulando elementos de forma aislada, sino mediante el manejo de **flujos de datos**:
* **Hooks de Estado**: Uso de `useState` para crear variables que, al cambiar, notifican a la interfaz.
* **Efectos Secundarios**: Uso de `useEffect` para sincronizar el estado local con la API externa al cargar el componente.
* **Paradigma**: La interfaz se comporta bajo la premisa **$UI = f(state)$**, donde la vista es una consecuencia directa del estado actual.

### 1.2 Evolución del Desarrollo Web
* **Antes (Imperativo):** Se usaban librerías como **jQuery** para buscar elementos en el DOM (`$('#valor').html(...)`) y actualizarlos manualmente cada vez que algo ocurría.
* **Ahora (Declarativo):** Con **React**, nosotros simplemente declaramos *cómo* debe verse la interfaz según los datos. Si el array de sensores crece, React se encarga de renderizar los nuevos elementos de forma eficiente.

### 1.3 Web y Móvil
* **Responsive Design**: Implementación de **CSS Grid** y **Media Queries** para asegurar que el dashboard sea funcional en móviles y tablets.
* **Portabilidad**: La lógica de negocio y los hooks utilizados son 100% compatibles con **React Native**, facilitando la transición a una App móvil nativa.

### 1.4 Frameworks y APIs Utilizados
* **Frontend**: React + Vite (Entorno de desarrollo ultra rápido).
* **Backend**: Node.js + Express.js (Creación de una API REST minimalista).
* **Comunicación**: Uso de **Fetch API** para el intercambio de datos en formato **JSON**.

---

## 🛠️ Cómo Ejecutar el Proyecto

Sigue estos pasos para levantar el entorno local:

### 1. Levantar el Backend
Abre una terminal en la raíz del proyecto:
```bash
cd server
npm install   # Solo la primera vez
npm run dev