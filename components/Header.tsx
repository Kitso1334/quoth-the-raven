import { useRouter } from "next/router";
import { useCallback } from "react";
import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
    const router = useRouter();

    // Corrected: Call router.back() to navigate to the previous page
    const handleBack = useCallback(() => {
        router.back(); // Ensure the function is invoked
    }, [router]);

    return (
        <div className="border-b-neutral-800 p-5">
            <div className="flex flex-row items-center gap-2">
                {showBackArrow && (
                    <BiArrowBack
                        onClick={handleBack}
                        color="white"
                        size={20}
                        className="cursor-pointer hover:opacity-70 transition"
                    />
                )}
                <h1 className="text-xl font-semibold">{label}</h1>
            </div>
        </div>
    );
};

export default Header;
