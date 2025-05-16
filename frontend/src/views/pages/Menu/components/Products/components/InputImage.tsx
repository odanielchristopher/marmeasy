import { CircleXIcon, ImageIcon, SoupIcon } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@views/components/ui/Avatar';
import { Button } from '@views/components/ui/Button';

interface IInputImageProps {
  value?: string | File;
  onChange?(value: File | undefined): void;
}

export function InputImage({ value, onChange }: IInputImageProps) {
  const [imageUrlPreview, setImageUrlPreview] = useState(() => {
    if (value && typeof value !== 'string') {
      return URL.createObjectURL(value);
    }

    return value;
  });

  function handleValue(file: File) {
    setImageUrlPreview(URL.createObjectURL(file));
    onChange?.(file);
  }

  function handleRemoveImage() {
    setImageUrlPreview(undefined);
    onChange?.(undefined);
  }

  return (
    <div className="w-full border border-gray-500 dark:border-accent rounded-md relative">
      {imageUrlPreview && (
        <button
          type="button"
          className="absolute z-99 top-2 right-2"
          onClick={handleRemoveImage}
        >
          <CircleXIcon className="size-6 text-white" />
        </button>
      )}
      <Avatar className="w-full h-30  rounded-none rounded-t-md">
        <AvatarImage
          src={imageUrlPreview}
          alt="Imagem do produto"
          className="object-cover"
        />
        <AvatarFallback className="bg-teal-900 rounded-none rounded-t-md">
          <SoupIcon className="text-gray-800" />
        </AvatarFallback>
      </Avatar>

      <Dropzone
        accept={{
          'image/jpeg': [],
          'image/png': [],
        }}
        onDropAccepted={([file]) => handleValue(file)}
        maxFiles={1}
        noClick
      >
        {({ getRootProps, getInputProps, open }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <Button
              type="button"
              variant="ghost"
              onClick={open}
              className="!text-primary font-semibold w-full rounded-t-none"
            >
              <ImageIcon className="size-5" />
              Alterar imagem
            </Button>
          </div>
        )}
      </Dropzone>
    </div>
  );
}
