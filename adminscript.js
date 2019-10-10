setInterval(getQs, 2000); 

function getQs() {
document.body.innerHTML = ''
let count = 0
localStorage.setItem("questions", JSON.stringify([]));
localStorage.setItem("qContent", JSON.stringify([]));
localStorage.setItem("value", JSON.stringify([]));
localStorage.setItem("name", JSON.stringify([]));
localStorage.setItem("session", JSON.stringify([]));
    
db.collection("questions-xl").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
    let q = JSON.parse(localStorage.getItem("questions"));
    let v = JSON.parse(localStorage.getItem("value"));
    let n = JSON.parse(localStorage.getItem("name"));
    let s = JSON.parse(localStorage.getItem("session"));
    let qc = JSON.parse(localStorage.getItem("qContent"));
    q.push(doc.id);
    v.push(doc.data().show);
    n.push(doc.data().subName);
    s.push(doc.data().subSession);
    qc.push(doc.data().subQuestion);
    localStorage.setItem("questions", JSON.stringify(q));
    localStorage.setItem("value", JSON.stringify(v));
    localStorage.setItem("qContent", JSON.stringify(qc));
    localStorage.setItem("name", JSON.stringify(n));
    localStorage.setItem("session", JSON.stringify(s));
        if(doc.data().show == "false"){
            var btn = document.createElement("button");
            var br = document.createElement("br");
            btn.innerHTML = doc.data().subQuestion;
            btn.style = "color: red;"
            let func = "javascript:toggle(" + count + ")"
            btn.setAttribute( "onClick", func );
            document.body.appendChild(btn);
            document.body.appendChild(br);

        }
        else if (doc.data().show == "true") {
            var btn = document.createElement("button");
            var br = document.createElement("br");
            btn.innerHTML = doc.data().subQuestion;
            btn.style = "color: green;"
            let func = "javascript:toggle(" + count + ")"
            btn.setAttribute( "onClick", func );
            document.body.appendChild(btn);
            document.body.appendChild(br);
            
        }
    count++
    });
});
}

function toggle(id){
    let itemId = JSON.parse(localStorage.getItem("questions"))[id];
    let value = JSON.parse(localStorage.getItem("value"))[id];
    let questionContent = JSON.parse(localStorage.getItem("qContent"))[id];
    let name = JSON.parse(localStorage.getItem("name"))[id];
    let sess = JSON.parse(localStorage.getItem("session"))[id];


    switch (value){
        case ("true"):
            value = "false";
            break;
        case ("false"):
            value = "true";
            break;
    }
    
    db.collection("questions-xl").doc(itemId).set({
        show: value,
        subName: name,
        subQuestion: questionContent,
        subSession: sess
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        swal({
            title: "Uh-oh!!",
            text: "Fatal error has occured... have you lost network connectivity?",
            icon: "error"
        })
        console.error("Error writing document: ", error);
    });
    
}