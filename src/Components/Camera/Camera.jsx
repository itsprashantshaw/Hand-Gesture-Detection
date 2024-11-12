import React, { useEffect, useRef, useCallback } from "react";
import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawLandmarks, getGestureText } from "./gestureUtils.js";

const Camera = ({ onGestureChange, isRunning }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const gestureRecognizerRef = useRef(null);
  const isRunningRef = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    initializeGestureRecognizer();
    setupCamera();

    return () => {
      if (gestureRecognizerRef.current) {
        gestureRecognizerRef.current.close();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    isRunningRef.current = isRunning; // Update the isRunningRef based on the prop
    if (isRunning) {
      startDetection();
    } else {
      stopDetection();
    }
  }, [isRunning]);

  const initializeGestureRecognizer = async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

    gestureRecognizerRef.current = await GestureRecognizer.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task",
        },
        runningMode: "VIDEO",
      }
    );
  };

  const setupCamera = async () => {
    const constraints = {
      video: {
        width: 640,
        height: 480,
      },
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const pauseAndResume = () => {
    stopDetection();

    // Display countdown on canvas
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let countdown = 5;

    const updateCountdown = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        `Paused: ${countdown}s`,
        canvas.width / 2,
        canvas.height / 2
      );
      countdown--;

      if (countdown >= 0) {
        setTimeout(updateCountdown, 1000);
      } else {
        startDetection();
        predictWebcam();
      }
    };

    updateCountdown();
  };

  const predictWebcam = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Canvas context is not availabe");
      return;
    }
    if (!video || !canvas || !gestureRecognizerRef.current) return;
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      console.warn("Invalid video dimensions.");
      return;
    }

    if (isRunningRef.current) {
      let startTimeMs = performance.now();

      // Detect gestures
      const gestureResult = gestureRecognizerRef.current.recognizeForVideo(
        video,
        startTimeMs
      );

      // Clear canvas and draw video frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (gestureResult.gestures.length > 0) {
        const gesture = gestureResult.gestures[0][0];
        const handedness = gestureResult.handedness[0][0];
        const landmarks = gestureResult.landmarks[0];

        drawLandmarks(ctx, landmarks);
        const gestureText = getGestureText(gesture.categoryName);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(`Hand: ${handedness.categoryName}`, 25, 20);
        ctx.fillText(`Gesture: ${gestureText}`, 25, 40);

        if (
          ["closed_fist", "open_palm", "victory"].includes(
            gesture.categoryName.toLowerCase()
          )
        ) {
          const detectedGestureText = getGestureText(gesture.categoryName);
          onGestureChange(detectedGestureText);
          pauseAndResume();
        }
      }

      requestAnimationFrame(predictWebcam);
    }
  };

  const startDetection = () => {
    isRunningRef.current = true;
    predictWebcam();
  };

  const stopDetection = () => {
    isRunningRef.current = false;
  };

  return (
    <div className="relative bg-red w-full h-full">
      <video
        ref={videoRef}
        className="hidden"
        autoPlay
        playsInline
        onLoadedData={startDetection}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        width={640}
        height={480}
      />
    </div>
  );
};

export default Camera;
