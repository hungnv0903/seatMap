$(document).ready(function(){
    var jqXHR ; 
    var checkId = '' ; 
    function APISeatMap(data){

        let spanLoading = $("<span></sapn>").addClass("span-loading")
        let spanNotFound = $("<span></span>").text("NOT FOUND") ; 
        let divLoading  =  $("<div></div>").text("Loading").addClass("ring").append(spanLoading); 
        let divNotFound = $("<div></div>").css({"display":"none"}).addClass("notfound").append(spanNotFound) ;
        $(".offcanvas-body").append(divLoading , divNotFound) ;  

        
        jqXHR = $.ajax({
            type: "POST",
            url: "http://environment.techlive.vn/Flight/SeatMap",
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json",
            success: function (response) {
                divLoading.css({"display":"none"}) ; 
                if(response.Status===false){
                    divNotFound.css({"display":"block"}) ; 
                }
                console.log(response) ;
                let listFlightSeat = response.ListFlightSeat ; 
                let listColumn = listFlightSeat[0].ListCabin[0].ListColumn ; 
                console.log(listColumn)
                
                
                var template = $("#seatMapTemplate").html();
                $.tmpl(template, listFlightSeat).appendTo(".offcanvas-body");
                var ColumnTemplate = $("#columns").html() ; 
                $.tmpl(ColumnTemplate,listColumn).appendTo("#columns_seats") ; 
                
    
                $('input[type="checkbox"]').change(function () { 
                    $('input[type="checkbox"]').not(this).prop('checked',false) ;
                    $('input[type="checkbox"]').not(this).removeClass("active") ;
                    $(this).toggleClass("active") 
                    
                    let id = $(this).attr("id") ;
                    if($(this).hasClass("active")){
                        console.log(id) ; 
                        $(".selected-seat").text(`${parseInt(id)}-${id[id.length-1]}`) ; 
                    }else{
                        $(".selected-seat").text("") ; 
                    }
                    
                });
    
                const displayTooltip = ()=> {
                    $(".seat").mouseenter(function() {
                        $(this).find("#tooltipSeat").css("display", "block");
                    });
            
                    $(".seat").mouseleave(function() {
                        $(this).find("#tooltipSeat").css("display", "none");
                    });
                }
                
                const displayModal = ()=>{ 
                    $(".seat").click(function () {
                        // $(this).toggleClass("active") ; 
                        // let id = $(this).find("input").attr("id") ; 
                        // if(!$(this).find('input').prop('disabled')){
                        //     $(this).attr({
                        //         "data-bs-target":`#${id}_exampleModalToggle`, "data-bs-toggle":"modal",
                        //     });
                        // }
                    });
                    
    
                }
            
                const checkResponsive = ()=> {
                    if ($(window).width() >= 1200) {
                        displayTooltip();
                    } else {
                        $(".seat").off("mouseenter mouseleave");
                        displayModal() ; 
                    }
                }
        
                checkResponsive();
            
                $(window).resize(function() {
                    checkResponsive();
                });
    
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if(textStatus==='abort'){
                    checkId = '' ; 
                }else{
                    console.log(textStatus) ; 
                }
            },
        });
    }
    
  
    $(document).on('click', '.flight', function() {
        if(checkId!==$(this).attr("id")){
            
            checkId = $(this).attr("id") ;
            
            $(".offcanvas-body").empty() ; 
            $(".columns_seats").empty() ; 
            $(this).addClass("bg-primary text-light") ; 
            $(".selected-seat").empty() ; 
            let data =  {
                "System": "VNA",
                "FlightValue": $(this).attr("id"),
                "HeaderUser": "TechLive",
                "HeaderPass": "EVHLt5gvLc6GN6p",
                "AgentCode": "KAO1005",
                "ProductKey": "ougjqzpoldzuc15"
            }
            APISeatMap(data) ;
           
        } 
        
    });

    $('#demo').on('hide.bs.offcanvas', function() {
        if (jqXHR) {
            jqXHR.abort(); 
        }
    });

})