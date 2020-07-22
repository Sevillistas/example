import { combineReducers } from "redux";
import { poemsReducer } from './poemsReducer'

export const mainReducer = combineReducers({
    poems: poemsReducer
})