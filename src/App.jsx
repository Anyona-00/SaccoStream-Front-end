import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Authpages/LoginPage";
import SignUpPage from "./pages/Authpages/SignUpPage";
import OtpVerificationPage from "./pages/Authpages/OtpVerificationPage";
import ForgotPasswordPage from "./pages/Authpages/ForgotPasswordPage";
import PasswordResetPage from "./pages/Authpages/PasswordResetPage";
import Homepage from "./pages/Homepage/Homepage";

import WelcomePage from "./pages/WelcomePage";
import ComingSoonPage from "./pages/Coming Soon";
import DepositFundsPage from "./pages/Transactionpages/DepositFundsPage";
import WithdrawFundsPage from "./pages/Transactionpages/WithdrawFundsPage";
import WalletPage from "./pages/Transactionpages/WalletPage";
import SavingsPage from "./pages/Transactionpages/SavingsPage";
import LoansDashboard from "./pages/Loan Management Pages/LoansDashboard";
import LoanDetails from "./pages/Loan Management Pages/LoanDetails";
import ApplyLoan from "./pages/Loan Management Pages/RequestLoan";
import RepayLoan from "./pages/Loan Management Pages/RepayLoan";
import SavingsDashboard from "./pages/Savings pages/SavingsDashboard";
import GuarantorDashboard from "./pages/Guarantors Pages/GuarantorDashboard";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<PasswordResetPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/comingsoon" element={<ComingSoonPage />} />
        <Route path="/deposit" element={<DepositFundsPage />} />
        <Route path="/withdraw" element={<WithdrawFundsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/savings" element={<SavingsPage />} />
        <Route path="/loansdashboard" element={<LoansDashboard />} />
        <Route path="/loandetails" element={<LoanDetails />} />
        <Route path="/loandetails" element={<LoanDetails />} />
        <Route path="/requestloan" element={<ApplyLoan />} />
        <Route path="/repayloan" element={<RepayLoan />} />
        <Route path="/savingsdashboard" element={<SavingsDashboard />} />
        <Route path="/guarantordashboard" element={<GuarantorDashboard />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
