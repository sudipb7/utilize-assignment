import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { RootState, AppDispatch } from "../store";
import { fetchUserData } from "../store/authSlice";

export function useUser() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, accessToken, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken && !isAuthenticated && !loading) {
      dispatch(fetchUserData(storedToken));
    }
  }, [dispatch, isAuthenticated, loading]);

  return { user, isAuthenticated, accessToken, loading, error };
}
