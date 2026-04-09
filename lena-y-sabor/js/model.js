/* =============================================
   modelo - datos simulados de la aplicacion
   ============================================= */

const Model = (() => {

  /* --- productos del menu --- */
  const productos = [
    {
      id: 1,
      nombre: 'Pollo Entero a la Brasa',
      categoria: 'pollo',
      descripcion: 'Pollo entero marinado con especias secretas, cocido a la brasa con lena seleccionada. Incluye 2 papas y 2 ensaladas.',
      precio: 65.00,
      imagen: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=600&q=80',
      badge: 'Popular',
      disponible: true
    },
    {
      id: 2,
      nombre: '1/2 Pollo a la Brasa',
      categoria: 'pollo',
      descripcion: 'Media ave a la brasa con papas fritas y ensalada. Perfecto para una persona hambrienta.',
      precio: 38.00,
      imagen: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 3,
      nombre: '1/4 Pollo a la Brasa',
      categoria: 'pollo',
      descripcion: 'Cuarto de pollo jugoso con papas y ensalada. La porcion perfecta.',
      precio: 22.00,
      imagen: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 4,
      nombre: 'Combo Familiar Brasa',
      categoria: 'combos',
      descripcion: 'Pollo entero + 4 papas + 4 ensaladas + 4 cremas + 2 gaseosas familiares. Disfruta en familia.',
      precio: 89.00,
      imagen: 'https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?auto=format&fit=crop&w=600&q=80',
      badge: 'Oferta',
      disponible: true
    },
    {
      id: 5,
      nombre: 'Combo Duo Especial',
      categoria: 'combos',
      descripcion: '1/2 pollo para dos personas con 2 papas medianas, 2 ensaladas y 2 gaseosas personales.',
      precio: 52.00,
      imagen: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80',
      badge: 'Nuevo',
      disponible: true
    },
    {
      id: 6,
      nombre: 'Papas Fritas Grandes',
      categoria: 'acompanantes',
      descripcion: 'Papas doradas y crujientes, fritas al momento. Grandes y abundantes.',
      precio: 12.00,
      imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 7,
      nombre: 'Papas Medianas',
      categoria: 'acompanantes',
      descripcion: 'Porcion mediana de papas fritas crocantes, perfectas para acompanar.',
      precio: 8.00,
      imagen: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 8,
      nombre: 'Ensalada Fresca',
      categoria: 'acompanantes',
      descripcion: 'Mix de lechuga, tomate, zanahoria y vinagreta de la casa.',
      precio: 6.00,
      imagen: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 9,
      nombre: 'Gaseosa Personal',
      categoria: 'bebidas',
      descripcion: 'Coca-Cola, Inka Kola, Sprite o Fanta. Bien fria para tu pedido.',
      precio: 5.00,
      imagen: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 10,
      nombre: 'Chicha Morada',
      categoria: 'bebidas',
      descripcion: 'Chicha morada preparada con maiz morado, pina y canela. Bebida tipica peruana.',
      precio: 7.00,
      imagen: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
      badge: 'Artesanal',
      disponible: true
    },
    {
      id: 11,
      nombre: 'Inka Kola 1.5L',
      categoria: 'bebidas',
      descripcion: 'La bebida nacional del Peru. Tamano familiar para toda la mesa.',
      precio: 9.00,
      imagen: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 12,
      nombre: 'Tres Leches de la Casa',
      categoria: 'postres',
      descripcion: 'Bizcocho esponjoso empapado en tres leches, cubierto de crema chantilly. El postre favorito.',
      precio: 10.00,
      imagen: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    },
    {
      id: 13,
      nombre: 'Mazamorra Morada',
      categoria: 'postres',
      descripcion: 'Postre tipico peruano hecho con maiz morado, frutas y canela. Tradicion en cada cucharada.',
      precio: 8.00,
      imagen: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
      badge: 'Tradicional',
      disponible: true
    },
    {
      id: 14,
      nombre: 'Helado de Lucuma',
      categoria: 'postres',
      descripcion: 'Dos bolas de helado artesanal de lucuma, la fruta del Peru.',
      precio: 9.00,
      imagen: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80',
      badge: null,
      disponible: true
    }
  ];

  /* --- usuarios simulados --- */
  const usuarios = [
    { id: 1, nombre: 'Carlos Ramos', email: 'carlos@demo.com', password: '123456', rol: 'admin', telefono: '999-111-222', direccion: 'Av. Javier Prado 1234, Lima' },
    { id: 2, nombre: 'Maria Lopez',  email: 'maria@demo.com',  password: '123456', rol: 'cliente', telefono: '999-333-444', direccion: 'Calle Las Flores 567, Miraflores' },
    { id: 3, nombre: 'Juan Perez',   email: 'juan@demo.com',   password: '123456', rol: 'cliente', telefono: '999-555-666', direccion: 'Jr. Union 890, Lima Centro' }
  ];

  /* --- pedidos simulados --- */
  const pedidos = [
    {
      id: 'PED-001',
      usuarioId: 2,
      fecha: '2025-04-06 19:30',
      estado: 'entregado',
      total: 89.00,
      items: [
        { productoId: 4, nombre: 'Combo Familiar Brasa', precio: 89.00, cantidad: 1 }
      ],
      direccion: 'Calle Las Flores 567, Miraflores',
      metodoPago: 'tarjeta'
    },
    {
      id: 'PED-002',
      usuarioId: 2,
      fecha: '2025-04-07 12:15',
      estado: 'preparando',
      total: 52.00,
      items: [
        { productoId: 5, nombre: 'Combo Duo Especial', precio: 52.00, cantidad: 1 }
      ],
      direccion: 'Calle Las Flores 567, Miraflores',
      metodoPago: 'efectivo'
    },
    {
      id: 'PED-003',
      usuarioId: 3,
      fecha: '2025-04-07 13:00',
      estado: 'pendiente',
      total: 38.00,
      items: [
        { productoId: 2, nombre: '1/2 Pollo a la Brasa', precio: 38.00, cantidad: 1 }
      ],
      direccion: 'Jr. Union 890, Lima Centro',
      metodoPago: 'yape'
    },
    {
      id: 'PED-004',
      usuarioId: 2,
      fecha: '2025-04-07 13:45',
      estado: 'listo',
      total: 42.00,
      items: [
        { productoId: 2, nombre: '1/2 Pollo a la Brasa', precio: 38.00, cantidad: 1 },
        { productoId: 9, nombre: 'Gaseosa Personal',      precio: 4.00,  cantidad: 1 }
      ],
      direccion: 'Calle Las Flores 567, Miraflores',
      metodoPago: 'tarjeta'
    }
  ];

  /* --- inventario simulado --- */
  const inventario = [
    { id: 1, producto: 'Pollo a la Brasa', unidad: 'unidades', stock: 45, minimo: 10, estado: 'ok' },
    { id: 2, producto: 'Papas (kg)',       unidad: 'kg',       stock: 80, minimo: 20, estado: 'ok' },
    { id: 3, producto: 'Gaseosas 1.5L',   unidad: 'botellas',  stock: 8,  minimo: 12, estado: 'bajo' },
    { id: 4, producto: 'Lechuga (kg)',     unidad: 'kg',       stock: 5,  minimo: 5,  estado: 'critico' },
    { id: 5, producto: 'Aji verde (kg)',   unidad: 'kg',       stock: 12, minimo: 5,  estado: 'ok' },
    { id: 6, producto: 'Carbon (sacos)',   unidad: 'sacos',    stock: 3,  minimo: 3,  estado: 'bajo' }
  ];

  /* --- CARRITO (persistido en localStorage) --- */
  let carrito = JSON.parse(localStorage.getItem('lys_carrito') || '[]');

  /* --- usuario en sesion --- */
  let usuarioActual = JSON.parse(sessionStorage.getItem('lys_usuario') || 'null');

  /* --- metodos del modelo --- */
  return {

    /* productos */
    getProductos: () => productos,
    getProductosPorCategoria: (cat) => cat === 'todos' ? productos : productos.filter(p => p.categoria === cat),
    getProductoById: (id) => productos.find(p => p.id === id),

    /* carrito */
    getCarrito: () => carrito,

    addToCarrito(productoId) {
      const producto = productos.find(p => p.id === productoId);
      if (!producto) return;
      const existente = carrito.find(item => item.id === productoId);
      if (existente) {
        existente.cantidad++;
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
      this.saveCarrito();
    },

    removeFromCarrito(productoId) {
      carrito = carrito.filter(item => item.id !== productoId);
      this.saveCarrito();
    },

    updateCantidad(productoId, cantidad) {
      const item = carrito.find(i => i.id === productoId);
      if (!item) return;
      if (cantidad <= 0) {
        this.removeFromCarrito(productoId);
      } else {
        item.cantidad = cantidad;
        this.saveCarrito();
      }
    },

    getTotalCarrito() {
      return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    },

    getCantidadCarrito() {
      return carrito.reduce((total, item) => total + item.cantidad, 0);
    },

    clearCarrito() {
      carrito = [];
      this.saveCarrito();
    },

    saveCarrito() {
      localStorage.setItem('lys_carrito', JSON.stringify(carrito));
    },

    /* usuarios */
    login(email, password) {
      const user = usuarios.find(u => u.email === email && u.password === password);
      if (user) {
        usuarioActual = user;
        sessionStorage.setItem('lys_usuario', JSON.stringify(user));
        return user;
      }
      return null;
    },

    register(nombre, email, password, telefono) {
      const existe = usuarios.find(u => u.email === email);
      if (existe) return null;
      const nuevo = {
        id: usuarios.length + 1,
        nombre, email, password,
        telefono: telefono || '',
        direccion: '',
        rol: 'cliente'
      };
      usuarios.push(nuevo);
      usuarioActual = nuevo;
      sessionStorage.setItem('lys_usuario', JSON.stringify(nuevo));
      return nuevo;
    },

    logout() {
      usuarioActual = null;
      sessionStorage.removeItem('lys_usuario');
    },

    getUsuarioActual: () => usuarioActual,
    isLoggedIn: () => usuarioActual !== null,
    isAdmin: () => usuarioActual && usuarioActual.rol === 'admin',

    /* pedidos */
    getPedidos: () => pedidos,
    getPedidosPorUsuario: (userId) => pedidos.filter(p => p.usuarioId === userId),

    crearPedido(items, direccion, metodoPago) {
      const nuevo = {
        id: `PED-${String(pedidos.length + 1).padStart(3, '0')}`,
        usuarioId: usuarioActual ? usuarioActual.id : 0,
        fecha: new Date().toLocaleString('es-PE'),
        estado: 'pendiente',
        total: items.reduce((t, i) => t + i.precio * i.cantidad, 0) + 5,
        items: items.map(i => ({ productoId: i.id, nombre: i.nombre, precio: i.precio, cantidad: i.cantidad })),
        direccion, metodoPago
      };
      pedidos.push(nuevo);
      return nuevo;
    },

    cambiarEstadoPedido(pedidoId, nuevoEstado) {
      const pedido = pedidos.find(p => p.id === pedidoId);
      if (pedido) pedido.estado = nuevoEstado;
    },

    /* inventario */
    getInventario: () => inventario,

    /* estadisticas para admin */
    getEstadisticas() {
      return {
        totalPedidos:  pedidos.length,
        pedidosPendientes: pedidos.filter(p => p.estado === 'pendiente' || p.estado === 'preparando').length,
        ventasDia:     pedidos.reduce((t, p) => t + p.total, 0),
        totalProductos: productos.length,
        usuariosTotal:  usuarios.length
      };
    }
  };
})();
