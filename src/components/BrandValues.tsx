import React from 'react';

export const BrandValues: React.FC = () => {
  const values = [
    {
      number: '01',
      title: 'Considered Design',
      description: 'Every seam, button placement, and vent is mathematically proportioned to celebrate kinetic elegance without excess ornament.',
    },
    {
      number: '02',
      title: 'Premium Materials',
      description: 'Single-origin Mongolian grade-A cashmere, 100% Giza Egyptian cotton, and virgin Biella wool with zero synthetic polyester blending.',
    },
    {
      number: '03',
      title: 'Timeless Silhouettes',
      description: 'Architectural lines engineered to transcend micro-trends, designed to be worn across decades and handed down through generations.',
    },
    {
      number: '04',
      title: 'Responsible Craft',
      description: 'Limited edition production batches, zero deadstock incineration, transparent European artisan ateliers, and natural vegetable dyes.',
    },
  ];

  return (
    <section className="w-full bg-[#FDFDFD] border-t border-b border-[#E8E5E1]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E8E5E1]">
          {values.map((v) => (
            <div key={v.number} className="p-6 sm:p-8 first:pl-0 last:pr-0 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#999999] tracking-widest block mb-4">
                  {v.number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-light uppercase tracking-wide mb-3">
                  {v.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#666666] font-light leading-relaxed pt-4">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
