console.log("it works")
let database = firebase.database().ref('questions');
let submitButton = document.getElementById("submitButton")
let messageContainer = document.getElementById("allQuestions")
let name = document.getElementById("name")
let question = document.getElementById("question")

const d = new Date();

var box = document.getElementById('allQuestions');

box.scrollTop = box.scrollHeight;

// database.on("value", addIDs)

// function addIDs(value) {
//     let info = value.val();
//     let everything = Object.keys(info)
//     let allButtons = document.querySelectorAll(".questionButton")
//     let allInputs = document.querySelectorAll(".answerInput")
    
//     for(i in allButtons){
//       allButtons[i].id = everything[i]
//       allInputs[i].id = "input"+everything[i]
//       allButtons[i].onclick = onClick
//     }
//     // console.log(everything);
//     // console.log(info)

//     // for (i in info) {
//     //     let k = info[i];
//     //     console.log(k.NAME)
       
//     // }
// }

submitButton.onclick = function updateDB(event){
  event.preventDefault();
  let username = name.value;
  let userQuestion = question.value;

  console.log(username,userQuestion)

  if(username == ""){
    alert("Put your Name")
  }
  else if(userQuestion == ""){
    alert("Enter a question")
  }
  else{
    
    let value = {
      NAME: username,
      QUESTION: userQuestion,
      ANSWER: ""
    }
    database.push(value)
  }
  name.value = ""
  question.value = ""

}

database.on("value", addQuestionToBoard)

function addQuestionToBoard(data){
  var questions = data.val();
  var keys = Object.keys(questions);
  let questionDiv = document.createElement("div")
  messageContainer.innerHTML = ""
  //console.log(keys);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var name = questions[k].NAME;
    var question = questions[k].QUESTION;
    var answer = questions[k].ANSWER
    //console.log(initials, score);
    let questionDiv = document.createElement("div")
    let answerQuestionButton = document.createElement("button")
    let pElement = document.createElement("p")
    let answerInput = document.createElement("input")

    let correctAnswer = document.createElement("p")
    correctAnswer.innerHTML = "Answer: " + answer

    answerQuestionButton.innerText = "Answer Question"
    answerQuestionButton.className = "questionButton"
    pElement.innerText = name + " : " + question;
    questionDiv.appendChild(pElement)

    answerInput.className = "answerInput"

    if (answer == ""){
      answerQuestionButton.style.visibility = "visible"
      answerInput.style.visibility = "visible"
      questionDiv.appendChild(answerInput)
      questionDiv.appendChild(answerQuestionButton)
    }else{
      answerQuestionButton.style.visibility = "hidden"
      answerQuestionButton.style.display = "none"
      answerInput.style.visibility = "hidden"
      answerInput.style.display = "none"
      questionDiv.appendChild(correctAnswer)
      questionDiv.appendChild(answerInput)
      questionDiv.appendChild(answerQuestionButton)
    }
    // questionDiv.style.border = "1px solid rgb(24, 27, 43)"
    questionDiv.style.backgroundColor = "white"
    questionDiv.style.paddingTop = "10px"
    questionDiv.style.paddingBottom = "10px"
    questionDiv.style.paddingLeft = "10px"
    questionDiv.style.marginTop = "10px"

    
    messageContainer.appendChild(questionDiv)
  }
  let everything = Object.keys(questions)
  let allButtons = document.querySelectorAll(".questionButton")
  let allInputs = document.querySelectorAll(".answerInput")
    
  for(i in allButtons){
    allButtons[i].id = everything[i]
    allInputs[i].id = "input"+everything[i]
    allButtons[i].onclick = onClick
  }

}

const onClick = function() {
  let id = this.id
  console.log(id)
  let input = document.getElementById("input" + id)
  let answer = input.value
  console.log(input.value)
  input.value = ""
  firebase.database().ref('questions/' + id).update({
      ANSWER: answer
  });
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}