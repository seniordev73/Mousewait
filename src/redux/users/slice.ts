import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  compose,
} from '@reduxjs/toolkit';
import { getChatApi } from '../../api/getChat';
import { User, UsersSliceState, Status } from './types';
import { GET_BASE_URL } from '../../constants/apiEndpoints';
export type userType = {
  username: string;
  email: string;
  password: string;
  park: string;
  version: string;
  type: string;
  appname: string;
};

export type loginType = {
  username: string;
  password: string;
  loginfrom: string;
};

export type ResetPasswordType = {
  user_id: any;
  resetkey: any;
  user_pass: any;
};

export type changePassType = {
  password_old: string;
  password_new: string;
};

export type forgotPasswordType = {
  email: string;
};

export type updateprofileType = {
  user_name: string;
  user_email: string;
  user_description: string;
  myfile: File;
};
export type verifyEmailType = {
  verifymail: string;
};

export type chatSend = {
  user_message: string;
};


export const signinUser = createAsyncThunk<User[], loginType>(
  'users/signinUser',
  async ({ username, password, loginfrom }, thunkAPI) => {
    try {
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            loginfrom,
          }),
        }
      );
      let data = await response.json();

      if (data.message === 'Authorized.') {
        localStorage.setItem('token', data.access_token);

        localStorage.setItem('user_id', data.data.user_id);
        localStorage.setItem('user_name', data.data.user_name);
        localStorage.setItem('email', data.data.user_email);
        localStorage.setItem('image', data.data.image);
        localStorage.setItem('rank', data.data.rank);
        localStorage.setItem('loginfrom', data.loginfrom);

        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


export const resetPassword = createAsyncThunk<User[], ResetPasswordType>(
  'users/resetPassword',
  async ({ user_id, resetkey, user_pass }) => {
    try {
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/auth/resetPassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id,
            resetkey,
            user_pass,
          }),
        }
      );
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      console.log('Error', e.response.data);
    }
  }
);

export const signupUser = createAsyncThunk<User[], userType>(
  'users/signupUser',
  async (
    { username, email, password, park, version, type, appname },
    thunkAPI
  ) => {
    try {
      const user_registerby = 'MouseWait';
      const appname = 'VP';
      const type = 'VP';
      const fb_user_id = 0;
      const park = 'DL';
      const version = '11.0';
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            email,
            password,
            park,
            version,
            type,
            appname,
            user_registerby,
            fb_user_id,
          }),
        }
      );
      let data = await response.json();
      console.log('data', data);
      if (data.message === 'Authorized.') {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const changePassUser = createAsyncThunk<User[], changePassType>(
  'users/changePassType',
  async ({ password_old, password_new }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/auth/changePassword',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password_old,
            password_new,
          }),
        }
      );
      let data = await response.json();

      if (data.message === 'Authorized.') {
        localStorage.setItem('token', data.access_token);

        localStorage.setItem('userid', data.data.user_id);
        localStorage.setItem('user_name', data.data.user_name);
        localStorage.setItem('email', data.data.user_email);
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data.data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

// forgot paassword section here

export const forgotPass = createAsyncThunk<User[], forgotPasswordType>(
  'users/forgotpass',
  async ({ email }, thunkAPI) => {
    try {
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/auth/forgotPassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        }
      );
      let data = await response.json();
      console.log(data);

      if (data.data === 'Ok Done !') {
        return { ...data };
      } else {
        // localStorage.setItem('email', data.data.user_email);
        return thunkAPI.rejectWithValue(data.data);
      }
    } catch (e: any) {
      console.log('Error', e.response.data);

      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

//  update name section starts
export const updateprofile = createAsyncThunk<User[], updateprofileType>(
  'users/updateprofile',
  async ({ user_name, user_email, user_description, myfile }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/updateProfile',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name,
            user_email,
            user_description,
            myfile,
          }),
        }
      );
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      console.log('Error', e.response.data);

      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const verifyEmail = createAsyncThunk<User[], verifyEmailType>(
  'users/updateverifyEmail',
  async ({ verifymail }, thunkAPI) => {
    verifymail = 't';

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        GET_BASE_URL + '/backend/api/v1/verifyMail',
        {
          method: 'POST',
          headers: {
            Authorization: `bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            verifymail,
          }),
        }
      );
      let data = await response.json();
      return { ...data };
    } catch (e: any) {
      console.log('Error', e.response.data);

      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const chatSend = createAsyncThunk<User[], chatSend>(
  'users/chatsend',
  async ({ user_message }, thunkAPI) => {
    return await getChatApi({
      user_message,
    });
  }
);

export const usersSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    isLoggedIn: false,
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.errorMessage = '';

      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signupUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });

    builder.addCase(signinUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(signinUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });
    
    builder.addCase(resetPassword.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });

    builder.addCase(changePassUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(changePassUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(changePassUser.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });

    builder.addCase(forgotPass.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(forgotPass.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      // state.isLoggedIn = true;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(forgotPass.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });

    builder.addCase(updateprofile.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateprofile.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      // state.isLoggedIn = true;

      state.errorMessage = action.payload as any;
      return state;
    });
    builder.addCase(updateprofile.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });

    builder.addCase(chatSend.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(chatSend.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      // state.isLoggedIn = true;

      state.errorMessage = action.payload as any;
      return state;
    });

    builder.addCase(chatSend.rejected, (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = true;
      state.errorMessage = action.payload as any;
    });
  },
});

export default usersSlice.reducer;

export const { clearState } = usersSlice.actions;
