import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    isLogin: boolean;
    aToken: Token
    rToken: Token
    username: string | null;
    role: string | null;
  }

  export interface Token{
    isPresent: boolean;
    token: string;
  }
  
  const initialState: CounterState = {
    isLogin: false,
    aToken: {
        isPresent: false,
        token: ""
    },
    rToken: {
        isPresent: false,
        token: ""
    },
    username: "guest",
    role: "guest"
  }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
        state.isLogin = true;
      },
      addAToken: (state, action: PayloadAction<string>) => {
        state.aToken = {
          isPresent: true,
          token: action.payload
        };
      },
      setUsername: (state, action: PayloadAction<string>) => {
        state.username = action.payload;
      },
      setRole: (state, action: PayloadAction<string>) => {
        state.role = action.payload;
      },
    }
  })

  export const {login, addAToken, setUsername, setRole} = authSlice.actions;