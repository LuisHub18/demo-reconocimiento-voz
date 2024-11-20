import ArticleSelection from "./components/ArticleSelection";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SearchClient from "./components/SearchClient";
import PaymentSelection from "./components/PaymentSelection";
import Main from "./components/Main";
import NotFoundPage from "./404";

const App = () => {
   return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/article-selection" element={<ArticleSelection />} />
            <Route path="/search-client" element={<SearchClient />} />
            <Route path="/payment-selection" element={<PaymentSelection />} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
    </Router>
   );
};

export default App;