# Challenge Tecnico | Frontend Developer JR | Connexa
## Consigna a realizar
Crea una aplicación en React llamada "Task Manager" que permita al usuario:

1. Crear, Listar, Actualizar y Eliminar tareas.

2. Cambiar el idioma entre Español e Inglés usando un botón o selector.

3. Usar props para pasar el idioma seleccionado a los componentes hijos para que los textos se actualicen dinámicamente.

4. Usar useState para manejar:

    - El listado de tareas.

    - El idioma actual.

    - Los valores de los formularios.

5. Usar useEffect para:

    - Guardar las tareas en localStorage cada vez que cambien.

    - Cargar las tareas desde localStorage al iniciar la aplicación.

### Requisitos mínimos:

- Debe haber al menos dos componentes hijos:

    - TaskList → recibe por props la lista de tareas y el idioma.

    - TaskForm → recibe por props el idioma y la función para agregar/editar tareas.

- Textos como "Add Task", "Delete", "Edit", "Save" deben cambiar entre inglés y español.

- Estilo simple pero funcional (puedes usar CSS o Tailwind).

Ejemplo de comportamiento esperado:

   - El usuario escribe una tarea y presiona "Agregar" (o "Add") según el idioma actual.

   - La tarea aparece en la lista.

   - Puede editarla o eliminarla.

   - Si cambia el idioma, todos los textos se actualizan sin recargar la página.