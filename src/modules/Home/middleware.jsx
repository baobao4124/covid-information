import {takeEvery} from 'redux-saga/effects';

function* doSomeThing() {
    yield 'hello';
}

export function* homeMiddleware() {
    yield takeEvery('STRING', doSomeThing);
}