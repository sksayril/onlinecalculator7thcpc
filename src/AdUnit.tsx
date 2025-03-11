import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  className?: string;
  slot: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ className = "", slot }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (adRef.current && !initialized.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <div ref={adRef} className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          height: '250px',
          minWidth: '300px',
        }}
        data-ad-client="ca-pub-4433068335890521"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};