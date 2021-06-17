import { takeLatest, call, put, delay } from "redux-saga/effects";
import {push} from "react-router-redux";
import {resetState} from '../actions/resetStateAction';
import { request } from './helper';
import {RegisterError, RegisterUserSuccess, EmailConfirmationSuccess, EmailConfirmationError} from "../actions/registerAction";
import axios from 'axios'

const inscription =
  function *inscription ({data}) {
    try {
      const response = yield call(request, {
        "url": "http://localhost:3001/register",
        "data": data,
        "method": "post"
      });
      
      if(response.data.isValid){
        yield put(RegisterUserSuccess(data));
        yield put(push("/login"));
      }
      else{
        if(response.data.errPicture){
          yield put(RegisterError(response.data.errPicture));
        }
        else if(response.data.errUsername && !response.data.errEmail){
          yield put(RegisterError(response.data.errUsername));
        }
        else if(response.data.errEmail && !response.data.errUsername){
          yield put(RegisterError(response.data.errEmail));
        }
        else if (response.data.errEmail && response.data.errUsername) {
          yield put(RegisterError('Username and email already exist'));
        }
        else
        yield put(RegisterError('Invalid input'));
      }
      yield delay(4000);
      yield put(resetState());
    }catch (error) {
      if (error.response) {
        yield put(RegisterError("error.response.statusText", "error.response.status"));
      }
    }
  };

const emailConfirm =
function *emailConfirm ({token}) {
  try {
    const response = yield axios.post('http://localhost:3001/confirmEmail', {token});
    if(response.data === 'success')
    {
      yield put(EmailConfirmationSuccess());
    }
    else if(response.data === 'error')
    {
      yield put(EmailConfirmationError());
    }
  }catch (error) {
      if (error.response) {
        yield put(EmailConfirmationError());
      }
    }
};

export default function *reg() {
  yield takeLatest("REGISTER_USER", inscription);
  yield takeLatest("EMAIL_CONFIRMATION", emailConfirm);
}