// import leftPad from './leftpad';

// const serNos = [6934, 23111, 23114, 1001, 211161];
// const strSNos = serNos.map(sn => leftPad(sn, 8, '0'));
// console.log(strSNos);

// import * as tfc from './@tensorflow/tfjs-core';
// import * as tf from '@tensorflow/tfjs';
// import { loadFrozenModel } from '@tensorflow/tfjs-converter';

// import * as tfc from './@tensorflow/tfjs-core';
// import * as tf from './tfjs';




// import { loadFrozenModel } from './tfjs-converter@0.2.0';

// import { Webcam } from './tensorcam';





//to instantiate a new webcam tensorcam
// const webcam = new Webcam(document.getElementById('#videoElement'));
// console.log(webcam);

console.log('hello world');

// loading the model

async function kerasMod() {

    console.log('run');

  // console.log('before load');
  // const MODEL_URL = "./model/tensorflowjs_model.pb";
  // const WEIGHTS_URL = "./model/weights_manifest.json";
  // console.log(MODEL_URL);
  // console.log(WEIGHTS_URL);
  // console.log('before loadFrozenModel');
  // const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);

  const model = await tf.loadModel('kerasModel/model.json');
  console.log(model);

  const pic = tf.fromPixels(document.querySelector("#pic"));  // for example
  const picE = pic.expandDims(0);
  const picF = picE.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
  console.log(picE);
  console.log(picF);    
  const prediction = model.predict(picF);



  console.log(prediction);

  model.predict(picF).print();


  // let isPredictingm = true;

  //THE LOOP FOR LOGGIN PREDICTIONS
  // while (isPredicting) {
  //   const predictedClass = tf.tidy(() => {
  //     const img = webcam.capture();
  //     const predictions = model.predict(img);
  //     return predictions.as1D().argMax();
  //   });

  //   const classId = (await predictedClass.data())[0];
  //   console.log(classId);
  //   await tf.nextFrame();

  // }


  // const cat = document.getElementById('cat');
  // model.execute({input: tf.fromPixels(cat)});

}

kerasMod();

async function load() {

  // const MODEL_URL = "./model/web_model.pb";
  // const WEIGHTS_URL = "./model/weights_manifest.json";

  // const MODEL_URL = "model/tensorflowjs_model.pb";
  // const WEIGHTS_URL = "model/weights_manifest.json";

  // const MODEL_URL = "https://radhorizon.com/ML/tensorflowjs_model.pb";
  // const WEIGHTS_URL = "https://radhorizon.com/ML/weights_manifest.json";

  // console.log(MODEL_URL);
  // console.log(WEIGHTS_URL);

  // console.log('before loadFrozenModel');
  // const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
  // console.log('after loadFrozenModel');

  const model = await tf.loadModel('kerasModel/model.json');

  console.log(model);


}

// load();


async function runMod() {
  console.log('before load');

  const MODEL_URL = "./model/tensorflowjs_model.pb";
  const WEIGHTS_URL = "./model/weights_manifest.json";


  console.log(MODEL_URL);

  console.log(WEIGHTS_URL);



  console.log('before loadFrozenModel');

  const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);

  // const model = await tf.loadModel(WEIGHTS_URL);



  console.log(model);

  // const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL)};
  // {const model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL)}catch(error){console.log(err)};


  console.log('before predict');

  let isPredictingm = true;

  //THE LOOP FOR LOGGIN PREDICTIONS
  while (isPredicting) {
    const predictedClass = tf.tidy(() => {
      const img = webcam.capture();
      //   const activation = mobilenet.predict(img);
      //   const predictions = model.predict(activation);
      const predictions = model.predict(img);
      return predictions.as1D().argMax();

    });

    // console.log(predictedClass);

    const classId = (await predictedClass.data())[0];

    console.log(classId);
    // ui.predictClass(classId);
    await tf.nextFrame();

    // console.log('while predicting after load');

  }


  // const cat = document.getElementById('cat');
  // model.execute({input: tf.fromPixels(cat)});


}

// runMod();


// for the webcam


class Webcam {

  // class Webcam {

  /**
   * @param {HTMLVideoElement} webcamElement A HTMLVideoElement representing the webcam feed.
   */
  constructor(webcamElement) {
      this.webcamElement = webcamElement;
  }

  /**
   * Captures a frame from the webcam and normalizes it between -1 and 1.
   * Returns a batched image (1-element batch) of shape [1, w, h, c].
   */
  capture() {
      return tf.tidy(() => {
          // Reads the image as a Tensor from the webcam <video> element.
          const webcamImage = tf.fromPixels(this.webcamElement);

          // Crop the image so we're using the center square of the rectangular
          // webcam.
          const croppedImage = this.cropImage(webcamImage);

          // Expand the outer most dimension so we have a batch size of 1.
          const batchedImage = croppedImage.expandDims(0);

          // Normalize the image between -1 and 1. The image comes in between 0-255,
          // so we divide by 127 and subtract 1.
          return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
      });
  }

  /**
   * Crops an image tensor so we get a square image with no white space.
   * @param {Tensor4D} img An input image Tensor to crop.
   */
  cropImage(img) {
      const size = Math.min(img.shape[0], img.shape[1]);
      const centerHeight = img.shape[0] / 2;
      const beginHeight = centerHeight - (size / 2);
      const centerWidth = img.shape[1] / 2;
      const beginWidth = centerWidth - (size / 2);
      return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
  }

  /**
   * Adjusts the video size so we can make a centered square crop without
   * including whitespace.
   * @param {number} width The real width of the video element.
   * @param {number} height The real height of the video element.
   */
  adjustVideoSize(width, height) {
      const aspectRatio = width / height;
      if (width >= height) {
          this.webcamElement.width = aspectRatio * this.webcamElement.height;
      } else if (width < height) {
          this.webcamElement.height = this.webcamElement.width / aspectRatio;
      }
  }

  async setup() {
      return new Promise((resolve, reject) => {
          const navigatorAny = navigator;
          navigator.getUserMedia = navigator.getUserMedia ||
              navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
              navigatorAny.msGetUserMedia;
          if (navigator.getUserMedia) {
              navigator.getUserMedia({
                      video: true
                  },
                  stream => {
                      this.webcamElement.srcObject = stream;
                      this.webcamElement.addEventListener('loadeddata', async () => {
                          this.adjustVideoSize(
                              this.webcamElement.videoWidth,
                              this.webcamElement.videoHeight);
                          resolve();
                      }, false);
                  },
                  error => {
                      document.querySelector('#no-webcam').style.display = 'block';
                  });
          } else {
              reject();
          }
      });
  }



}


// const webcam = new Webcam(document.getElementById('#videoElement'));






