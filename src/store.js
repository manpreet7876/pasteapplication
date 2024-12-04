import { configureStore } from "@reduxjs/toolkit";

import pasteReducer from './redux/pastelice'


export const store=configureStore({reducer:{paste:pasteReducer},})