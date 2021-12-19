var projects = {};
var shopping_list = [];
var basket = [];  


$(document).ready(function(){

    console.log('ready');

    $.getJSON("projects.json", function(data){
        projects = data;
        console.log(projects);
        drawProjectQuests(projects);
    });     

    $(document).on('click','#projects .projectBoard',function(e){

        var subtype = $(this).data('type');

        drawProjectSubQuests(projects[subtype],subtype);

    });

    $(document).on('click','#subProjects .projectBoard',function(e){

        var type = $(this).data('type');
        var subtype = $(this).data('subtype');
        var myType = $(this).data('index');
        var item = { [subtype] : projects[type][myType][subtype] };
        shopping_list.push( item );
        drawActiveProjects();

    });


    $(document).on('click','.activeProjects-delete',function(e){

        var index = $(this).closest('.activeProject').data('index');
        shopping_list.splice(index, 1);
        drawActiveProjects();

    });

    

});

function drawProjectQuests(projects){

    $.each(projects, function(index,jsonObject){

        $('#projects').append('<div id="' + index + '" class="projectBoard tier1" data-type="' + index + '"><div class="projectBoardInner"><h3>' + index + '<h3></div></div>');

    });

}

function drawProjectSubQuests(projects,type){

    $('#subProjects').html('');

    $.each(projects, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            console.log(jsonObject);

            $('#subProjects').append('<div id="' + key + '" class="projectBoard" data-index="' + index + '" data-type="' + type + '" data-subtype="' + key + '"><div class="projectBoardInner"><h3>' + key + '</h3></div></div>');

        });

    });

}

function drawActiveProjects(){
    
    $('#activeProjects').html('<h4>Active Projects (' + shopping_list.length + ')</h4><ul class="shoppingItems"></ul>');


    $.each(shopping_list, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            //console.log(jsonObject);

            $('#activeProjects .shoppingItems').append('<li class="shoppingItem" data-index="' + index + '" data-type="" data-subtype="' + key + '"><h3>' + key + '</h3><span class="shoppingItem-delete">X</span></li>');

        });            


    });

    drawShoppingList();
    //$('#activeProjects').html(JSON.stringify(shopping_list, undefined, 2));

}

function drawShoppingList(){

    $('#shoppingList').html('<h4>Shopping List</h4><ul class="basketItems"></ul>');

    $.each(shopping_list, function(index,jsonObject){

        $.each(jsonObject, function(key,val){

            //console.log(val);

            $.each(val, function(ikey,ival){

                $.each(ival, function(bkey,bval){

                    var itemClass = bkey.replaceAll(" ","");

                    if($('.basketItem.' + itemClass).length > 0 ){
                        var currentVal = parseInt($('.basketItem.' + itemClass + ' .basketQty').html());
                        currentVal+= bval;
                        $('.basketItem.' +itemClass+' .basketQty').html(currentVal);
                        //console.log(currentVal);
                    }else{
                        $('.basketItems').append('<li class="basketItem ' + itemClass  + '" data-sort="' + itemClass + '"><h3><span class="basketName">' + bkey + '</span> x <span class="basketQty">' + bval + '</span></h3></li>');
                    }

                });


            });

            //console.log(jsonObject);

            //$('.basketItems').append('<li class="basketItem" data-index="' + index + '" data-type="" data-subtype="' + key + '"><h3>' + key + '</h3></li>');

        });            


    });

}

function resetactiveProjects(){

    shopping_list = [];
    drawActiveProjects();

}