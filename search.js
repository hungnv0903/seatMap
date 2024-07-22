$(document).ready(function(){
    function callAPI(data) {
        $.ajax({
            url: 'http://environment.techlive.vn/Flight/Search', 
            contentType: 'application/json', 
            type: 'POST',
            data: JSON.stringify(data), 
            dataType: 'json',
            success: function(response) {
                console.log(response)

                let listOption = response.ListFareData.map((item , index)=>{
                    return item.ListOption[0].ListFlight[0]; 
                })
                // console.log(listOption) ; 
                listOption.forEach((element , index) => {
                    let li = $("<li></li>").text(`${index}_____${element.StartPoint}-${element.EndPoint}_____${element.StartDate}-----${element.EndDate}`)
                        .attr({
                            'id':element.FlightValue,
                            'data-bs-toggle':"offcanvas",
                            'data-bs-target':"#demo",
                        })
                        .addClass("flight py-4 col-12 col-md-5 text-center border-bottom")
                        .css({"cursor":"pointer"}) ; 
                    $(".search").append(li);
                    $(".start-end-point").text(`${element.StartPoint}-${element.EndPoint}`)
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus)
            }
        });
    }
    
    let data = {
                    "Adt": 1,
                    "Chd": 0,
                    "Inf": 0,
                    "System": "VNA",
                    "ListFlight": [{
                            "Leg": 0,
                            "StartPoint": "HAN",
                            "EndPoint": "SGN",
                            "DepartDate": "23082024"
                        }
                    ],
                    "HeaderUser": "TechLive",
                    "HeaderPass": "EVHLt5gvLc6GN6p",
                    "AgentCode": "KAO1005",
                    "ProductKey": "ougjqzpoldzuc15",
                }
    
    
    callAPI(data)    
})

