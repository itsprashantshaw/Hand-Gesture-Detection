import React from 'react'
import Confetti from "react-confetti-boom";
import Camera from '../Camera/Camera.jsx';

function Webcam() {
    const [gestureText, setGestureText] = React.useState(null);

    const [isGameStarted, setIsGameStarted] = React.useState(false);
    const [isGamePaused, setIsGamePaused] = React.useState(false);

    const [computerScore, setComputerScore] = React.useState(0);
    const [userScore, setUserScore] = React.useState(0);

    const [whoWon, setWhoWon] = React.useState(null);

    const [logs, setLogs] = React.useState([]);

    React.useEffect(() => {
        if (gestureText != null) {
            switch (gestureText) {
                case "Open Palm":
                    whoWins("PAPER");
                    break;
                case "Closed Fist":
                    whoWins("STONE");
                    break;
                case "Victory":
                    whoWins("SCISSOR");
                    break;
                default:
                    break;
            }
        }
    }, [gestureText]);

    const reset = () => {
        setComputerScore(0);
        setUserScore(0);

        setIsGameStarted(false)
        setIsGamePaused(false)

        setLogs([]);
    }

    const start = () => {
        setIsGameStarted(true)
        setIsGamePaused(false)
        setWhoWon(null)
    }

    const stop = () => {
        setIsGamePaused(true)
    }


    React.useEffect(() => {
        if (userScore == 1 || computerScore == 1) {
            setWhoWon(userScore > computerScore ? 'You' : 'Computer')
            setIsGameStarted(false)
            setIsGamePaused(false)
            document.getElementById('my_modal_5').showModal()
        }
    }, [userScore, computerScore]);

    const whoWins = (userChoice) => {
        var options = ["STONE", "PAPER", "SCISSOR"];
        var computerChoice = options[Math.floor((Math.random() * options.length))]

        if (userChoice == computerChoice) {

        } else if (userChoice == "STONE") {
            if (computerChoice == "PAPER") {
                setComputerScore((score) => score + 1)
            } else if (computerChoice == "SCISSOR") {
                setUserScore((score) => score + 1);
            }
        } else if (userChoice == "PAPER") {
            if (computerChoice == "SCISSOR") {
                setComputerScore((score) => score + 1)
            } else if (computerChoice == "STONE") {
                setUserScore((score) => score + 1);
            }
        } else if (userChoice == "SCISSOR") {
            if (computerChoice == "STONE") {
                setComputerScore((score) => score + 1)
            } else if (computerChoice == "PAPER") {
                setUserScore((score) => score + 1);
            }
        }
        setLogs((oldLogs) => [...oldLogs, `You choosed ${userChoice} & Computer choosed ${computerChoice}`])
    }

    return (
        <div>
            <div className="h-screen grid grid-cols-12 gap-8 pt-8 pb-4 px-8 bg-black-800">
                {whoWon === "You" && (
                    <Confetti
                        mode="fall"
                        particleCount={200}
                        colors={["#ff577f", "#ff884b"]}
                    />
                )}
                <div className="col-span-12 md:col-span-8  border-2 border-gray-400 overflow-hidden rounded-lg">
                    <div className="h-full flex justify-center items-center bg-black">
                        {
                            (isGameStarted == true && isGamePaused == false) ? (
                                <Camera onGestureChange={setGestureText} />
                            ) : (isGamePaused == true) ? (
                                <span className="text-2xl text-gray-50">The Game Is Paused</span>
                            ) : (
                                <span className="text-2xl text-gray-50">Click start to start the game</span>
                            )
                        }
                    </div>
                </div>

                <div className="flex flex-col col-span-12 md:col-span-4  border-2 border-gray-400 overflow-hidden rounded-lg">
                    <div className="flex py-4">
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h3 className="text-gray-50 text-4xl">{userScore}</h3>
                            <h5 className="text-gray-50">You</h5>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <h3 className="text-gray-50 text-4xl">{computerScore}</h3>
                            <h5 className="text-gray-50">Computer</h5>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 min-h-[150px]'>

                        {
                            (isGameStarted == false || isGamePaused == true) ? (
                                <div
                                    onClick={start}
                                    className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-green-700 cursor-pointer hover:bg-green-500">
                                    Start
                                </div>
                            ) : (
                                <div onClick={stop} className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-red-700 cursor-pointer hover:bg-red-500">
                                    Stop
                                </div>
                            )
                        }


                        <div onClick={reset} className="h-[50px] flex justify-center items-center text-medium text-gray-50 bg-gray-700 cursor-pointer hover:bg-gray-500">
                            Restart
                        </div>
                    </div>

                    <div className="h-full p-2 ">
                        <div className="h-full max-h-[300px] p-4 overflow-y-auto scrollbar-hide">
                            {
                                logs.map((log, index) => (
                                    <div className='px-2 py-1 rounded-lg border border-white shadow-lg shadow-gray-700/40 mb-1'>
                                        <div key={index} className="text-white-400 text-sm mb-2">
                                            {log}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <dialog id="my_modal_5" className="min-w-[600px] bg-white p-8 rounded-lg">
                <div className="modal-box">
                    <h3 className="font-bold text-3xl">
                        {whoWon == "Computer" ? '😔Computer won better luck next time!!' : '🥳Congratulations You Won!!'}
                    </h3>
                    <p className="mt-4 mb-8">Do you want to challange the Computer again?</p>
                    <div className="modal-action">
                        <form method="dialog" className='space-x-4'>
                            <button className="btn py-3 px-4 border-1 rounded border-gray-200" onClick={reset}>Close</button>
                            <button className="btn py-3 px-4 border-1 rounded border-gray-200 bg-blue-400" onClick={() => {
                                start();
                                reset();
                            }}>Start Game</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default Webcam