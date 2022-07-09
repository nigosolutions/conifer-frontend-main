import "./App.css";
import Layout from "./Components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Project from "./Pages/Project";
import Expense from "./Pages/Expense";
import AddExpense from "./Pages/AddExpense";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Layout />}>
						<Route path="/project" element={<Project />} />
						<Route path="/expense" element={<Expense />} />
						<Route path="/addExpense" element={<AddExpense />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
