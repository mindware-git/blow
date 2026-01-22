"use client";

interface ImagePreviewProps {
  images: File[];
  onRemoveImage: (index: number) => void;
  className?: string;
}

export default function ImagePreview({
  images,
  onRemoveImage,
  className = "",
}: ImagePreviewProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-sm text-gray-600">Selected images:</div>
      <div className="flex gap-2 flex-wrap">
        {images.map((file, index) => (
          <div key={index} className="relative inline-block">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="w-16 h-16 object-cover rounded border"
            />
            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs hover:bg-red-600 transition-colors"
              aria-label="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
