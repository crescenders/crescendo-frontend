import { OptionsType, SORT_OBJ, SortStateType } from '@constants/search';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

type SelectListProps = {
  options: OptionsType;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isOpen: SortStateType;
  setIsOpen: Dispatch<SetStateAction<SortStateType>>;
};

const SelectBox = ({
  options,
  value,
  setValue,
  isOpen,
  setIsOpen,
}: SelectListProps) => {
  const router = useRouter();
  const { is_closed, ...restQuery } = router.query;

  return (
    <div className="flex flex-col">
      <button
        onClick={() =>
          setIsOpen({
            ...SORT_OBJ,
            [value]: !isOpen[value],
          })
        }
        className={`${
          isOpen[value] ? 'border-[#8266FF]' : 'border-[#E2E0E0]'
        } flex h-9 w-[92px] cursor-pointer items-center justify-evenly rounded-[7px] border-[1px] bg-white`}
      >
        <span className="ml-3 text-13">{value}</span>
        <Image src={'/svg/chevron-down.svg'} width={16} height={16} alt="" />
      </button>
      {isOpen[value] && (
        <ul className="absolute z-10 mt-[45px] flex h-fit w-[92px] animate-dropbox cursor-pointer flex-col items-center justify-center rounded-[7px] border-[1px] border-[#E2E0E0] bg-white text-13">
          {options.map(({ id, name, query }) => (
            <li
              key={id}
              className="flex h-[30px] w-[84px] items-center justify-center rounded-[5px] hover:bg-[rgba(130,102,255,0.41)]"
              onClick={() => {
                setIsOpen((prev) => {
                  return isOpen[value]
                    ? { ...prev, [value]: false }
                    : { ...prev, [value]: true };
                });
                setValue(name);
                name === '최신순' || name === '마감순'
                  ? router.replace({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        ordering: query,
                      },
                    })
                  : query
                  ? router.replace({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        is_closed: query,
                      },
                    })
                  : router.replace({
                      pathname: router.pathname,
                      query: {
                        ...restQuery,
                      },
                    });
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
