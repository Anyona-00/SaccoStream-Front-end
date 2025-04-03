import { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../Assets/Homepage/HomeIcon.svg";
import WalletIcon from "../../Assets/Homepage/WalletIcon.svg";
import SavingsIcon from "../../Assets/Homepage/SavingsIcon.svg";
import BorrowingIcon from "../../Assets/Homepage/BorrowingIcon.svg";
import GuarantorIcon from "../../Assets/Homepage/GuarantorIcon.svg";
import HelpIcon from "../../Assets/Homepage/HelpIcon.svg";
import SettingsIcon from "../../Assets/Homepage/SettingsIcon.svg";
import MessageIcon from "../../Assets/Homepage/MessageIcon.svg";
import MenuIcon from "../../Assets/Homepage/MenuIcon.svg";

const NavColumn = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed left-3 top-24 h-full bg-transparent">
      <div className="flex p-3 justify-center max-sm:fixed max-sm:right-12 max-sm:bottom-4 max-sm:w-4/5 rounded-2xl bg-transparent shadow-md">
        <div className="flex flex-row sm:flex-col gap-6">
          <div className="flex flex-col justify-center">
            <Link to="/homepage">
              <img src={HomeIcon} alt="Home" className="h-8 w-8 mb-1" />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/savingsdashboard">
              <img src={SavingsIcon} alt="Savings" className="h-8 w-8 mb-1" />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/wallet">
              <img src={WalletIcon} alt="Wallet" className="h-8 w-8 mb-1" />
            </Link>
          </div>
          <div className="sm:hidden flex flex-col justify-center mb-1">
            <img
              src={MenuIcon}
              alt="Menu"
              className="h-8 w-8 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
      </div>

      {/* Conditionally Render Other Segments on Small Screens */}
      {isExpanded && (
        <div className="sm:hidden flex flex-col items-end ml-80 mt-28 bg-transparent shadow-md">
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="flex flex-col justify-center">
              <Link to="/loansdashboard">
                <img
                  src={BorrowingIcon}
                  alt="Borrowing"
                  className="h-8 w-8 mb-1"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <Link to="/guarantordashboard">
                <img
                  src={GuarantorIcon}
                  alt="Guarantors"
                  className="h-8 w-8 mb-1"
                />
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <Link to="/comingsoon">
                <img src={HelpIcon} alt="Help" className="h-8 w-8 mb-1" />
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <Link to="/ats">
                <img
                  src={SettingsIcon}
                  alt="Settings"
                  className="h-8 w-8 mb-1"
                />
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center pt-8">
            <Link to="/comingsoon">
              <img src={MessageIcon} alt="Messages" className="h-6 w-6 mb-1" />
            </Link>
          </div>
        </div>
      )}

      {/* Vertical Layout for Larger Screens */}
      <div className="hidden sm:flex sm:flex-col justify-center sm:gap-8 sm:p-4 rounded-2xl bg-transparent shadow-md mt-12">
        <div className="flex flex-col gap-6 justify-center items-center">
          <div className="flex flex-col justify-center">
            <Link to="/loansdashboard">
              <img
                src={BorrowingIcon}
                alt="Borrowing"
                className="h-8 w-8 mb-1"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/guarantordashboard">
              <img
                src={GuarantorIcon}
                alt="Guarantors"
                className="h-8 w-8 mb-1"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/comingsoon">
              <img src={HelpIcon} alt="Help" className="h-8 w-8 mb-1" />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <Link to="/ats">
              <img src={SettingsIcon} alt="Settings" className="h-8 w-8 mb-1" />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col ml-3 justify-center pt-8 mt-52 max-sm:hidden">
        <Link to="/comingsoon">
          <img src={MessageIcon} alt="Messages" className="h-8 w-8 mb-1" />
        </Link>
      </div>
    </div>
  );
};

export default NavColumn;
