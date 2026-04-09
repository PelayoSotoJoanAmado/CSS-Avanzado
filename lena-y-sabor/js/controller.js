/* =============================================
   controlador - logica de eventos y DOM
   ============================================= */

const Controller = (() => {

  /* --- inicializa la pagina actual --- */
  function init() {
    initNavbar();
    View.updateCartBadge(Model.getCantidadCarrito());

    const page = document.body.dataset.page;
    switch (page) {
      case 'index':    initIndex();    break;
      case 'menu':     initMenu();     break;
      case 'carrito':  initCarrito();  break;
      case 'checkout': initCheckout(); break;
      case 'login':    initLogin();    break;
      case 'register': initRegister(); break;
      case 'pedidos':  initPedidos();  break;
      case 'perfil':   initPerfil();   break;
      case 'admin-dashboard':   initAdminDashboard();   break;
      case 'admin-productos':   initAdminProductos();   break;
      case 'admin-pedidos':     initAdminPedidos();     break;
      case 'admin-inventario':  initAdminInventario();  break;
      case 'admin-config':      break;
    }
  }

  /* --- navbar compartida --- */
  function initNavbar() {
    const user = Model.getUsuarioActual();
    const btnCarrito = document.getElementById('nav-cart-btn');
    const btnPerfil  = document.getElementById('nav-perfil-btn');
    const btnLoginNav = document.getElementById('nav-login-btn');

    if (btnCarrito) {
      btnCarrito.addEventListener('click', () => {
        window.location.href = resolveUrl('carrito.html');
      });
    }

    if (btnPerfil) {
      btnPerfil.addEventListener('click', () => {
        if (user) {
          window.location.href = resolveUrl('perfil.html');
        } else {
          window.location.href = resolveUrl('login.html');
        }
      });
    }

    // logout
    document.querySelectorAll('.btn-logout').forEach(btn => {
      btn.addEventListener('click', () => {
        Model.logout();
        window.location.href = resolveUrl('index.html');
      });
    });

    // actualiza ui segun sesion
    if (user) {
      document.querySelectorAll('.nav-user-name').forEach(el => el.textContent = user.nombre);
      document.querySelectorAll('.show-logged').forEach(el => el.style.display = 'block');
      document.querySelectorAll('.show-guest').forEach(el => el.style.display = 'none');
    } else {
      document.querySelectorAll('.show-logged').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.show-guest').forEach(el => el.style.display = 'block');
    }

    // menu movil toggle
    const toggler = document.getElementById('navbar-toggler');
    const collapse = document.getElementById('navbar-menu');
    if (toggler && collapse) {
      toggler.addEventListener('click', () => {
        collapse.classList.toggle('d-none');
      });
    }
  }

  /* --- resuelve url relativa segun contexto (admin/) --- */
  function resolveUrl(page) {
    const isAdmin = window.location.pathname.includes('/admin/');
    return isAdmin ? `../${page}` : page;
  }

  /* =============================================
     INDEX
     ============================================= */
  function initIndex() {
    // boton pedir ahora en hero
    document.getElementById('btn-pedir-ahora')?.addEventListener('click', () => {
      window.location.href = 'menu.html';
    });
    document.getElementById('btn-ver-menu')?.addEventListener('click', () => {
      window.location.href = 'menu.html';
    });

    // render de productos destacados en el home
    renderProductosDestacados();
    initAddToCartButtons();
  }

  function renderProductosDestacados() {
    const container = document.getElementById('productos-destacados');
    if (!container) return;
    const destacados = Model.getProductos().slice(0, 4);
    container.innerHTML = destacados.map(p => View.renderProductCard(p)).join('');
  }

  /* =============================================
     MENU
     ============================================= */
  function initMenu() {
    renderMenu('todos');
    initCategoryChips();
    initSearch();
    initAddToCartButtons();
  }

  function renderMenu(categoria) {
    const container = document.getElementById('menu-grid');
    if (!container) return;
    const productos = Model.getProductosPorCategoria(categoria);
    if (productos.length === 0) {
      container.innerHTML = View.renderEmptyState('🍗', 'Sin productos', 'No hay productos en esta categoria.');
      return;
    }
    container.innerHTML = `<div class="row g-3">${productos.map(p => View.renderProductCard(p)).join('')}</div>`;
    initAddToCartButtons();
  }

  function initCategoryChips() {
    document.querySelectorAll('.category-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        renderMenu(chip.dataset.cat);
      });
    });
  }

  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const container = document.getElementById('menu-grid');
      if (!q) { renderMenu('todos'); return; }
      const results = Model.getProductos().filter(p =>
        p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q)
      );
      if (results.length === 0) {
        container.innerHTML = View.renderEmptyState('🔍', 'Sin resultados', `No encontramos "${input.value}" en el menu.`);
        return;
      }
      container.innerHTML = `<div class="row g-3">${results.map(p => View.renderProductCard(p)).join('')}</div>`;
      initAddToCartButtons();
    });
  }

  /* --- botones agregar al carrito (compartido) --- */
  function initAddToCartButtons() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        Model.addToCarrito(id);
        View.updateCartBadge(Model.getCantidadCarrito());
        const prod = Model.getProductoById(id);
        View.showToast(`${prod.nombre} agregado al carrito`, 'success');
        // animacion del boton
        btn.textContent = '✓';
        btn.style.background = '#50c878';
        setTimeout(() => {
          btn.textContent = '+';
          btn.style.background = '';
        }, 1000);
      });
    });
  }

  /* =============================================
     CARRITO
     ============================================= */
  function initCarrito() {
    renderCarrito();
  }

  function renderCarrito() {
    const container = document.getElementById('carrito-items');
    const resumen   = document.getElementById('carrito-resumen');
    if (!container) return;

    const items = Model.getCarrito();

    if (items.length === 0) {
      container.innerHTML = View.renderEmptyState('🛒', 'Tu carrito esta vacio', 'Agrega productos desde el menu.');
      if (resumen) resumen.style.display = 'none';
      return;
    }

    if (resumen) resumen.style.display = 'block';
    container.innerHTML = items.map(i => View.renderCartItem(i)).join('');

    // subtotal, delivery, total
    const subtotal = Model.getTotalCarrito();
    const delivery = 5.00;
    const total    = subtotal + delivery;

    document.getElementById('cart-subtotal') && (document.getElementById('cart-subtotal').textContent = `S/ ${subtotal.toFixed(2)}`);
    document.getElementById('cart-delivery') && (document.getElementById('cart-delivery').textContent = `S/ ${delivery.toFixed(2)}`);
    document.getElementById('cart-total')    && (document.getElementById('cart-total').textContent    = `S/ ${total.toFixed(2)}`);

    // eventos de cantidad
    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = Model.getCarrito().find(i => i.id === id);
        if (item) Model.updateCantidad(id, item.cantidad + 1);
        View.updateCartBadge(Model.getCantidadCarrito());
        renderCarrito();
      });
    });

    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = Model.getCarrito().find(i => i.id === id);
        if (item) Model.updateCantidad(id, item.cantidad - 1);
        View.updateCartBadge(Model.getCantidadCarrito());
        renderCarrito();
      });
    });

    document.querySelectorAll('.btn-remove-cart').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const item = Model.getCarrito().find(i => i.id === id);
        Model.removeFromCarrito(id);
        View.updateCartBadge(Model.getCantidadCarrito());
        View.showToast(`${item?.nombre || 'Producto'} eliminado del carrito`, 'info');
        renderCarrito();
      });
    });

    // boton vaciar carrito
    document.getElementById('btn-vaciar-carrito')?.addEventListener('click', () => {
      if (confirm('¿Seguro que quieres vaciar el carrito?')) {
        Model.clearCarrito();
        View.updateCartBadge(0);
        renderCarrito();
      }
    });

    // boton ir a checkout
    document.getElementById('btn-checkout')?.addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
  }

  /* =============================================
     CHECKOUT
     ============================================= */
  function initCheckout() {
    const items = Model.getCarrito();
    const resumen = document.getElementById('checkout-resumen');
    if (resumen && items.length > 0) {
      const subtotal = Model.getTotalCarrito();
      const delivery = 5.00;
      const total    = subtotal + delivery;
      resumen.innerHTML = `
        ${items.map(i => `
          <div class="d-flex justify-content-between mb-2" style="font-size:0.88rem;">
            <span>${i.nombre} <span style="color:var(--on-muted)">x${i.cantidad}</span></span>
            <span style="color:var(--secondary);font-weight:700">S/ ${(i.precio * i.cantidad).toFixed(2)}</span>
          </div>
        `).join('')}
        <hr style="border-color:rgba(255,255,255,0.06)">
        <div class="summary-row"><span>Subtotal</span><span>S/ ${subtotal.toFixed(2)}</span></div>
        <div class="summary-row"><span>Delivery</span><span>S/ ${delivery.toFixed(2)}</span></div>
        <div class="summary-row total"><span>Total</span><span>S/ ${total.toFixed(2)}</span></div>
      `;
    }

    // formulario de checkout
    const form = document.getElementById('form-checkout');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validarFormCheckout()) return;
        const direccion    = document.getElementById('co-direccion').value;
        const metodoPago   = document.getElementById('co-metodo').value;
        const items        = Model.getCarrito();
        const nuevoPedido  = Model.crearPedido(items, direccion, metodoPago);
        Model.clearCarrito();
        View.updateCartBadge(0);
        View.showToast(`Pedido ${nuevoPedido.id} realizado con exito!`, 'success');
        setTimeout(() => window.location.href = 'pedidos.html', 1500);
      });
    }
  }

  function validarFormCheckout() {
    let ok = true;
    ['co-nombre','co-telefono','co-direccion','co-metodo'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.value.trim()) {
        el.style.borderColor = 'rgba(235,0,0,0.6)';
        ok = false;
      } else {
        el.style.borderColor = '';
      }
    });
    if (!ok) View.showToast('Completa todos los campos requeridos', 'error');
    return ok;
  }

  /* =============================================
     LOGIN
     ============================================= */
  function initLogin() {
    const form = document.getElementById('form-login');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email    = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const user = Model.login(email, password);
      if (user) {
        View.showToast(`Bienvenido, ${user.nombre}!`, 'success');
        setTimeout(() => {
          window.location.href = user.rol === 'admin' ? 'admin/dashboard.html' : 'index.html';
        }, 1000);
      } else {
        View.showToast('Email o contrasena incorrectos', 'error');
        document.getElementById('login-email').style.borderColor = 'rgba(235,0,0,0.6)';
        document.getElementById('login-password').style.borderColor = 'rgba(235,0,0,0.6)';
      }
    });
  }

  /* =============================================
     REGISTRO
     ============================================= */
  function initRegister() {
    const form = document.getElementById('form-register');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre   = document.getElementById('reg-nombre').value.trim();
      const email    = document.getElementById('reg-email').value.trim();
      const tel      = document.getElementById('reg-telefono').value.trim();
      const pass     = document.getElementById('reg-password').value;
      const pass2    = document.getElementById('reg-password2').value;

      if (!nombre || !email || !pass) { View.showToast('Completa todos los campos', 'error'); return; }
      if (pass !== pass2) { View.showToast('Las contrasenas no coinciden', 'error'); return; }
      if (pass.length < 6) { View.showToast('La contrasena debe tener al menos 6 caracteres', 'warning'); return; }

      const user = Model.register(nombre, email, pass, tel);
      if (user) {
        View.showToast('Cuenta creada exitosamente!', 'success');
        setTimeout(() => window.location.href = 'index.html', 1200);
      } else {
        View.showToast('El email ya esta registrado', 'error');
      }
    });
  }

  /* =============================================
     PEDIDOS CLIENTE
     ============================================= */
  function initPedidos() {
    const container = document.getElementById('pedidos-list');
    if (!container) return;
    const user = Model.getUsuarioActual();
    let pedidos = user ? Model.getPedidosPorUsuario(user.id) : Model.getPedidos().slice(0, 3);

    if (pedidos.length === 0) {
      container.innerHTML = View.renderEmptyState('📦', 'Sin pedidos', 'Aun no tienes pedidos. Haz tu primer pedido ahora.');
      return;
    }
    container.innerHTML = pedidos.reverse().map(p => View.renderOrderCard(p)).join('');
  }

  /* =============================================
     PERFIL
     ============================================= */
  function initPerfil() {
    const user = Model.getUsuarioActual();
    if (!user) { window.location.href = 'login.html'; return; }

    document.getElementById('perfil-nombre')   && (document.getElementById('perfil-nombre').textContent   = user.nombre);
    document.getElementById('perfil-email')    && (document.getElementById('perfil-email').textContent    = user.email);
    document.getElementById('perfil-telefono') && (document.getElementById('perfil-telefono').textContent = user.telefono || 'No registrado');

    document.getElementById('perfil-nombre-input')   && (document.getElementById('perfil-nombre-input').value   = user.nombre);
    document.getElementById('perfil-email-input')    && (document.getElementById('perfil-email-input').value    = user.email);
    document.getElementById('perfil-telefono-input') && (document.getElementById('perfil-telefono-input').value = user.telefono || '');

    // pedidos recientes del usuario
    const pedidosContainer = document.getElementById('perfil-pedidos');
    if (pedidosContainer) {
      const pedidos = Model.getPedidosPorUsuario(user.id).slice(0, 3);
      pedidosContainer.innerHTML = pedidos.length > 0
        ? pedidos.map(p => View.renderOrderCard(p)).join('')
        : View.renderEmptyState('📦', 'Sin pedidos', 'Aun no tienes pedidos');
    }
  }

  /* =============================================
     ADMIN - DASHBOARD
     ============================================= */
  function initAdminDashboard() {
    if (!checkAdmin()) return;
    const stats = Model.getEstadisticas();
    document.getElementById('stat-pedidos')    && (document.getElementById('stat-pedidos').textContent    = stats.totalPedidos);
    document.getElementById('stat-pendientes') && (document.getElementById('stat-pendientes').textContent = stats.pedidosPendientes);
    document.getElementById('stat-ventas')     && (document.getElementById('stat-ventas').textContent     = `S/ ${stats.ventasDia.toFixed(2)}`);
    document.getElementById('stat-productos')  && (document.getElementById('stat-productos').textContent  = stats.totalProductos);

    // tabla de ultimos pedidos
    const tablaContainer = document.getElementById('admin-ultimos-pedidos');
    if (tablaContainer) {
      const pedidos = Model.getPedidos().slice(-5).reverse();
      const rows = pedidos.map(p => View.renderOrderRow(p)).join('');
      tablaContainer.innerHTML = `
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      `;
      initSelectEstado();
    }
  }

  /* =============================================
     ADMIN - PRODUCTOS
     ============================================= */
  function initAdminProductos() {
    if (!checkAdmin()) return;
    renderTablaProductos();

    document.getElementById('btn-add-product')?.addEventListener('click', () => {
      View.showToast('Modal de creacion de producto (por implementar con backend)', 'info');
    });
  }

  function renderTablaProductos() {
    const container = document.getElementById('admin-productos-tabla');
    if (!container) return;
    const rows = Model.getProductos().map(p => View.renderProductRow(p)).join('');
    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  /* =============================================
     ADMIN - PEDIDOS
     ============================================= */
  function initAdminPedidos() {
    if (!checkAdmin()) return;
    renderTablaPedidos();
  }

  function renderTablaPedidos() {
    const container = document.getElementById('admin-pedidos-tabla');
    if (!container) return;
    const rows = Model.getPedidos().reverse().map(p => View.renderOrderRow(p)).join('');
    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Cambiar Estado</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    initSelectEstado();
  }

  function initSelectEstado() {
    document.querySelectorAll('.select-estado').forEach(select => {
      select.addEventListener('change', () => {
        const id = select.dataset.id;
        const nuevoEstado = select.value;
        Model.cambiarEstadoPedido(id, nuevoEstado);
        View.showToast(`Pedido ${id} actualizado a: ${nuevoEstado}`, 'success');
        // re-render la fila para actualizar badge
        const row = select.closest('tr');
        const badgeCell = row.children[4];
        const estadoMap = {
          pendiente: 'badge-pending', preparando: 'badge-preparing',
          listo: 'badge-ready', entregado: 'badge-delivered', cancelado: 'badge-cancelled'
        };
        badgeCell.innerHTML = `<span class="badge-status ${estadoMap[nuevoEstado]}">${nuevoEstado.charAt(0).toUpperCase() + nuevoEstado.slice(1)}</span>`;
      });
    });
  }

  /* =============================================
     ADMIN - INVENTARIO
     ============================================= */
  function initAdminInventario() {
    if (!checkAdmin()) return;
    const container = document.getElementById('admin-inventario-tabla');
    if (!container) return;
    const rows = Model.getInventario().map(i => View.renderInventarioRow(i)).join('');
    container.innerHTML = `
      <table class="admin-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Unidad</th>
            <th>Stock Actual</th>
            <th>Minimo</th>
            <th>Nivel</th>
            <th>Estado</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
  }

  /* --- verifica que el usuario sea admin --- */
  function checkAdmin() {
    if (!Model.isAdmin()) {
      window.location.href = '../login.html';
      return false;
    }
    return true;
  }

  /* =============================================
     INICIALIZACION GLOBAL
     ============================================= */
  document.addEventListener('DOMContentLoaded', init);

  return { init, initAddToCartButtons };
})();
