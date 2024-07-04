import { createReducer, on } from "@ngrx/store";
import { initialState } from "./user.state";
import { loginSuccess, logout } from "./user.action";
import { state } from "@angular/animations";

export const userReducer = createReducer(
    initialState,
    on(loginSuccess, (state, action)=>{
        return {
            ...state,
            isLogged : true,
            user : action.user,
        }
    }),
    on(logout, (state) => {
        return {
            ...state,
            isLogged : false,
            user : initialState.user,
        }
    })
)