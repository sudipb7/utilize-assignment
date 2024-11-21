import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login, fetchUserData } from "../store/authSlice";
import { useUser } from "../hooks/useUser";
import { AppDispatch } from "../store";

function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading, error } = useUser();

  const googleLogin = useGoogleLogin({
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      dispatch(login({ accessToken }));
      dispatch(fetchUserData(accessToken));
    },
  });

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Login</h1>
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <button
            onClick={() => googleLogin()}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
            disabled={loading}
          >
            Login with Google
          </button>
        )}
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
