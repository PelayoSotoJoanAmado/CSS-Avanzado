/* =============================================
   vista - funciones de renderizado del DOM
   ============================================= */

const View = (() => {

  /* --- renderiza una card de producto --- */
  function renderProductCard(producto) {
    const badge = producto.badge
      ? `<span class="product-badge">${producto.badge}</span>`
      : '';

    return `
      <div class="col-6 col-md-4 col-lg-3 fade-up">
        <div class="product-card" data-id="${producto.id}">
          <div class="product-card-img-wrap">
            <img
              class="product-card-img"
              src="${producto.imagen}"
              alt="${producto.nombre}"
              loading="lazy"
              onerror="this.src='https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=600&q=80'"
            />
            ${badge}
          </div>
          <div class="product-card-body">
            <div class="product-category">${producto.categoria}</div>
            <div class="product-name">${producto.nombre}</div>
            <div class="product-desc">${producto.descripcion}</div>
            <div class="product-footer">
              <span class="product-price">S/ ${producto.precio.toFixed(2)}</span>
              <button class="btn-add-cart" data-id="${producto.id}" title="Agregar al carrito">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /* --- renderiza items del carrito --- */
  function renderCartItem(item) {
    return `
      <div class="cart-item" data-id="${item.id}">
        <img
          class="cart-item-img"
          src="${item.imagen}"
          alt="${item.nombre}"
          onerror="this.src='https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=200&q=80'"
        />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nombre}</div>
          <div class="cart-item-price">S/ ${item.precio.toFixed(2)} c/u</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn btn-qty-minus" data-id="${item.id}">−</button>
          <span class="qty-value">${item.cantidad}</span>
          <button class="qty-btn btn-qty-plus" data-id="${item.id}">+</button>
        </div>
        <div style="min-width:70px;text-align:right;">
          <div style="font-weight:800;color:var(--secondary);">
            S/ ${(item.precio * item.cantidad).toFixed(2)}
          </div>
          <button class="btn-danger-lys mt-1 btn-remove-cart" data-id="${item.id}">Quitar</button>
        </div>
      </div>
    `;
  }

  /* --- renderiza fila de pedido en tabla admin --- */
  function renderOrderRow(pedido) {
    const estadoMap = {
      pendiente:  'badge-pending',
      preparando: 'badge-preparing',
      listo:      'badge-ready',
      entregado:  'badge-delivered',
      cancelado:  'badge-cancelled'
    };
    const cls   = estadoMap[pedido.estado] || 'badge-pending';
    const label = pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1);

    return `
      <tr>
        <td style="font-weight:800;color:var(--secondary)">${pedido.id}</td>
        <td>${pedido.fecha}</td>
        <td>${pedido.items.map(i => `${i.nombre} x${i.cantidad}`).join(', ')}</td>
        <td style="font-weight:700;color:var(--secondary)">S/ ${pedido.total.toFixed(2)}</td>
        <td><span class="badge-status ${cls}">${label}</span></td>
        <td>
          <select class="form-control-lys py-1 px-2 select-estado" data-id="${pedido.id}" style="font-size:0.8rem;padding:0.3rem 0.5rem;">
            <option value="pendiente"  ${pedido.estado==='pendiente'  ? 'selected':''}>Pendiente</option>
            <option value="preparando" ${pedido.estado==='preparando' ? 'selected':''}>Preparando</option>
            <option value="listo"      ${pedido.estado==='listo'      ? 'selected':''}>Listo</option>
            <option value="entregado"  ${pedido.estado==='entregado'  ? 'selected':''}>Entregado</option>
            <option value="cancelado"  ${pedido.estado==='cancelado'  ? 'selected':''}>Cancelado</option>
          </select>
        </td>
      </tr>
    `;
  }

  /* --- renderiza card de pedido del cliente --- */
  function renderOrderCard(pedido) {
    const estadoMap = {
      pendiente:  'badge-pending',
      preparando: 'badge-preparing',
      listo:      'badge-ready',
      entregado:  'badge-delivered',
      cancelado:  'badge-cancelled'
    };
    const cls   = estadoMap[pedido.estado] || 'badge-pending';
    const label = pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1);

    const steps = ['Pendiente', 'Preparando', 'Listo', 'Entregado'];
    const currentIdx = steps.map(s => s.toLowerCase()).indexOf(pedido.estado);

    let timelineHtml = '';
    steps.forEach((step, i) => {
      const isDone    = i < currentIdx;
      const isCurrent = i === currentIdx;
      const dotClass  = isDone ? 'done' : isCurrent ? 'current' : '';
      const lineClass = isDone ? 'done' : '';
      timelineHtml += `
        <div class="timeline-step">
          <div class="timeline-dot ${dotClass}">
            ${isDone ? '✓' : i + 1}
          </div>
          <div class="timeline-label">${step}</div>
        </div>
      `;
      if (i < steps.length - 1) {
        timelineHtml += `<div class="timeline-line ${lineClass}" style="margin-bottom:1.2rem;"></div>`;
      }
    });

    const itemsList = pedido.items
      .map(i => `<span>${i.nombre} <strong style="color:var(--secondary)">x${i.cantidad}</strong></span>`)
      .join(' &bull; ');

    return `
      <div class="order-card fade-up">
        <div class="d-flex align-items-start justify-content-between flex-wrap gap-2">
          <div>
            <div class="order-id">${pedido.id}</div>
            <div class="order-date">${pedido.fecha}</div>
            <div style="font-size:0.82rem;color:var(--on-muted);margin-top:0.4rem;">${itemsList}</div>
          </div>
          <div class="text-end">
            <div class="order-total">S/ ${pedido.total.toFixed(2)}</div>
            <span class="badge-status ${cls} mt-1">${label}</span>
          </div>
        </div>
        ${pedido.estado !== 'cancelado' && pedido.estado !== 'entregado' ? `
          <div class="order-timeline mt-3">${timelineHtml}</div>
        ` : ''}
      </div>
    `;
  }

  /* --- renderiza fila de producto en tabla admin --- */
  function renderProductRow(p) {
    const dispLabel = p.disponible
      ? '<span class="badge-status badge-ready">Disponible</span>'
      : '<span class="badge-status badge-cancelled">Inactivo</span>';

    return `
      <tr>
        <td>
          <img src="${p.imagen}" alt="${p.nombre}"
               style="width:48px;height:48px;object-fit:cover;border-radius:0.4rem;"
               onerror="this.src='https://images.unsplash.com/photo-1598103442097-8b74394b95c3?auto=format&fit=crop&w=100&q=80'"/>
        </td>
        <td style="font-weight:700">${p.nombre}</td>
        <td style="text-transform:capitalize">${p.categoria}</td>
        <td style="color:var(--secondary);font-weight:700">S/ ${p.precio.toFixed(2)}</td>
        <td>${dispLabel}</td>
        <td>
          <button class="btn-ghost-lys" style="font-size:0.78rem;padding:0.3rem 0.7rem;" title="Editar">✏️</button>
          <button class="btn-danger-lys ms-1" style="font-size:0.78rem;" title="Eliminar">🗑</button>
        </td>
      </tr>
    `;
  }

  /* --- renderiza fila de inventario --- */
  function renderInventarioRow(item) {
    const estMap = {
      ok:      '<span class="badge-status badge-ready">OK</span>',
      bajo:    '<span class="badge-status badge-pending">Bajo</span>',
      critico: '<span class="badge-status badge-preparing">Critico</span>'
    };
    const progPct = Math.min(100, Math.round((item.stock / (item.minimo * 3)) * 100));
    const progColor = item.estado === 'ok' ? '#50c878' : item.estado === 'bajo' ? 'var(--secondary)' : 'var(--primary-cta)';

    return `
      <tr>
        <td style="font-weight:700">${item.producto}</td>
        <td>${item.unidad}</td>
        <td style="font-weight:800;color:var(--secondary)">${item.stock}</td>
        <td>${item.minimo}</td>
        <td>
          <div style="background:var(--surface-highest);border-radius:4px;height:6px;width:100px;">
            <div style="background:${progColor};height:6px;border-radius:4px;width:${progPct}%;transition:width 0.5s;"></div>
          </div>
        </td>
        <td>${estMap[item.estado] || ''}</td>
        <td>
          <button class="btn-secondary-lys" style="font-size:0.78rem;padding:0.3rem 0.8rem;">Reponer</button>
        </td>
      </tr>
    `;
  }

  /* --- toast de notificacion --- */
  function showToast(mensaje, tipo = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-lys';
    toast.innerHTML = `
      <span class="toast-icon">${icons[tipo] || '✅'}</span>
      <span class="toast-msg">${mensaje}</span>
      <button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--on-muted);font-size:1rem;cursor:pointer;padding:0 0.3rem;">×</button>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  /* --- actualiza el badge del carrito en el navbar --- */
  function updateCartBadge(cantidad) {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cantidad;
      el.style.display = cantidad > 0 ? 'flex' : 'none';
    });
  }

  /* --- estado vacio --- */
  function renderEmptyState(icono, titulo, mensaje) {
    return `
      <div class="empty-state">
        <div class="icon">${icono}</div>
        <h3>${titulo}</h3>
        <p>${mensaje}</p>
      </div>
    `;
  }

  return {
    renderProductCard,
    renderCartItem,
    renderOrderRow,
    renderOrderCard,
    renderProductRow,
    renderInventarioRow,
    showToast,
    updateCartBadge,
    renderEmptyState
  };
})();
