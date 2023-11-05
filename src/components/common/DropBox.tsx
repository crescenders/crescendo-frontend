import Image from 'next/image';
import { useState } from 'react';

type DropBoxProps = {
  topEvent: () => void;
  bottomEvent: () => void;
};

const DropBox = ({ topEvent, bottomEvent }: DropBoxProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative flex h-10 w-10 items-center justify-center rounded-md hover:bg-[rgba(52,58,64,0.1)] hover:transition-colors">
      <Image
        src="/svg/more.svg"
        width={24}
        height={24}
        alt="more"
        className="cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isOpen && (
        <ul className="absolute right-2 top-12 z-50 flex h-fit w-[85px] animate-dropbox cursor-pointer list-none  flex-col items-center gap-y-2 rounded-md border-[1px] border-[rgba(0,0,0,0.15)] bg-white py-2 duration-150">
          <li
            onClick={topEvent}
            className="flex w-full justify-center gap-x-1 py-1 hover:bg-[rgba(52,58,64,0.1)] hover:transition-colors"
          >
            <Image src="/svg/edit2.svg" width={18} height={18} alt="edit" />
            <span className="text-15">수정</span>
          </li>
          <li
            onClick={bottomEvent}
            className="flex w-full justify-center gap-x-1 py-1 hover:bg-[rgba(52,58,64,0.1)] hover:transition-colors"
          >
            <Image src="/svg/trash.svg" width={20} height={20} alt="delete" />
            <span className="text-15">삭제</span>
          </li>
        </ul>
      )}
    </div>
  );
};
export default DropBox;
