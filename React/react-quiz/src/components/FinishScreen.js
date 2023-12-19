function FinishScreen({ points, maxPossiblePoints, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🏅";
  } else if (percentage >= 80 && percentage < 100) {
    emoji = "🎉";
  } else {
    emoji = "😐";
  }

  return (
    <div>
      <p className="result">
        You Scored <strong>{points}</strong> Points Out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%) {emoji}
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "dataReceived" })}
      >
        Restart
      </button>
    </div>
  );
}

export default FinishScreen;
