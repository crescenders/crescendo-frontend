import { forwardRef, useState } from 'react';
import Image from 'next/image';
import Button from '@components/common/Button';
import { validateFile } from '@utils/validate';

const UploadImage = forwardRef<HTMLInputElement>((_, ref) => {
  const [image, setImage] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files) setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleImage(e.dataTransfer.files);
    setIsDragging(false);
  };

  const handleImage = (files: FileList | null) => {
    const error = validateFile(files);

    setErrorMessage(error);
    if (files && !error) setImage(files[0]);
  };

  return (
    <div>
      <input
        ref={ref}
        name="head_image"
        id="head-image"
        type="file"
        className="hidden"
        accept="image/jpeg, image/png"
        onChange={(e) => handleImage(e.currentTarget.files)}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${
          isDragging ? 'border-[#8266FF]' : 'border-line-primary'
        } relative flex w-[550px] select-none items-center justify-center rounded-[20px] border`}
      >
        {image ? (
          <div className="flex h-full flex-col items-center justify-center gap-[15px] p-[15px]">
            <div className="relative h-[130px] w-full">
              <Image
                src={URL.createObjectURL(image)}
                alt="image"
                fill
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="flex gap-3">
              <Button
                isNormal
                text="삭제"
                className="h-[40px] w-[60px] bg-white text-black"
                onClick={() => setImage(null)}
              />
              <label
                htmlFor="head-image"
                className="flex h-[40px] w-[60px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-brand text-[14px] text-white shadow-button"
              >
                수정
              </label>
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-[43px] pb-[15px] pt-[36px]">
            <div className="flex flex-col items-center justify-center gap-5">
              <Image
                src="/svg/upload_image.svg"
                alt="upload image"
                width={20}
                height={20}
                className={`${!isDragging && 'grayscale'} h-auto`}
              />
              <p className="text-[12px] text-text-primary">
                업로드 또는 이미지를 드래그 해주세요.
              </p>
            </div>
            <label
              htmlFor="head-image"
              className="flex h-[40px] w-[160px] cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-brand text-[14px] text-white shadow-button"
            >
              데스크탑에서 업로드
            </label>
          </div>
        )}
      </div>
      <span className="h-2 text-12 text-status-error">{errorMessage}</span>
    </div>
  );
});

UploadImage.displayName = 'UploadImage';

export default UploadImage;
