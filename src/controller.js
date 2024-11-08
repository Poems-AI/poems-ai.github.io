function keyTyped() {
 
    if (get_language() != "en"){
        console.log(key)
        switch(key) {
        case "1":
            window.location.href="video2_metareality.html"
            // window.location.href="vis2.html?poem=metareality.es"
            break;
        case "2":
            window.location.href="vis1.html?poem=picasso_in_botswana.es"
            break;
        case "3":
            window.location.href="video3_newWorlds.html"
            // window.location.href="vis3.html?poem=new_worlds.es"
            break;
        case "4":
            window.location.href="vis4.html?poem=inimitables.es"
            break;
        case "5":
            window.location.href="vis5.html?poem=burn_after_selling.es"
            break;
        case "6":
            window.location.href="shot1.html?lang=.es"
            break;
        case "7":
            window.location.href="shot2.html?lang=.es"
            break;
        case "8":
            window.location.href="shot3.html?lang=.es"
            break;
        case "9":
            window.location.href="shot4.html?lang=.es"
            break;
        case "0":
            window.location.href="shot5.html?lang=.es"
            break;
        case "q":
            window.location.href="pause.html?lang=.es"
            break;
        case "m":
            window.location.href="digital_poet_es.html"
            break;
        default:
        }
    }else { 
        console.log(key)
        switch(key) {
        case "1":
            window.location.href="vis1.html?poem=picasso_in_botswana.en"
            //window.location.href="shot4.html?lang=.en"
            // window.location.href="video2_metareality.html"
            // window.location.href="vis2.html?poem=metareality.en"
            break;
        case "2":
            window.location.href="video2_metareality.html"
            //window.location.href="vis2.html?poem=Excessive_exponentialities_in_a_finite_world.en"
            // window.location.href="vis1.html?poem=picasso_in_botswana.en"
            break;
        case "3":
            window.location.href="vis4.html?poem=inimitables.en"
            //window.location.href="vis1.html?poem=picasso_in_botswana.en"
            // window.location.href="video3_newWorlds.html"
            // window.location.href="vis3.html?poem=new_worlds.en"
            break;
        case "4":
            window.location.href="video3_newWorlds.html"
            // window.location.href="vis4.html?poem=inimitables.en"
            break;
        case "5":
            window.location.href="video4_lamaquina.html"
            // window.location.href="vis5.html?poem=burn_after_selling.en"
            break;
        case "6":
            window.location.href="vis2.html?poem=Excessive_exponentialities_in_a_finite_world.en"
            //window.location.href="video2_metareality.html"
            // window.location.href="shot1.html?lang=.en"
            break;
        case "7":
            window.location.href="vis5.html?poem=burn_after_selling.en"
            // window.location.href="shot2.html?lang=.en"
            break;
        case "8":
            window.location.href="vis4.html?poem=inimitables.en"
            // window.location.href="shot3.html?lang=.en"
            break;
        case "9":
            window.location.href="video1_losdigitos.html"
            break;
        case "0":
            window.location.href="vis8.html"
            // window.location.href="shot5.html?lang=.en"
            break;
        case "q":
            window.location.href="pause.html?lang=.en"
            break;
        case "m":
            window.location.href="digital_poet_en.html"
            break;
        default:
    
        }
    }
   


}

function get_poem_name(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('poem')
}

function get_language (){
    const queryString = window.location.search;
    const langArray = queryString.split(".");
    return langArray[1]
}