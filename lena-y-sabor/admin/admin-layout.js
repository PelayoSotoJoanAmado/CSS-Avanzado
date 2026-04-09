/* =============================================
   layout compartido del admin - sidebar
   ============================================= */

/* genera el HTML del sidebar en cada pagina admin */
function renderAdminSidebar(activePage) {
  const links = [
    { id: 'dashboard',    label: 'Dashboard',    icon: 'dashboard',     url: 'dashboard.html' },
    { id: 'pedidos',      label: 'Pedidos',      icon: 'receipt_long',  url: 'pedidos.html' },
    { id: 'productos',    label: 'Productos',    icon: 'restaurant_menu', url: 'productos.html' },
    { id: 'inventario',   label: 'Inventario',   icon: 'inventory_2',   url: 'inventario.html' },
    { id: 'config',       label: 'Configuracion', icon: 'settings',     url: 'configuracion.html' }
  ];

  const linksHtml = links.map(link => `
    <a href="${link.url}" class="sidebar-link ${activePage === link.id ? 'active' : ''}">
      <span class="material-icons">${link.icon}</span>
      ${link.label}
      ${link.id === 'pedidos' ? '<span class="cart-badge" style="position:static;margin-left:auto;font-size:0.6rem;">4</span>' : ''}
    </a>
  `).join('');

  return `
    <div class="sidebar-brand">
      🔥 Leña y Sabor
      <span style="font-size:0.6rem;background:rgba(235,0,0,0.2);color:var(--primary);padding:0.15rem 0.4rem;border-radius:3px;letter-spacing:0.1em;margin-left:0.4rem;">ADMIN</span>
    </div>
    <div class="sidebar-section">Principal</div>
    ${linksHtml}
    <div style="margin-top:auto;padding:1.5rem;">
      <a href="../index.html" class="sidebar-link" style="color:var(--secondary);">
        <span class="material-icons">storefront</span>
        Ver Tienda
      </a>
      <button class="btn-logout sidebar-link" style="width:100%;background:none;border:none;cursor:pointer;color:var(--primary);">
        <span class="material-icons">logout</span>
        Cerrar Sesion
      </button>
    </div>
  `;
}
