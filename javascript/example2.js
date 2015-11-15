var clarifai;

// on document ready, instantiate the Clarifai object
function init(){
    clarifai = new Clarifai(
        {
            'clientId': '',
            'clientSecret': ''
        }
    );
}

// send a 'positive' url
function positive(){
  for (var i =0; i < healthyPositives.length; i++) {
    clarifai.positive(healthyPositives[i], 'healthy', cb).then(
        promiseResolved,
        promiseRejected 
    );
  }
}

// send a 'negative' url
function negative(){
    clarifai.negative(healthyNegatives[0], 'healthy', cb).then(
        promiseResolved,
        promiseRejected 
    );
}

// explicitly train our concept
function train(){
    clarifai.train('healthy', cb).then(
        promiseResolved,
        promiseRejected 
    );
}

// make a prediction on a url with our concept
function predict(urlToPredict, cb){
    var url = urlToPredict || 'http://farm3.static.flickr.com/2161/2141620332_2b741028b3.jpg';
    clarifai.predict(url, 'healthy', cb).then(
        promiseResolvedPrediction,
        promiseRejected 
    );
}

// grab tags for a particular image
function getTags(urlToPredict, cb){
    var url = urlToPredict || 'http://farm3.static.flickr.com/2161/2141620332_2b741028b3.jpg';
    clarifai.getTags(url, cb).then(
        promiseResolved,
        promiseRejected
    );
}

// list collections 
function listCollections(){
    clarifai.listCollections('healthy', cb).then(
        promiseResolved,
        promiseRejected
    );
}

function promiseResolved(obj){
    console.log('promiseResolved', obj);
}

function promiseResolvedPrediction(obj){
    console.log('promiseResolvedPrediction', obj);
}

function promiseRejected(obj){
    console.log('promiseRejected', obj);
}

function cb(obj){
    console.log('cb', obj);
}

var healthyPositives = [
  'https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s640x640/sh0.08/e35/11313595_1922054868019022_1581004886_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/1169885_1273739925984866_695790172_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/s640x640/sh0.08/e35/12230814_572226009608803_910224708_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xfa1/t51.2885-15/s320x320/e35/12256751_1708451079390458_1374998407_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/s640x640/sh0.08/e35/12224388_203489923317023_2118436316_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/s640x640/sh0.08/e35/12237613_1497677370527563_978309096_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xpt1/t51.2885-15/s640x640/sh0.08/e35/12224523_1525248011133056_1705033849_n.jpg'
];

var healthyNegatives = [
  'https://scontent.cdninstagram.com/hphotos-xpf1/t51.2885-15/s640x640/sh0.08/e35/11373697_1639914576290669_1556289790_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xft1/t51.2885-15/s640x640/sh0.08/e35/11417490_505730016257111_819208461_n.jpg',
  'https://scontent.cdninstagram.com/hphotos-xat1/t51.2885-15/s640x640/sh0.08/e35/12237609_961595910591791_1278129561_n.jpg'
];

$(document).ready(init);
