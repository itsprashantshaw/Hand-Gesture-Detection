export const drawLandmarks = (ctx, landmarks) => {
  // Draw connections
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;

  // Define hand connections
  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4], // thumb
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8], // index finger
    [0, 9],
    [9, 10],
    [10, 11],
    [11, 12], // middle finger
    [0, 13],
    [13, 14],
    [14, 15],
    [15, 16], // ring finger
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20], // pinky
    [0, 5],
    [5, 9],
    [9, 13],
    [13, 17], // palm
  ];

  // Draw connections
  connections.forEach(([start, end]) => {
    const startPoint = landmarks[start];
    const endPoint = landmarks[end];

    ctx.beginPath();
    ctx.moveTo(
      startPoint.x * ctx.canvas.width,
      startPoint.y * ctx.canvas.height
    );
    ctx.lineTo(endPoint.x * ctx.canvas.width, endPoint.y * ctx.canvas.height);
    ctx.stroke();
  });

  // Draw landmarks
  landmarks.forEach((landmark) => {
    ctx.beginPath();
    ctx.arc(
      landmark.x * ctx.canvas.width,
      landmark.y * ctx.canvas.height,
      3,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "red";
    ctx.fill();
  });
};

export const countFingers = (landmarks) => {
  let fingerCount = 0;

  // Thumb
  const thumbTip = landmarks[4];
  const thumbIp = landmarks[3];
  if (thumbTip.x < thumbIp.x) {
    fingerCount++;
  }

  // Other fingers
  const fingerTips = [8, 12, 16, 20]; // Index, Middle, Ring, Pinky
  const fingerPips = [6, 10, 14, 18]; // Second joint of each finger

  fingerTips.forEach((tipIdx, idx) => {
    const tip = landmarks[tipIdx];
    const pip = landmarks[fingerPips[idx]];

    // Finger is considered up if the tip is higher than the pip joint
    if (tip.y < pip.y) {
      fingerCount++;
    }
  });

  return fingerCount;
};

export const getGestureText = (gesture) => {
  switch (gesture.toLowerCase()) {
    case "closed_fist":
      return "Closed Fist";
    case "open_palm":
      return "Open Palm";
    case "victory":
      return "Victory";
    default:
      return gesture;
  }
};
