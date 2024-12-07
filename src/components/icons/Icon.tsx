import Image from "next/image";

interface IconProps {
    src: string; // Path to the image
    alt: string; // Alt text for accessibility
    size?: "small" | "large"; // Optional prop to specify size
    onClick?: () => void; // Optional click handler
}

const Icon = ({ src, alt, size = "small", onClick }: IconProps) => {
    // Define size based on the 'size' prop
    const dimensions = size === "small" ? 24 : 48;

    return (
        <div
            className={`inline-block hover:opacity-85 cursor-pointer`}
            onClick={onClick}
            style={{ width: dimensions, height: dimensions }}
        >
            <Image
                src={src} // Optimized image path
                alt={alt} // Alt text
                width={dimensions} // Width based on size
                height={dimensions} // Height based on size
                className="object-contain" // Ensures image fits without distortion
            />
        </div>
    );
};

export default Icon;
