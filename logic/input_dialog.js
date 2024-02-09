
export let isInputStatus= false;
export var object_name;

function delay (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


export function stop_propagation(event){
    event.stopImmediatePropagation();
}

export function show_input(obj_name){
    object_name= obj_name;
    //+++++++++ INPUT DIALOG ++++++++
    var dialog = document.getElementById('object-info-dialog');
    dialog.classList.remove('hidden');   
    isInputStatus= true; 
}

export async function remove_input(event){
    // Close the dialog' / .
    var dialog = document.getElementById('object-info-dialog');
    dialog.classList.add('hidden');
    
    //INSTEAD OF USING TIMER TO PREVENT THE THREE SCENE FROM RECEIVING INTERACTION WHEN THE HTML BUTTON IS CLICKED event stop propagation IS USED INSTEAD
    event.stopImmediatePropagation();
    isInputStatus= false;
}

window.stop_propagation= stop_propagation;
