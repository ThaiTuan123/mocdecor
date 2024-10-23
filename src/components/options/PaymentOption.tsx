import Image from 'next/image';

interface PaymentOptionProps {
    item: {
        title: string;
        image: string;
    };
    isChecked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ item, isChecked, onChange }) => {
    return (
        <label
            className={`flex flex-col gap-2 flex-1 pt-4 pb-5 px-4 border rounded cursor-pointer transition-all ${
                isChecked ? 'border-primary bg-white' : 'border-gray-300'
            }`}
        >
            <div className='flex flex-row space-x-3 lg:space-x-2 items-center'>
                <input
                    type="radio"
                    className="hidden peer"
                    checked={isChecked}
                    onChange={onChange}
                />
                <span
                    className={`flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                        isChecked ? 'border-primary bg-primary' : 'border-gray-300'
                    }`}
                >
                    {isChecked && <span className="w-2.5 h-2.5 rounded-full bg-white"/>}
                </span>
                <div className="block lg:hidden size-16">
                    <Image src={item.image} alt={item.title} width={138} height={128}/>
                </div>
                <span className={`text-lg ${isChecked ? 'font-semibold' : 'font-normal'}`}>
                    {item.title}
                </span>
            </div>
            <div className="hidden lg:flex justify-center w-full">
                <Image src={item.image} alt={item.title} width={138} height={128}/>
            </div>
        </label>
    );
};

export default PaymentOption;
