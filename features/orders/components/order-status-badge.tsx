import type { OrderStatus } from "@/features/orders/types";
import { cn } from "@/lib/utils";

const tone: Record<OrderStatus, string> = {
  placed: "bg-muted text-foreground",
  processing: "bg-muted text-foreground",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-primary/10 text-primary",
  cancelled: "bg-destructive/10 text-destructive",
  returned: "bg-destructive/10 text-destructive",
};

const label: Record<OrderStatus, string> = {
  placed: "Placed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
  returned: "Returned",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-1.5 py-0.5 text-xs font-semibold",
        tone[status]
      )}
    >
      {label[status]}
    </span>
  );
}
