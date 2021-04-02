import {all} from 'redux-saga/effects';
import {homeMiddleware} from './../modules/Home/middleware';

export default function* rootSaga () {
    yield all ([
        homeMiddleware()
    ]);
}