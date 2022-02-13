import { AuthProvider } from '../contexts/AuthContext';
import SignupPage from '../pages/signup';

const App = () => {
    return (
        <AuthProvider>
            <SignupPage />
        </AuthProvider>
    );
};

export default App;
