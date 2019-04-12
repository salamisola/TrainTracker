 // Initialize Firebase
 var config = {
  apiKey: "AIzaSyAJZOGClm_G9TwZDGNcCCxjUNKOw8LRUm0",
  authDomain: "traintimeproj.firebaseapp.com",
  databaseURL: "https://traintimeproj.firebaseio.com",
  projectId: "traintimeproj",
  storageBucket: "traintimeproj.appspot.com",
  messagingSenderId: "1045580429148"
};
firebase.initializeApp(config);
  // var tMinutesTillTrain = 0;
  //function to dispaycurrent time
  function displayCurrentTime() {
	setInterval(function(){
		$('#current-time').html(moment().format('hh:mm A'))
	  }, 1000);
	}
	displayCurrentTime();
	var msgRef = firebase.database()
	
	//Click on submit to submit the form
	$("#submit").on("click", function() {
		//to prevent the default behavior i.e prevent the form from trying to submit to the index
		event.preventDefault();
		
		//form values
		var trainName = getTrainSchedule('trainName');
		var destination = getTrainSchedule('destination');
		var firstTrainTime = getTrainSchedule('firstTrainTime');
		var frequency = getTrainSchedule('frequency');
		console.log(trainName);
		console.log(destination);
		console.log(firstTrainTime);
		console.log(frequency);
		
		
		var currentTime = moment();
	    console.log("The current time is " + moment(currentTime).format("HH:mm"));  

	  // formats the first train time value 
	  var formattedFirstTrainTime =moment(firstTrainTime, 'HH:mm').format('hh:mm a');
	  console.log("The first train is at " + formattedFirstTrainTime);

	  // First Time (pushed back 1 year to make sure it comes before current time) 
	  var firstTrainTimeConverted = moment(formattedFirstTrainTime, "hh:mm").subtract(1, "years");
	  
	  // the difference between time in minutes   
	  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	  
	  // the remaining time when time difference is divided by the frequency
	  var Remainder = diffTime % frequency;
	  
	  // the remainder is subtracted from the frequency and stored in minutesAway
	  var minutesAway = frequency - Remainder;
	  console.log("The next train is " + minutesAway + " minutes away");
	  
	  // minutesAway is added to the current time and stored in the nextArrival variable 
	  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
	  console.log("The next train arrives at " + nextArrival);
	  
	  var newTrain = {
			trainName: trainName,
			destination: destination,
			firstTrainTime: firstTrainTime,
			frequency: frequency,
			nextArrival: nextArrival,
			minutesAway: minutesAway,
			currentTime: currentTime.format("hh:mm A")
		};
		
		msgRef.ref().push(newTrain);
		//save message
		//saveMessage(trainName,destination,firstTrainTime,frequency);
		
		
		//show alert
		/* document.querySelector('.alert').style.display = 'block';
		
		//hide alert after 3 seconds
		setTimeout(function(){
			document.querySelector('.alert').style.display = 'none';
		}, 3000); */
		
		//clear form after submission
	   document.getElementById('trainScheduleForm').reset();
		
		
	});

	//function to get form values

	function getTrainSchedule(id){
		return document.getElementById(id).value;
	};

	


  msgRef.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  console.log(prevChildKey);

  // Store everything into a variable.
  var trainName = childSnapshot.val().trainName;
  var destination = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().firstTrainTime;
  var frequency = childSnapshot.val().frequency;
	var nextArrival = childSnapshot.val().nextArrival;
	var minutesAway = childSnapshot.val().minutesAway;
	var currentTime = childSnapshot.val().currentTime;
	
	
	//Train info
	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(nextArrival);
	console.log(minutesAway);
	console.log(frequency);
	console.log(currentTime);

		var currentTime = moment();
	  // format current time using moment.js
	  console.log("The current time is " + moment(currentTime).format("HH:mm"));  

	  // formats the first train time value 
	  var formattedFirstTrainTime =moment(firstTrainTime, 'HH:mm').format('hh:mm a');
	  console.log("The first train is at " + formattedFirstTrainTime);

	  // First Time (pushed back 1 year to make sure it comes before current time) 
	  var firstTrainTimeConverted = moment(formattedFirstTrainTime, "hh:mm").subtract(1, "years");
	  
	  // the difference between time in minutes   
	  var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
	  
	  // the remaining time when time difference is divided by the frequency
	  var Remainder = diffTime % frequency;
	  
	  // the remainder is subtracted from the frequency and stored in minutesAway
	  var minutesAway = frequency - Remainder;
	  console.log("The next train is " + minutesAway + " minutes away");
	  
	  // minutesAway is added to the current time and stored in the nextArrival variable 
	  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
	  console.log("The next train arrives at " + nextArrival);

	
	var newRow = $("<tr>").append(
			$("<td>").text(trainName),
			$("<td>").text(destination),
			$("<td>").text(frequency),
			$("<td>").text(nextArrival),
			$("<td>").text(minutesAway)
		  );

    $("#train-schedule-body").append(newRow);
	  


});


	//});