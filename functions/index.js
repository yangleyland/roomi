const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

var db = admin.firestore()

exports.scheduledFunctionCrontab = functions.pubsub.schedule('* * * * *')
  .onRun(async (context) => {
    const newDoc = db.collection('groups');
    const snapshot = await newDoc.get();
    snapshot.forEach(doc => {
        const taskArray=[];
        if (doc.data().tasks){
            doc.data().tasks.forEach((element) => {

                taskArray.push({task: element.task,point: element.point,claimed:false});
            });
            doc.ref.update({
                tasks:taskArray
            })
        }

    });
});