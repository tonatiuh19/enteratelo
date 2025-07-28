import { AppDispatch, RootState } from "../index";
import axios from "axios";
import { DOMAIN } from "../state/types";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "../reducers/categoriesSlice";

export const fetchCategories =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchCategoriesStart());

      const state = getState();
      const isAuthenticated = state.auth.isAuthenticated;
      const userEmail = state.auth.user?.email;

      try {
        const response = await axios.post(
          `${DOMAIN}/getCategories.php`,
          {
            authenticated: isAuthenticated,
            userEmail: userEmail,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          console.log(
            "Categories fetched successfully from API:",
            response.data,
          );
          dispatch(fetchCategoriesSuccess(response.data));
        }
      } catch (apiError) {
        console.log("API not available, using mock categories:", apiError);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch categories";
      console.error("Error fetching categories:", error);
      dispatch(fetchCategoriesFailure(errorMessage));
    }
  };
