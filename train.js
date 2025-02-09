
let start = document.querySelector(".start");
let train = document.querySelector("#train");
let today = document.querySelector("#today");
let workoutLog = JSON.parse(localStorage.getItem("workouts")) || {};
let streak=0;

const now = new Date();
const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

start.addEventListener("click", () => {
    if (train.style.display === "none" ) {
        train.style.display = "flex";
    } else {
        train.style.display = "none";
    }
});

const muscleGroups = [
    "abdominals", "abductors", "adductors", "biceps", "calves", "chest",
    "forearms", "glutes", "hamstrings", "lats", "lower_back", "middle_back",
    "neck", "quadriceps", "traps", "triceps"
];

let muscles = document.querySelector("#musclegroup");

muscleGroups.forEach((muscle) => {
    let part = document.createElement("option");
    part.value = muscle;
    part.innerText = muscle;
    muscles.appendChild(part);
});

const apiKey = "lrpYoqboNkrztxz2IYohlQ==ivnMS0rFm5rN57m6"; 
let apiUrlBase = "https://api.api-ninjas.com/v1/exercises?muscle=";

muscles.addEventListener("change", () => {
    let apiUrl = `${apiUrlBase}${muscles.value}`;
    console.log(apiUrl);
    getExercises(apiUrl);
});


let arr = [];


document.addEventListener("DOMContentLoaded", () => {
    let storedLogs = localStorage.getItem(dateKey);
    if (storedLogs) {
        arr = JSON.parse(storedLogs);
        arr.forEach(addToUI);
    }
});

async function getExercises(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: { "X-Api-Key": apiKey }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        let type = document.querySelector("#types");

        if (!type) {
            console.error("Error: <select id='types'> not found in the DOM");
            return;
        }
        
        const data = await response.json();
        console.log(data);

        if (!Array.isArray(data)) {
            console.error("Error: API response is not an array", data);
            return;
        }

        type.innerHTML = ""; 
        
        data.forEach((e) => {
            let type_option = document.createElement("option");
            type_option.value = e.name;
            type_option.innerText = e.name;
            type.appendChild(type_option);
        });

    } catch (error) {
        console.error("Error fetching exercises:", error);
    }
}


document.querySelector("#log").addEventListener("click", () => {
    let sets = document.querySelector("#sets").value;
    let reps = document.querySelector("#reps").value;
    let weights = document.querySelector("#weights").value;
    let type = document.querySelector("#types");

    if (!type || !type.value) {
        console.error("Error: No exercise selected!");
        return;
    }

    let newEntry = {
        muscle: muscles.value,
        exercise: type.value,
        sets: sets,
        reps: reps,
        weights: weights
    };


    let todayDate = new Date().toISOString().split('T')[0]; 
    if (!workoutLog[todayDate]) {
        workoutLog[todayDate] = [];
    }

    workoutLog[todayDate].push(newEntry);


    localStorage.setItem("workouts", JSON.stringify(workoutLog));





    arr.push(newEntry);
    localStorage.setItem(dateKey, JSON.stringify(arr));

    console.log(arr);

    addToUI(newEntry);
});


function addToUI(entry) {
    let t_box = document.createElement("div");
    t_box.classList.add("log-entry");

    let t_muscle = document.createElement("div");
    t_muscle.innerText = `Muscle: ${entry.muscle}`;

    let t_exer = document.createElement("div");
    t_exer.innerText = `Exercise: ${entry.exercise}`;

    let t_sets = document.createElement("div");
    t_sets.innerText = `Sets: ${entry.sets}`;

    let t_reps = document.createElement("div");
    t_reps.innerText = `Reps: ${entry.reps}`;

    let t_weight = document.createElement("div");
    t_weight.innerText = `Weight: ${entry.weights}`;

    t_box.appendChild(t_muscle);
    t_box.appendChild(t_exer);
    t_box.appendChild(t_sets);
    t_box.appendChild(t_reps);
    t_box.appendChild(t_weight);

    today.appendChild(t_box);
}


setInterval(() => {
    let now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        today.innerHTML = "Today's Workout";
        localStorage.removeItem(dateKey); 
        arr = []; 
        console.log("Workout logs cleared at midnight.");
    }
}, 60000); 


getExercises();



let oldWorkout=document.querySelector("#oldworkouts")
let oldWorkout_btn=document.querySelector("#fetchWorkouts")
oldWorkout_btn.addEventListener("click", () => {
    let dateInput = document.querySelector("#dateInput").value;
    let selectedDate = new Date(dateInput).toISOString().split('T')[0]; 
    console.log("Fetching Workouts for:", selectedDate);

    let loggedData = JSON.parse(localStorage.getItem("workouts")) || {};
    console.log("Stored Workout Data:", loggedData);

    let workoutsForDate = loggedData[selectedDate] || [];

 
    oldWorkout.innerHTML = "";

    if (workoutsForDate.length === 0) {
        oldWorkout.innerHTML = "<p>No workouts found for this date.</p>";
        return;
    }

    workoutsForDate.forEach((workout) => {
        let t_box = document.createElement("div");
        t_box.classList.add("log-entry");

        t_box.innerHTML = `
            <div>Muscle: ${workout.muscle}</div>
            <div>Exercise: ${workout.exercise}</div>
            <div>Sets: ${workout.sets}</div>
            <div>Reps: ${workout.reps}</div>
            <div>Weight: ${workout.weights}</div>
        `;

        oldWorkout.appendChild(t_box);
    });
});
oldWorkout_btn.addEventListener("change", () => {
    oldWorkout.innerHTML="";
})
let dabba=document.createElement("div")
dabba.id="dabba"

setTimeout( function dailyStreak() {
    let dates = Object.keys(workoutLog)
        .map(date => new Date(date))
        .sort((a, b) => a - b); 

    if (dates.length === 0) {
        streak = 0;
        return;
    }

    let count = 1; 
    for (let i = 1; i < dates.length; i++) {
        let prevDate = new Date(dates[i - 1]);
        prevDate.setDate(prevDate.getDate() + 1); 

        if (dates[i].toDateString() === prevDate.toDateString()) {
            count++;
        } else {
            count = 1;
        }
    }

    streak = count; 

    console.log("Current Streak:", streak);
    document.querySelector("#heading").innerHTML = `<h3>Streak <i class="fa-solid fa-fire"> </i> :${streak}</h3> `;
    for(let i=0;i<streak;i++){
        document.querySelector("#boxes").appendChild(dabba)

    }
}
,1000)













