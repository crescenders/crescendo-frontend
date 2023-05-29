import Link from 'next/link';

export type NavigateListType = {
  id?: number;
  text: string;
  path: string;
};

const NavigateList = ({ text, path }: NavigateListType) => {
  return (
    <Link href={`${path}`}>
      <li className="flex h-[60px] items-center justify-center bg-white px-3">
        <span className="text-16 font-medium">{text}</span>
      </li>
    </Link>
  );
};

export default NavigateList;
