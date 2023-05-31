import Link from 'next/link';

export type NavigateListType = {
  id?: number;
  text: string;
  path: string;
};

const NavigateList = ({ text, path }: NavigateListType) => {
  return (
    <Link href={`${path}`}>
      <li className="flex h-[47px] items-center justify-center bg-white px-7">
        <span className="text-16 font-medium hover:font-bold hover:text-brand">
          {text}
        </span>
      </li>
    </Link>
  );
};

export default NavigateList;
