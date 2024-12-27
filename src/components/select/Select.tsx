import React, { useEffect, useRef } from 'react';
import images from '@/configs/images';

interface SelectCustomProps {
  label: string;
  handleChange: (value: string) => void;
  option: any[];
  placeholder: string;
  value: string | null;
  disable: boolean;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectCustom: React.FC<SelectCustomProps> = ({
  label,
  handleChange,
  option,
  placeholder,
  value,
  disable,
  visible,
  setVisible,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setVisible]);

  const getText = () => {
    const item = option.find(it => it.value == value);
    return item?.label;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-doveGray">{label}</label>
      <div
        ref={dropdownRef}
        className={`relative mt-1 h-[50px] w-full rounded-md border bg-white ${visible ? 'border-[2px] border-black' : 'border border-stroke'} flex cursor-pointer items-center justify-between px-3`}
        onClick={() => !disable && setVisible(true)}
      >
        <p className={`${getText() ? 'text-black' : 'text-gray-400'}`}>
          {getText() ? getText() : placeholder}
        </p>
        <img className="h-4 w-4" src={images.icons.ic_down} alt="" />
        {visible && (
          <div className="absolute left-0 top-[50px] z-50 h-60 w-full overflow-y-scroll rounded-md border border-stroke bg-white no-scrollbar">
            {option.map((item, index) => (
              <p
                key={index}
                className="px-3 py-2"
                onClick={e => {
                  e.stopPropagation();
                  setVisible(false);
                  handleChange(item.value);
                }}
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCustom;
