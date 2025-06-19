import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceTracker = ({ onClose }) => {
  const videoRef = useRef(null);
  const [anomalyDetected, setAnomalyDetected] = useState(false);

  useEffect(() => {
    const loadModelsAndStart = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();

      setTimeout(() => scanForFace(), 1000); // wait for camera to warm up
    };

    const scanForFace = async () => {
      const result = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions());
      if (result) {
        setTimeout(() => setAnomalyDetected(true), 1000); // wait then show "anomaly"
      } else {
        setTimeout(scanForFace, 500); // try again
      }
    };

    loadModelsAndStart();

    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="absolute top-24 left-24 bg-black border border-purple-600 w-[500px] h-[400px] rounded-lg shadow-lg z-50">
      <div className="bg-gray-800 text-white text-sm p-2 flex justify-between items-center">
        <span>📷 Facial Scan</span>
        <button onClick={onClose} className="hover:text-red-400">❌</button>
      </div>
      <div className="flex flex-col items-center justify-center h-full relative">
        <video ref={videoRef} width="400" height="300" className="rounded" />

        {anomalyDetected && (
          <div className="absolute bottom-10 text-red-500 font-mono text-lg animate-pulse">
            ❗ Anomaly Identified
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceTracker;

