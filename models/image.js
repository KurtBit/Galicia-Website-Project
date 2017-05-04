const _ = require('lodash');
var images = require('../data/images.json');

class ImageModel {
    constructor(name, url) {
        this.Id = this.generateId();
        this.Name = name;
        this.Url = url;
    }

    generateId() {
        var sortedImages = _(images).sort(x => x.Id);
        if (images.length < 1) {
            return 0;
        }
        
        return (sortedImages.pop().Id + 1);
    }
}

module.exports = ImageModel;