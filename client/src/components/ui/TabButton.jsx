import FlagIcon from "../../assets/flag-icon.svg";
import FlagActiveIcon from "../../assets/flag-active-icon.svg";

const TabButton = ({ isActive, onClick, children }) => {
    return (
        <div className="relative">
            <button
                type="button"
                onClick={onClick}
                className={`
        font-inter text-lg font-semibold
        cursor-pointer pb-7 px-4
        transition-colors
        flex items-center gap-2
        ${isActive ? "text-[#2563EB]" : "text-[#6B7280]"}
      `}
            >
                <img
                    src={isActive ? FlagActiveIcon : FlagIcon}
                    alt="Flag"
                    className="w-6 h-6"
                />
                {children}
            </button>
            {isActive && (
                <hr className="border-[#2563EB] border-t-[0.3125rem] absolute bottom-0 left-0 w-full z-10" />
            )}
        </div>
    );
};

export default TabButton;
