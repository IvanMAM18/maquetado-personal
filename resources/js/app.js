/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

//require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//require('./components/Example');
jQuery(function () {
    let expo_start = new Date("2024-08-30T09:00:00");

    console.log(expo_start.getTime() - new Date());
    var timerTime = 0, // Time set on the interval.
        timerInterval = 0; // The interval for our loop.
    let timerClock = $("#time-counter");
    let timerClock2 = $("#time-counter2");

    // If there is a valid set time from last session, set it again.
    if (Number(localStorage.lastTimerTime)) {
        timerTime = Number(localStorage.lastTimerTime); // * 60;

        timerClock.text(returnFormattedToSeconds(timerTime));
        timerClock2.text(returnFormattedToSeconds(timerTime));
        //timerInput.val(localStorage.lastTimerTime);
    }

    var newTime = expo_start.getTime() - new Date();

    if (newTime && newTime >= 0) {
        timerTime = newTime; //* 60;
        localStorage.lastTimerTime = newTime;
        timerClock.text(returnFormattedToSeconds(timerTime));
        timerClock2.text(returnFormattedToSeconds(timerTime));
    }

    function startTimer() {
        // Prevent multiple intervals going on at the same time.
        clearInterval(timerInterval);

        // Every 1000ms (1 second) decrease the set time until it reaches 0.
        timerInterval = setInterval(function () {
            timerTime--;
            timerClock.text(returnFormattedToSeconds(timerTime));
            timerClock2.text(returnFormattedToSeconds(timerTime));

            if (timerTime <= 0) {
                timerClock.text(returnFormattedToSeconds(0));
                timerClock2.text(returnFormattedToSeconds(0));
            }
        }, 1000);

        timerClock.removeClass("inactive");
        timerClock2.removeClass("inactive");
    }

    function returnFormattedToSeconds(timeInMilliSeconds) {
        let seconds = Math.floor(timeInMilliSeconds / 1000);

        let minutes = seconds / 60;
        let hours = minutes / 60;
        let days = hours / 24;
        let time =
            days +
            ":" +
            (hours % 24) +
            ":" +
            (minutes % 60) +
            ":" +
            (seconds % 60);

        return `Faltan ${Math.floor(
            days
        )} días, ${Math.floor(hours % 24)} horas y ${Math.floor(minutes % 60)} minutos`;
    }

    startTimer();
});
