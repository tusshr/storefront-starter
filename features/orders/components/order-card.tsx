import Image from "next/image";
import Link from "next/link";

import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import type { Order } from "@/features/orders/types";
import { formatMoney } from "@/lib/format";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function statusLine(order: Order): string | null {
  if (order.status === "delivered" && order.deliveredAt) {
    return `Delivered ${dateFmt.format(new Date(order.deliveredAt))}`;
  }
  if (order.status === "shipped" && order.estimatedDeliveryAt) {
    return `Arriving by ${dateFmt.format(new Date(order.estimatedDeliveryAt))}`;
  }
  if (order.status === "cancelled") return "Order cancelled";
  if (order.status === "returned") return "Return received";
  if (order.status === "processing") return "Preparing for shipment";
  if (order.status === "placed") return "Order received";
  return null;
}

export function OrderCard({ order }: { order: Order }) {
  const placed = new Date(order.placedAt);
  const status = statusLine(order);

  return (
    <article
      aria-labelledby={`order-${order.number}`}
      className="border-border bg-card overflow-hidden rounded-lg border"
    >
      <header className="border-border bg-muted/30 grid gap-3 border-b p-4 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto] sm:items-center sm:gap-6">
        <dl className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            Placed
          </dt>
          <dd className="text-foreground text-sm">
            <time dateTime={order.placedAt}>{dateFmt.format(placed)}</time>
          </dd>
        </dl>
        <dl className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            Total
          </dt>
          <dd className="text-foreground text-sm font-semibold">
            {formatMoney(order.total)}
          </dd>
        </dl>
        <dl className="flex flex-col gap-0.5">
          <dt className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
            Order
          </dt>
          <dd
            id={`order-${order.number}`}
            className="text-foreground font-mono text-sm"
          >
            {order.number}
          </dd>
        </dl>
        <OrderStatusBadge status={order.status} />
      </header>

      <ol role="list" className="divide-border divide-y">
        {order.items.map((item) => (
          <li key={`${order.id}-${item.productId}-${item.variantId ?? ""}`}>
            <Link
              href={`/products/${item.productSlug}`}
              className="hover:bg-muted/40 focus-visible:bg-muted/40 flex gap-4 p-4 focus-visible:outline-none"
            >
              <Image
                src={item.image}
                alt=""
                width={80}
                height={80}
                className="bg-muted size-20 shrink-0 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col gap-1">
                {item.brand && (
                  <p className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">
                    {item.brand}
                  </p>
                )}
                <h3 className="text-foreground text-sm leading-snug font-medium">
                  {item.title}
                </h3>
                {item.optionLabel && (
                  <p className="text-muted-foreground text-xs">
                    {item.optionLabel}
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Qty {item.quantity} · {formatMoney(item.unitPrice)} each
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <footer className="border-border flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {status}
          {order.trackingNumber && order.carrier && (
            <>
              {" · "}
              <span className="text-foreground font-medium">
                {order.carrier}
              </span>{" "}
              <span className="font-mono">{order.trackingNumber}</span>
            </>
          )}
        </p>
        <Link
          href={`/account/orders/${order.number}`}
          className="text-primary hover:text-primary/80 focus-visible:ring-ring/30 inline-flex items-center rounded-sm text-sm font-medium focus-visible:ring-2 focus-visible:outline-none"
        >
          View order details
        </Link>
      </footer>
    </article>
  );
}
