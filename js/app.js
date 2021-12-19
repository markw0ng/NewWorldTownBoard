
// initialise variables for later
var projects = {
    "Cooks Needed" : [
        {
            "20 Light Ration" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/foodhealthrecoveryt1.png",
                "items" : [
                    { "Light Ration" : 20}
                ]
            }
        },
        {   
            "5 Travel Ration" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/foodhealthrecoveryt2.png",
                "items" : [
                    {"Travel Ration" : 5}
                 ]        
            }
        },
        {
            "15 Travel Ration" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/foodhealthrecoveryt2.png",
                "items" : [
                    { "Travel Ration" : 15}
                ]
            }
        },            
        {
            "Condiment Supplies" :{
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/faction_provisions.png",
                "items" : [
                    {"Salt" : 12},
                    {"Peppercorn" : 12},
                    {"Cooking Oil" : 12}
                ]
            }
        },            
        {
            "Carb Supplies" :{
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/faction_provisions.png",
                "items" : [
                    {"Potato" : 12},
                    {"Pasta" : 12},
                    {"Bread" : 12}
                ]
            }
        }
    ],
    "Fisherfolk Needed" : [

        {
            "15 Fish Filet" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/fisht1.png",
                "items" : [
                    {"Fish Filet" : 15}
                ]
            }
        },
        {
            "30 Fish Filet" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/fisht1.png",
                "items" : [
                    {"Fish Filet" : 30}
                ]
            }
        },
        {
            "15 Firm Fish Filet" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/fisht1.png",
                "items" : [
                    {"Firm Fish Filet" : 15}
                ]
            }
        },
        {
            "30 Firm Fish Filet" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/fisht1.png",
                "items" : [
                    {"Firm Fish Filet" : 30}
                ]
            }
        },                                    
    ],
    "Alchemists Needed" : [
        {
            "1 Strong Mana Potion" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/potionmanat3.png",
                "items" : [
                    {"Strong Mana Potion" : 1}
                ]
            }
        }
    ],
    "Lumberjacks Needed" : [
        {
            "150 Green Wood" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/woodt1.png",
                "items" : [
                    {"Green Wood" : 150}
                ]
            }
        },
        {
            "550 Green Wood" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/woodt1.png",
                "items" : [
                    {"Green Wood" : 550}
                ]
            }
        }            
    ],
    "Stonemasons Needed" : [
        {
            "30 Stone Block" : {
                "img" : "https://cdn.nwdb.info/db/images/live/v3/icons/items_hires/blockt2.png",
                "items" : [
                    {"Stone Block" : 30}
                ]
            }
        }         
    ]
};
var shopping_list = [];
var basket = [];  


// on page ready
$(document).ready(function(){

    // load project json file into variable projects
    /*
    $.getJSON("projects.json", function(data){
        projects = data;
        console.log(projects);
        drawProjectQuests(projects);
    });     
    */
    drawProjectQuests(projects);

    // on click of main project board category
    $(document).on('click','#projects .projectBoard',function(e){

        var subtype = $(this).data('type');

        drawProjectSubQuests(projects[subtype],subtype);

    });

    // on click of sub projects
    $(document).on('click','#subProjects .projectBoard',function(e){

        var type = $(this).data('type');
        var subtype = $(this).data('subtype');
        var myType = $(this).data('index');
        var item = { [subtype] : projects[type][myType][subtype] };
        shopping_list.push( item );
        drawActiveProjects();

    });

    // on click of deletion of project
    $(document).on('click','.activeProject-delete',function(e){

        var index = $(this).closest('.activeProject').data('index');
        shopping_list.splice(index, 1);
        drawActiveProjects();

    });

    
});

// redraw projects
function drawProjectQuests(projects){

    $.each(projects, function(index,jsonObject){

        $('#projects').append('<div id="' + index + '" class="projectBoard tier1" data-type="' + index + '"><div class="projectBoardInner"><h3>' + index + '</h3></div></div>');

    });

}


// redraw project subquests
function drawProjectSubQuests(projects,type){

    $('#subProjects').html('');

    $.each(projects, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            console.log(jsonObject);

            $('#subProjects').append('<div id="' + key + '" class="projectBoard" data-index="' + index + '" data-type="' + type + '" data-subtype="' + key + '"><div class="projectBoardInner"><img src="' + val.img + '" class="projectBoardImg"><h3>' + key + '</h3></div></div>');

        });

    });

}


// draw active projects
function drawActiveProjects(){
    
    $('#activeProjects').html('<h4>Active Projects (' + shopping_list.length + ')</h4><ul class="activeProjects"></ul>');


    $.each(shopping_list, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            $('#activeProjects .activeProjects').append('<li class="activeProject" data-index="' + index + '" data-type="" data-subtype="' + key + '"><h3>' + key + '</h3><span class="activeProject-delete">X</span></li>');

        });            


    });

    drawShoppingList();

}

// draw shopping list
function drawShoppingList(){

    $('#shoppingList').html('<h4>Shopping List</h4><ul class="basketItems"></ul>');

    $.each(shopping_list, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            //console.log(val);

            $.each(val['items'], function(ikey,ival){

                console.log(ival);

                $.each(ival, function(bkey,bval){

                    console.log(bkey + ' ' + bval);

                    var itemClass = bkey.replaceAll(" ","");

                    if($('.basketItem.' + itemClass).length > 0 ){
                        var currentVal = parseInt($('.basketItem.' + itemClass + ' .basketQty').html());
                        currentVal+= bval;
                        $('.basketItem.' +itemClass+' .basketQty').html(currentVal);
                        //console.log(currentVal);
                    }else{
                        $('.basketItems').append('<li class="basketItem ' + itemClass  + '" data-sort="' + itemClass + '"><h3><span class="basketQty">' + bval + '</span> <span class="basketName">' + bkey + '</span></h3></li>');
                    }

                });


            });

        });            


    });

}

function resetactiveProjects(){

    shopping_list = [];
    drawActiveProjects();

}