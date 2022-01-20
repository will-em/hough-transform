// Create grayscale array from image data (RGBA -> grayscale)
export const image_to_grayscale = (ImageData) => { // Neglecting transparency 
    let grayArr = new Array(ImageData.width*ImageData.height);
    let j = 0;
    for(let i=0; i<grayArr.length; i++){
        grayArr[i] =  Math.round(0.299*ImageData.data[j] + 0.587*ImageData.data[j + 1] + 0.114*ImageData.data[j + 2]);
        j+=4;
    }

    return grayArr;
}

// Copy grayscale array onto image data
export const grayscale_arr_to_image = (arr, ImageData) => {
    let j = 0;
    for(let i=0; i<arr.length; i++){
        ImageData.data[j] = arr[i];
        ImageData.data[j + 1] = arr[i];
        ImageData.data[j + 2] = arr[i];
        ImageData.data[j + 3] = 255; // Full transparency 
        j+=4;
    }
}


// Reshape array to 2D-array
export const array_to_mat = (arr, height, width) => {
    let mat = [];
    while(arr.length)
        mat.push(arr.splice(0, width))
    return mat;
}

// 2D-array to array
export const flatten = (arr) => {
    let height = arr.length;
    let width = arr[0].length;

    let flat = [];

    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            flat[i*height + j] = arr[i, j];
        }
    }

    return flat;
}

// Normalize 2D-array and multiply by 255
export const norm256 = (arr) => {
    let height = arr.length;
    let width = arr[0].length;
    let max = 0;
    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            if(arr[i, j]>max)
                max = arr[i, j];
        }
    }
    if(max==255)
        return arr;

    let newMat = [...arr]; // Copy array
    
    for(let i=0; i<height; i++){
        for(let j=0; j<width; j++){
            newMat[i, j] = 255 * newMat[i, j] / max;
        }
    }

}