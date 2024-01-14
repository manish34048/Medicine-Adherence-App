import {DOWNLOAD_PDF, FETCH_IMAGE} from '../../constants/apiUrl';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {config} = RNFetchBlob;

const Downloadpdf = async globalmedId => {
  const id = await AsyncStorage.getItem('user_id');
  const token = await AsyncStorage.getItem('accessToken');
  console.log(token,"token")
  const headers=new Headers()
  headers.append('Authorization', `Bearer ${token}`);
  
  const date = new Date();
  let downloaddir = RNFetchBlob.fs.dirs.DownloadDir;
  let downloadPath = `${downloaddir}/report_${Math.floor(
    date.getTime() + date.getSeconds() / 2,
  )}.pdf`;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: downloadPath,
      description: 'Downloading your report',
    },
  };
  let generate_pdf_url = `${DOWNLOAD_PDF}?userMedicineId=${globalmedId}&Id=${id}`;
  let response = '';

  try {
    await fetch(generate_pdf_url,{method: 'GET', headers: {
      Authorization: `Bearer ${token}`,
    }
    })
      .then(res => res)
      .then(async resp => {
        await config(options)
          .fetch('GET',generate_pdf_url, {
                    Authorization: `Bearer ${token}`,
                  })
          .catch(() => {
            return 'err';
          });
      })
      .catch(() => {
        response = 'err';
        return response;
      });
    return response;
  } catch (err) {
    response = 'err';
    return response;
  }
};

export default Downloadpdf;
