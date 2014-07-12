
// canvas blur image

API.canvasBlur = function(ele, img) {

    this.element = ele;
    this.image = img;

    this.element.width = this.image.width;
    this.element.height = this.image.height;

    this.context = this.element.getContext('2d');
    
    this.context.drawImage(this.image,0,0)

};

API.canvasBlur.prototype.blur = function(i) {

    this.context.globalAlpha = 0.5;

    for (var y = -i; y <= i; y += 2) {
        for (var x = -i; x <= i; x += 2) {
            this.context.drawImage(this.element, x + 1, y + 1)

            if (x >= 0 && y >= 0) {
                this.context.drawImage(this.element, -(x-1), -(y-1))
            }
        }
    }

    this.context.globalAlpha = 1;

};
