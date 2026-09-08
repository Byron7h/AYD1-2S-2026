import { useState, useEffect } from "react";

const API = "/api";

type Product = { id: number; name: string; price: number; stock: number };
type Order   = { id: number; customerEmail: string; total: number; status: string };

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en la API");
  return data as T;
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f59e0b", CONFIRMED: "#10b981", SHIPPED: "#6366f1", CANCELLED: "#ef4444",
};

function Badge({ status }: { status: string }) {
  const c = STATUS_COLORS[status] ?? "#888";
  return (
    <span style={{ background: `${c}22`, color: c, border: `1px solid ${c}44`,
      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontFamily: "monospace", fontWeight: 700 }}>
      {status}
    </span>
  );
}

export default function App() {
  const [tab, setTab]         = useState<"orders" | "products">("orders");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders]   = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const [pName, setPName]   = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pStock, setPStock] = useState("");

  const [oEmail, setOEmail]         = useState("");
  const [oProductId, setOProductId] = useState("");
  const [oQty, setOQty]             = useState("1");

  const load = async () => {
    setLoading(true);
    try {
      const [p, o] = await Promise.all([
        apiFetch<Product[]>("/products"),
        apiFetch<Order[]>("/orders"),
      ]);
      setProducts(p); setOrders(o);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const createProduct = async () => {
    if (!pName || !pPrice || !pStock) { setError("Completa todos los campos"); return; }
    try {
      await apiFetch("/products", { method: "POST",
        body: JSON.stringify({ name: pName, price: +pPrice, stock: +pStock }) });
      setPName(""); setPPrice(""); setPStock(""); load();
    } catch (e: any) { setError(e.message); }
  };

  const createOrder = async () => {
    if (!oEmail || !oProductId) { setError("Completa todos los campos"); return; }
    try {
      await apiFetch("/orders", { method: "POST",
        body: JSON.stringify({ customerEmail: oEmail,
          items: [{ productId: +oProductId, quantity: +oQty }] }) });
      setOEmail(""); setOProductId(""); setOQty("1"); load();
    } catch (e: any) { setError(e.message); }
  };

  const S = {
    page:  { minHeight: "100vh", background: "#0f0f14", color: "#e2e2ea", fontFamily: "system-ui,sans-serif" } as React.CSSProperties,
    hdr:   { background: "#17171f", borderBottom: "1px solid #2a2a38", padding: "14px 28px", display: "flex", alignItems: "center", gap: 12 } as React.CSSProperties,
    logo:  { fontFamily: "monospace", fontSize: 17, fontWeight: 700, color: "#7c5cfc" } as React.CSSProperties,
    note:  { fontSize: 11, color: "#555", fontFamily: "monospace" } as React.CSSProperties,
    body:  { maxWidth: 860, margin: "0 auto", padding: "28px 20px" } as React.CSSProperties,
    card:  { background: "#17171f", border: "1px solid #2a2a38", borderRadius: 10, padding: 18, marginBottom: 14 } as React.CSSProperties,
    lbl:   { display: "block", fontSize: 11, color: "#555", fontFamily: "monospace", marginBottom: 4, textTransform: "uppercase" as const, letterSpacing: "0.08em" },
    inp:   { width: "100%", background: "#0f0f14", border: "1px solid #2a2a38", borderRadius: 6, color: "#e2e2ea", fontSize: 13, padding: "7px 10px", marginBottom: 8, boxSizing: "border-box" as const, outline: "none" },
    btn:   { background: "#7c5cfc", color: "#fff", border: "none", borderRadius: 7, padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 } as React.CSSProperties,
    tab:   (a: boolean): React.CSSProperties => ({ padding: "7px 18px", borderRadius: 7, border: "1px solid #2a2a38", background: a ? "#7c5cfc" : "#17171f", color: a ? "#fff" : "#666", cursor: "pointer", fontSize: 13, fontWeight: 600 }),
    th:    { textAlign: "left" as const, fontSize: 11, color: "#444", fontFamily: "monospace", textTransform: "uppercase" as const, padding: "5px 10px", borderBottom: "1px solid #2a2a38" },
    td:    { padding: "10px 10px", borderBottom: "1px solid #1e1e28", fontSize: 13 },
    err:   { background: "#ef444415", border: "1px solid #ef444433", color: "#ef4444", padding: "10px 14px", borderRadius: 7, marginBottom: 14, fontSize: 13 } as React.CSSProperties,
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 } as React.CSSProperties,
  };

  return (
    <div style={S.page}>
      <header style={S.hdr}>
        <span style={S.logo}>SOLID Orders</span>
        <span style={S.note}>frontend (nginx:80) → backend (node:3000) → Neon PostgreSQL</span>
        <button data-cy="refresh-data" onClick={load} style={{ ...S.btn, marginLeft: "auto", padding: "5px 12px", fontSize: 12 }}>
          {loading ? "..." : "↺"}
        </button>
      </header>

      <div style={S.body}>
        {error && (
          <div data-cy="error-message" style={S.err}>⚠ {error} <span data-cy="close-error" style={{ cursor: "pointer", textDecoration: "underline", marginLeft: 8 }} onClick={() => setError("")}>cerrar</span></div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          <button data-cy="tab-orders" style={S.tab(tab === "orders")}   onClick={() => setTab("orders")}>📦 Órdenes ({orders.length})</button>
          <button data-cy="tab-products" style={S.tab(tab === "products")} onClick={() => setTab("products")}>🏷 Productos ({products.length})</button>
        </div>

        {tab === "orders" && (
          <>
            <div style={S.card}>
              <span style={S.lbl}>Nueva orden</span>
              <label style={S.lbl}>Email del cliente</label>
              <input data-cy="order-email" style={S.inp} placeholder="cliente@ejemplo.com" value={oEmail} onChange={e => setOEmail(e.target.value)} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 90px", gap: 10 }}>
                <div>
                  <label style={S.lbl}>Producto</label>
                  <select data-cy="order-product" style={S.inp} value={oProductId} onChange={e => setOProductId(e.target.value)}>
                    <option value="">— seleccionar —</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name} — ${p.price} ({p.stock} en stock)</option>)}
                  </select>
                </div>
                <div>
                  <label style={S.lbl}>Cantidad</label>
                  <input data-cy="order-qty" style={S.inp} type="number" min="1" value={oQty} onChange={e => setOQty(e.target.value)} />
                </div>
              </div>
              <button data-cy="create-order" style={S.btn} onClick={createOrder}>Crear orden</button>
            </div>

            <div style={S.card}>
              <table data-cy="orders-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr><th style={S.th}>#</th><th style={S.th}>Cliente</th><th style={S.th}>Total</th><th style={S.th}>Estado</th></tr></thead>
                <tbody>
                  {orders.length === 0
                    ? <tr><td data-cy="orders-empty" style={{ ...S.td, color: "#444", textAlign: "center" }} colSpan={4}>Sin órdenes aún</td></tr>
                    : orders.map(o => (
                        <tr key={o.id}>
                          <td style={{ ...S.td, fontFamily: "monospace", color: "#444" }}>{o.id}</td>
                          <td style={S.td}>{o.customerEmail}</td>
                          <td style={{ ...S.td, color: "#10b981", fontWeight: 600 }}>${o.total.toFixed(2)}</td>
                          <td style={S.td}><Badge status={o.status} /></td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === "products" && (
          <>
            <div style={S.card}>
              <span style={S.lbl}>Nuevo producto</span>
              <div style={S.grid2}>
                <div><label style={S.lbl}>Nombre</label><input data-cy="product-name" style={S.inp} placeholder="Laptop Dell" value={pName} onChange={e => setPName(e.target.value)} /></div>
                <div><label style={S.lbl}>Precio ($)</label><input data-cy="product-price" style={S.inp} type="number" placeholder="0.00" value={pPrice} onChange={e => setPPrice(e.target.value)} /></div>
                <div><label style={S.lbl}>Stock</label><input data-cy="product-stock" style={S.inp} type="number" placeholder="0" value={pStock} onChange={e => setPStock(e.target.value)} /></div>
              </div>
              <button data-cy="create-product" style={S.btn} onClick={createProduct}>Agregar producto</button>
            </div>

            <div style={S.card}>
              <table data-cy="products-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr><th style={S.th}>#</th><th style={S.th}>Nombre</th><th style={S.th}>Precio</th><th style={S.th}>Stock</th></tr></thead>
                <tbody>
                  {products.length === 0
                    ? <tr><td data-cy="products-empty" style={{ ...S.td, color: "#444", textAlign: "center" }} colSpan={4}>Sin productos aún</td></tr>
                    : products.map(p => (
                        <tr key={p.id}>
                          <td style={{ ...S.td, fontFamily: "monospace", color: "#444" }}>{p.id}</td>
                          <td style={{ ...S.td, fontWeight: 600 }}>{p.name}</td>
                          <td style={{ ...S.td, color: "#10b981" }}>${p.price.toFixed(2)}</td>
                          <td style={{ ...S.td, color: p.stock === 0 ? "#ef4444" : p.stock < 5 ? "#f59e0b" : "#888" }}>{p.stock} und.</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
