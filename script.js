var firebaseConfig = {
    apiKey: "AIzaSyAN2FDwjX0olT8S071_aTUFm5Sujagm25Q",
    authDomain: "ask-ask-your-question.firebaseapp.com",
    databaseURL: "https://ask-ask-your-question.firebaseio.com",
    projectId: "ask-ask-your-question",
    storageBucket: "ask-ask-your-question.appspot.com",
    messagingSenderId: "589820337702",
    appId: "1:589820337702:web:9b7d01511b5ed027d150e7"
}

  firebase.initializeApp(firebaseConfig);

  // Define a global variable as our database
  var db = firebase.firestore();  


function submitQuestion () {
    let name = document.getElementById("name").value;

    if(name == ""){
        name = "anonymous";
    }

    let question = document.getElementById("question").value;
    let session = document.getElementById("session").value;

    if(question == ""){
        swal({
            title: "Please enter a question...",
            icon: "error"
        });

        return;
    }

    upload(name,question,session);

}

function upload (name, question, session){
    db.collection("questions-xl").add({
        subName: name,
        subQuestion: question,
        subSession: session
    })
    // Once the server responds, the fields are cleared and the getData() subroutine is completed
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        swal({
            title: "Here's what I sent to the server:",
            text: "Name: " + name + "\nQuestion: " + question,
            icon: "success"
        });
    })
    // If the server resonds with an error, this will run
    .catch(function(error) {
        console.error("Error adding document: ", error);
        swal({
            title: "Something went wrong...",
            text: "I sent a request to my server, but didný get a reply. Maybe try again?",
            icon: "error"
        })
    });

}

function loadQuestions() {
    document.getElementById("questions").innerHTML = "";
    var questions = []
    document.getElementById("questions").innerHTML = "";

    let loaded = false;
    var loadingimg = document.createElement("img");
 
    loadingimg.src = "loading-gif.gif";
    var src = document.getElementById("questions");
     
    src.appendChild(loadingimg);
    
    db.collection("questions-xl").get().then(function(querySnapshot) {
        console.log(querySnapshot)
        querySnapshot.forEach(function(doc) {
            questions.push({
                key: doc.id,
                content: doc.data()})

                if(loaded==false){
                    document.getElementById("questions").innerHTML = "";
                    loaded = true;
                }
                

                var para = document.createElement("p");
                var node = document.createTextNode(doc.data().subQuestion + " -> From Session " + doc.data().subSession) ;
                para.appendChild(node);

                var element = document.getElementById("questions");
                element.appendChild(para);
            
        });
        if(loaded==false){
        document.getElementById("studentlist").innerHTML = "-- No Students Found --"; 
        }
        document.getElementById("questionslen").innerHTML = "There are " + questions.length + " questions. \n"
    });
    
}