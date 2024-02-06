import { formatPrice } from "@/lib/Format";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`badge h-8 border-2 ${className} `}>
      {formatPrice(price)}
    </span>
  );
}
