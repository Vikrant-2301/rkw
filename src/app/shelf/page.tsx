import type { Metadata } from 'next';
import { ProductShelf } from '@/components/ui/skincare-product-shelf';

export const metadata: Metadata = {
  title: 'Interactive 3D Virtual Shelf | Ramesh Kolhu Wale',
  description: 'Interactive 3D shelf experience — inspect our authentic cold-pressed oils and Vedic Bilona ghee in 360 degrees.',
  alternates: {
    canonical: '/shelf',
  },
};

export default function ShelfPage() {
  return (
    <ProductShelf
      title="3D Virtual Shelf"
      subtitle="Interactive 360° collection — drag to rotate bottles, inspect purity stickers, and choose your volume"
    >
      <div className="text-center pb-12 pt-6">
        <p className="text-xs text-[#8A7E6E] font-medium tracking-wide">
          Every drop cold-pressed fresh in traditional cold-press ghanis · Ramesh Kolhu Wale
        </p>
      </div>
    </ProductShelf>
  );
}
