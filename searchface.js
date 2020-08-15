// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image
// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";
let model, webcam, labelContainer, maxPredictions;
// Load the image model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // Convenience function to setup a webcam
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}
// run the webcam image through the image model
async function predict() {
    // predict can take in an image, video or canvas html element
    var image = document.getElementById("profile-image");
    var teacherImage = document.getElementById("who-teacher");
    const prediction = await model.predict(image, false);
    for (let i = 0; i < maxPredictions; i++) {
        var classPrediction = "";
        if (prediction[i].probability >= 0.3) {
            if (prediction[i].className == '이사장님') {
                classPrediction = '<div style="margin:10px;font-size:1.3rem;">' + '당신은 <br>' + prediction[i].className + '과' + '<br>' + prediction[i].probability.toFixed(4) * 100.0 + '% 닮았습니다!';

            } else if (prediction[i].className == '사무국장') {
                classPrediction = '<div style="margin:10px;font-size:1.3rem;">' + '당신은 <br>' + prediction[i].className + '과' + '<br>' + prediction[i].probability.toFixed(4) * 100.0 + '% 닮았습니다!';
            }
            else {
                classPrediction = '<div style="margin:10px;font-size:1.3rem;">' + '당신은 <br>' + prediction[i].className + ' 선생님과' + '<br>' + prediction[i].probability.toFixed(4) * 100.0 + '% 닮았습니다!';
            }
            document.getElementById('loading').src = './image/arrow.png';
            document.getElementById('loading').id = 'arrow';
            teacherImage.src = "./image/" + prediction[i].className + ".png";
            frills();
            document.getElementById('btn').innerText = "다시하기";
            document.getElementById('btn').setAttribute('onclick', 'reset();');

        }

        labelContainer.childNodes[i].innerHTML = classPrediction;
    }


}

function loading() {
    document.getElementById('arrow').src = './image/loading.svg';
    document.getElementById('arrow').id = 'loading';
}

function frills() {
    $(".result-text").bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function () {
        $(".result-text").removeClass('active');
    })
    $(".result-text").addClass("active");
}

function reset() {
    location.reload();
}
