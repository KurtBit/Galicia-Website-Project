const _ = require('lodash');
var images = require('../data/images.json');

class ImageModel {
    constructor(name, url) {
        this.Id = this.generateId();
        this.Name = name;
        this.Url = url;
    }

    generateId() {
        var sortedImages = images.sort(function(a, b){
            return (a.Id - b.Id);
        });

        var length = sortedImages.length;
        var lastImage = sortedImages[length - 1];

        return (length < 1) ? 0 : (lastImage.Id + 1);
    }
}

module.exports = ImageModel;