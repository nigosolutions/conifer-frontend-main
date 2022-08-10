import "./App.css";
import Layout from "./Components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./Pages/Project";
import Expense from "./Pages/Expense";
import AddExpense from "./Pages/AddExpense";
import FundManager from "./Pages/FundManager";
import Reports from "./Pages/Reports";
import Approvals from "./Pages/Approvals";
import NormalLoginForm from "./Pages/Login";
import ManageUsers from "./Pages/ManageUsers";
import ResetPassword from "./Pages/ResetPassword";
import TotalExpense from "./Pages/TotalExpense";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<NormalLoginForm />} />
					<Route path="/resetpassword" element={<ResetPassword />} />
					<Route path="/" element={<Layout />}>
						<Route path="/manageusers" element={<ManageUsers />} />
						<Route path="/project" element={<Project />} />
						<Route path="/expense" element={<Expense />} />
						<Route path="/addExpense" element={<AddExpense />} />
						<Route path="/fundmanager" element={<FundManager />} />
						<Route path="/reports" element={<Reports />} />
						<Route path="/approvals" element={<Approvals />} />
						<Route path="/totalExpense" element={<TotalExpense />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}
export default App;
