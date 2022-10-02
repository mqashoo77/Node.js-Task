const fs = require('fs');
const readline = require('readline');
const filaName = 'users.csv'
const fileStream = fs.createReadStream(filaName);

const interfaceReader = readline.createInterface({
    input: fileStream
});


async function readFromFile(){
    users = [] ;
    for await (const line of interfaceReader) {
       
       const temp = line.split(",")
       users.push(temp)
    }
    return users;
}

async function writeOnFile(users){
    let csv = "";
    for (let index = 1; index < users.length; index++) {
        csv += users[index]
        csv+="\n"
    }
    fs.writeFileSync("write.csv", csv);
    return users

}

async function writeOnJsonFile(users){
    let json = "{\n\t";
    let Info = [users[0][0],users[0][1],users[0][2],users[0][3],users[0][4]]
    let numberOfUser = users.length-1
    let i = 0
    for ( ;numberOfUser !==0; ){
        json += `"${i+1}":{\n\t\t`
        for(let values = 0; values < Info.length ; values++){
            json += `"${Info[values]}": "${users[i+1][values]}"`
            json = (values !== Info.length- 1) ?  json+=",\n\t\t" : json 
        }
        numberOfUser--
        i++
        json= (numberOfUser !== 0) ? json += "\n\t},\n\t" : json += "\n\t}\n\t"
    }
    json += '\n}'
    fs.writeFileSync("write.json", json);
}

readFromFile().then(writeOnFile).then(writeOnJsonFile)