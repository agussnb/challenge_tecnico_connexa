# Task Manager | Challenge Tecnico Frontend Developer JR | Connexa

## Descripción del proyecto

"Task Manager" es una aplicación en React que permite al usuario **crear, listar, actualizar y eliminar tareas**, además de cambiar el idioma de la interfaz entre **Español e Inglés**. La aplicación guarda las tareas en `localStorage` para mantener la información aún al recargar la página.

Esta aplicación fue desarrollada siguiendo la consigna del challenge, y existe en dos versiones:

1. **Rama `main`**: Implementación original usando **prop drilling** para pasar el idioma y funciones entre componentes.
2. **Rama `feature/context-composition`**: Misma aplicación, pero con **estructura mejorada** usando **React Context** y **Composition Pattern** para evitar prop drilling y hacer el código más limpio y mantenible.

---

## Funcionalidades

- Crear nuevas tareas con título, descripción, fecha de vencimiento, prioridad y estado.
- Editar tareas existentes.
- Eliminar tareas.
- Cambiar el idioma de la aplicación entre Español e Inglés.
- Ordenar tareas por prioridad y estado.
- Validación de formulario usando **React Hook Form** y **Zod**.
- Persistencia de tareas en `localStorage`.

---

## Estructura de la aplicación

### Componentes principales:

- **TaskForm**: Formulario para crear o editar tareas. 
  - Recibe las funciones de agregar/editar tareas y los textos según el idioma.
- **TaskList**: Lista de tareas con botones para editar, eliminar y ordenar.
- **TaskInput / TaskInputSelect**: Componentes reutilizables de input y select para los formularios.
- **Button**: Componente reutilizable para acciones.

### Contexts (solo en `feature/context-composition`):

- **TasksContext**: Maneja el estado global de las tareas, edición, carga desde `localStorage` y ordenamiento.
- **LanguageContext**: Maneja el idioma actual y los textos para la interfaz.

---

## Tecnologías utilizadas

- React
- React Hook Form
- Zod
- SweetAlert2
- CSS personalizado
- LocalStorage

---

## Cómo usar la aplicación

1. Clonar el repositorio:
   
   git clone <https://github.com/agussnb/challenge_tecnico_connexa.git>
2. Instalar dependencias:
    npm install
3. Ejecutar la aplicación:
    npm run dev
4. Cambiar entre ramas:
    -   Para la versión original (prop drilling):
        git checkout main
    -   Para la versión mejorada (context + composition):
        git checkout feature/context-composition

## Ejemplo de uso
1. Escribir una tarea en el formulario y presionar Agregar / Add según el idioma.

2. La tarea aparecerá en la lista.

3. Se puede editar o eliminar.

4. Cambiando el idioma, todos los textos de la interfaz se actualizan dinámicamente.

## Mejoras realizadas en la rama feature/context-composition
- Reemplazo del prop drilling por React Context para manejar:
    -   Estado global de tareas.
    -   Tarea actual en edición.   
    -   Idioma y textos.
- Uso del Composition Pattern para los inputs del formulario, facilitando la reutilización de componentes (TaskInput, TaskInputSelect) sin depender de props individuales de idioma o funciones.