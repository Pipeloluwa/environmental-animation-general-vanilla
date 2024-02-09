import { remove_input, object_name } from "./input_dialog";
import { objectProperties2 } from "../view_model";

export var model_json= new Map();
export var objects_data= [];

// {
//     'model_name': modelName,
//     'data': [
//         {
//             'object_name':objectName, 
//             'object_user_name':objectUserName, 
//             'object_description':objectDescription
//         },
    
//     ]   
// }




export function add_information(event) {
    // var object_item= new Map();
    const modelName= "scene";
    const objectName = object_name;
    // const objectUserName = document.getElementById('objectName').value;
    const objectDescription = document.getElementById('objectDescription').value;

    console.log('Object Name:', objectName);
    // console.log('Object User Name:', objectUserName);
    console.log('Object Description:', objectDescription);

    // object_item.set('object_name', objectName );
    // object_item.set('object_description', objectDescription );
    objects_data.push(
        {
            'object_name':objectName, 
            // 'object_user_name':objectUserName, 
            'object_description':objectDescription
        },
    );
    remove_input(event);
}


export function submit_information(event){
    model_json.set(
        {
            'model_name': "room1",
            'data': objects_data
        }
    );

    objectProperties2= objects_data;
    console.log(model_json);
    event.stopImmediatePropagation();
    
    // window.location.href= "../view_model.html";
}

//TSINCE WE ARE USING OUR JS SCRIPT AS A MODEULE IN HTML, SO WE HAVE TO DO THIS TO MAKE THE FUNCIONS ACCESSIBLE TO HTML
window.add_information= add_information;
window.submit_information= submit_information;

//object_item.get('object_name');
