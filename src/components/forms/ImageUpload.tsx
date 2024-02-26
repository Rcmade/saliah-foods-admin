"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onRemove: (url: string) => void;
  values?: string[];
  setImgs: any;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onRemove,
  values,
  setImgs,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    setImgs((pre: any) => [...pre, result?.info?.url]);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center flex-wrap justify-center gap-4">
        {(values || []).map(
          (url) =>
            url && (
              <div
                key={url}
                className="relative mb-20 w-[200px] h-[200px] rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => onRemove(url || "")}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image fill className="object-cover" alt="Image" src={url} />
              </div>
            )
        )}
      </div>
      <CldUploadWidget
        onUpload={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button type="button" disabled={disabled} onClick={onClick}>
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
