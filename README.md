# radLens

##UPDATE: please refrain from using this repo.... some of the code has not been updated in months and may have numerous issues... please check out my upcoming updated repo for RadLens-AI 3.0 which let's you train your own CV AI models right on your phone using the power of tensorflow.js

##My first git project and
##it's for running a tensorflow model I trained in python that
##I'm trying to convert with tensorflowjs for deployment in the web.


I tried two differend bundlers: webpack and parcel.

the src and public folders are for my webpack build so if you prefer not to use webpack then you can ignore those.

the dist folder is the folder where the parcel bundler stores all my distributable files for the final product.
I currently prefer parcel over webpack though. All the parcel index files (index.html and index.js etc) are in the root of the project.

This is totally a work in progress. I put this here so that maybe others can learn from my mistakes and give me suggestions on how to improve the code.

My goal is to make a simple javascript web app that uses a phone's camera to classify and detect things.
I'm currently using python to train the model (Not included in this repo).
I'm using tensorflow.js and tensorflowjs_converter to use the trained model for web development and javascript (which is the purpose of this repo). 



