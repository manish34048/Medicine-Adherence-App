import { call, put, takeLatest } from "redux-saga/effects";
import networkService from "../../../network/networkService";
import { addImageError, addImageSuccess } from "../../action/userMedicine/addImageAction";
import { addImageConstant } from "../../constant/userMedicine/addImage";

export function* addImageWorkerSaga(payload)
{
   
    try{
        const response=yield call(networkService.addImage,payload)
        yield put(addImageSuccess(response))
    }
    catch(error)
    {
        yield put(addImageError(error))
    }
}

export function* addImageWatcherSaga(){
    yield takeLatest(
        addImageConstant.addImageLoad,addImageWorkerSaga
    )
}