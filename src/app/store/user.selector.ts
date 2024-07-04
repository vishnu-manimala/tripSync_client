import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./user.state";
import { state } from "@angular/animations";
import { stat } from "fs";

export const userSelectorState = createFeatureSelector<State>('appState');

export const selectIsLogged = createSelector(
    userSelectorState,
    (state:State) => state.isLogged
);

export const profilePicture = createSelector(
    userSelectorState,
    (state:State) => state.user.profileImage[state.user.profileImage.length-1]
);

export const user = createSelector(
    userSelectorState,
    (state : State) => {
        return { _id : state.user._id,
        name : state.user.name,
        email : state.user.email,
        contactNumber : state.user.contactNumber,
        profileImage:state.user.profileImage[state.user.profileImage.length-1],}
    }
)

export const role =  createSelector(
    userSelectorState,
    (state : State) => state.user.isAdmin? "admin" : "user"
)

export const isBlocked = createSelector(
    userSelectorState,
    (state : State) => state.user.isBlocked
)