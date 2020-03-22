var key = "15429610-7c7e67a62a906a936656b0a75"

module.exports = {
  getImages : function (keyword, orientation) {
    const request = require("request");

    if(keyword === ""){
      let randIdx = Math.floor(Math.random() * 100 % 8);
      var possibleWords = ["dogs", "cats", "mice", "birds", "horses", "boats", "sky", "food"];
      keyword = possibleWords[randIdx];
    }

    if(orientation === ""){
      orientation = "horizontal";
    }
    keyword.replace(/ /g, "+");

    return new Promise(function(resolve, reject){
      request(`https://pixabay.com/api/?key=${key}&orientation=${orientation}&safesearch=true&q=${keyword}`,
        function(error, response, body){

          if(!error && response.statusCode == 200){

              var parsedData = JSON.parse(body);
              var imageIdxs = module.exports.getRandoms(parsedData.hits.length);

              let imageData = []

              imageIdxs.forEach((item, i) => {
                imageData.push({});
                imageData[i].likes = parsedData.hits[item].likes;
                imageData[i].url = parsedData.hits[item].webformatURL;
              });
              resolve(imageData);
          } else {
            console.log(response.statusCode);
            console.log(error);
            reject([]);
          }
      });
    });
  },

  getRandoms : function (imageCount) {
    imageIdx = [];
    var holder;
    if(imageCount < 4){
      return imageIdx;
    }

    for(var i = 0; i < 4; i++){
      holder = Math.floor((Math.random() * 100) % imageCount);
      while(true){
        if(!imageIdx.includes(holder)){
          imageIdx.push(holder);
          break;
        }

        if(holder === imageCount - 1){
          holder = 0;
        }
        else{
        holder++;
        }
      }
    }

    return imageIdx;
  }
}
