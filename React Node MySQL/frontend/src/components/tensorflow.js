import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl'; // If you want to use WebGL for inference

// Load the model from the file
async function loadModel() {
    const model = await tf.loadLayersModel('./random_forest_model.pkl');
    
    return model;
}

export default async function generateData(newDataPoint) {
    // Load the model
    const model = await loadModel();

    // Assuming threshold is defined somewhere in your code
    const threshold = 0.5;

    // Make prediction
    const new_data_point_pred = model.predict(newDataPoint);
    const new_data_point_pred_binary = new_data_point_pred.greaterEqual(threshold).cast('int32');
    
    if (new_data_point_pred_binary.dataSync()[0] === 1) {
        console.log("You are prone to diabetes.");
    } else {
        console.log("You are not prone to diabetes.");
    }
}
