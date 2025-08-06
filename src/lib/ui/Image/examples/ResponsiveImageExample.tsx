import React from 'react';
import Image from '../';

export function ResponsiveImageExample() {
  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <Image
        src="./sample-image.svg"
        alt="Sample Image Component"
        className="w-full h-32 rounded-lg border border-gray-200"
        objectFit="contain"
      />
      
      <Image
        src="./non-existent-image.png"
        alt="This will show fallback"
        className="w-full h-24 rounded-lg"
        objectFit="contain"
        fallback={<div className="w-full h-24 bg-gray-100 rounded-lg">Image not found</div>}
      />
    </div>
  );
}