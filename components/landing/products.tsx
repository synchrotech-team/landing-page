'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resolveImageSrc } from '@/lib/blob-image';
import { PRODUCTS_DATA, Product, getLocalizedProduct } from '@/lib/products';

interface ProductsProps {
  lang: Language;
}

const BADGE_STYLES: Record<string, string> = {
  blue: 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30',
  purple: 'bg-purple-electric/20 text-purple-electric border border-purple-electric/30',
  dark: 'bg-foreground/10 text-muted-foreground',
};

const MAX_LANDING_PRODUCTS = 3;

export function Products({ lang }: ProductsProps) {
  const [rawProducts, setRawProducts] = useState<Product[]>(Object.values(PRODUCTS_DATA));

  useEffect(() => {
    async function loadDynamicProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setRawProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load dynamic products:', err);
      }
    }
    loadDynamicProducts();
  }, []);

  const products = rawProducts.slice(0, MAX_LANDING_PRODUCTS).map(p => getLocalizedProduct(p, lang));

  return (
    <section id="products" className="py-24 bg-background relative border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-purple-electric font-semibold tracking-widest uppercase mb-3 block">
              {t('hardwareCategory', lang)}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tighter uppercase mb-4">
              {t('hardwareTitle', lang)}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t('hardwareSubtitle', lang)}
            </p>
          </div>
        </MotionReveal>

        {/* Hardware Cards Grid — dynamic, capped at MAX_LANDING_PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {products.map((product, idx) => (
            <MotionReveal key={product.slug} delay={idx * 0.1}>
              <div className="h-full group relative bg-foreground/2 border border-foreground/10 p-6 flex flex-col justify-between hover:border-purple-electric/50 transition-colors duration-150">
                <div>
                  <span className={cn('inline-block px-3 py-1 text-[11px] font-mono font-bold uppercase mb-4 rounded-full', BADGE_STYLES[product.badgeType] ?? BADGE_STYLES.dark)}>
                    {product.badge}
                  </span>

                  <div className="w-full h-44 overflow-hidden mb-6 bg-black border border-foreground/10 flex items-center justify-center">
                    <img
                      src={resolveImageSrc(product.image)}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">{product.name}</h3>
                  <p className="text-xs text-purple-electric font-mono mb-6">{product.subtitle}</p>

                  <ul className="space-y-3 mb-8">
                    {product.keySpecs.slice(0, 4).map((spec, i) => (
                      <li key={i} className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Check className="w-4 h-4 text-purple-electric shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/products/${product.slug}`} className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full justify-center')}>
                  <span>{t('learnMore', lang)}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
