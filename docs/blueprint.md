# **App Name**: OrdenaFlow

## Core Features:

- Registro de Pedido: Permite a los clientes registrar nuevos pedidos introduciendo el producto, la cantidad y sus datos básicos en un formulario. Los datos se guardan en Firebase Firestore.
- Listado de Pedidos: Como administrador, se puede visualizar una tabla con todos los pedidos existentes, mostrando el cliente, producto, cantidad y estado actual.
- Actualización de Estado: Funcionalidad para que el administrador actualice el estado de un pedido (por ejemplo, de 'Pendiente' a 'Entregado') directamente desde la tabla de listado.
- Eliminación de Pedido: Permite al administrador eliminar pedidos de la base de datos de Firebase Firestore si fueron ingresados por error.
- Generación de Resumen de Pedidos (AI): Una herramienta impulsada por IA que genera un resumen conciso para el administrador, destacando el número de pedidos pendientes y los productos más solicitados en un período reciente.

## Style Guidelines:

- La paleta se basa en la claridad y eficiencia tecnológica. Color principal: Azul vibrante (#3077FF) para acciones principales y elementos de marca, transmitiendo modernidad y fiabilidad. Este color tiene una HSL de 220, 80%, 50%.
- El color de fondo principal es un azul muy claro y desaturado (#EEF3F7), visualmente relacionado con el primario pero lo suficientemente suave para una fácil lectura del contenido. Este color tiene una HSL de 220, 15%, 95%.
- Color de acento: Turquesa vibrante (#3BC9E2), usado para resaltados y elementos interactivos secundarios para crear contraste. Este color tiene una HSL de 190, 70%, 60%.
- Para todos los textos (títulos y cuerpo), se recomienda la fuente 'Inter', una sans-serif moderna y neutral que garantiza una excelente legibilidad en formularios y tablas de datos.
- Se utilizarán iconos claros y sencillos para las acciones de CRUD (añadir, editar, eliminar) y para indicar el estado del pedido, siguiendo el estilo minimalista de TailwindCSS.
- El diseño priorizará la limpieza y la usabilidad. Se utilizará un layout responsivo con un formulario de registro de pedidos claro en la parte superior o lateral, y una tabla bien estructurada para el listado de pedidos con filtros básicos. Gran cantidad de espacio en blanco para facilitar la digestión de la información.
- Animaciones sutiles y rápidas para retroalimentación visual al realizar acciones, como un ligero fade-in/out al eliminar un pedido o un cambio de color breve al actualizar su estado, para no interrumpir el flujo del usuario.