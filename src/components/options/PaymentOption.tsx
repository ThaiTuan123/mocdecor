import Image from 'next/image';

interface PaymentOptionProps {
  item: {
    title: string;
    image: string;
  };
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  item,
  isChecked,
  onChange,
}) => {
  return (
    <label
      className={`flex flex-1 cursor-pointer flex-col gap-2 rounded border px-4 pb-5 pt-4 transition-all ${
        isChecked ? 'border-primary bg-white' : 'border-gray-300'
      }`}
    >
      <div className="flex flex-row items-center space-x-3 lg:space-x-2">
        <input
          type="radio"
          className="peer hidden"
          checked={isChecked}
          onChange={onChange}
        />
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
            isChecked ? 'border-primary bg-primary' : 'border-gray-300'
          }`}
        >
          {isChecked && <span className="h-2.5 w-2.5 rounded-full bg-white" />}
        </span>
        <div className="block size-16 lg:hidden">
          <Image src={item.image} alt={item.title} width={138} height={128} />
        </div>
        <span
          className={`text-lg ${isChecked ? 'font-semibold' : 'font-normal'}`}
        >
          {item.title}
        </span>
      </div>
      <div className="hidden w-full justify-center lg:flex">
        <Image src={item.image} alt={item.title} width={138} height={128} />
      </div>
    </label>
  );
};

export default PaymentOption;
