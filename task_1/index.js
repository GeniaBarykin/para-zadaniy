import {encoded, translations} from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)
const decode = (element) =>{
    let result = {}
    for (const [key, value] of Object.entries(element)) {
        if (key == 'groupId' || key == 'service' 
        || key == 'formatSize' || key == 'ca' || value == null) {
            result[key] = value
        } else {
            result[key] = translate(value, key)
        }
      }
      return result
}

var unique_id = []
const translate = (field, key) => {
    const result = translations[parseInt(field)]
    if (result == undefined) {
        let unique = true;
        //Проверка если уже есть такая запись для избежания повторов
        for (let element of unique_id){
            if (element["field"] == key && element["value"] == field){
                unique = false;
                break;
            }
        };
        if (unique) unique_id.push({field : key, value : field})
        return field
    }
    else {
        return result
    }
}

let decoded = []
encoded.forEach(element => {
    decoded.push(decode(element))
}); 


console.log(decoded)
console.log("Unique IDs : \n",unique_id)
