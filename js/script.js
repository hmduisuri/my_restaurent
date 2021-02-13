$(document).ready(function(){
    $('body').bind('touchstart', function() {});
    let restdb = "https://isuri-restaurent-default-rtdb.firebaseio.com/";
    $(".fa-hamburger").click(function(){
        $(this).toggleClass('fa-times');
        $('nav').toggleClass('nav-toggle');
    });

    $('nav ul li a').click(function(){
        $('.fa-hamburger').removeClass('fa-times');
        $('nav').removeClass('nav-toggle');
    });

    $(".dot1").click(function(){
        $(".vid1").css('display','block');
        $(".vid2").css('display','none');
        $(".vid3").css('display','none');
    });
    $(".dot2").click(function(){
        $(".vid2").css('display','block');
        $(".vid1").css('display','none');
        $(".vid3").css('display','none');
    });
    $(".dot3").click(function(){
        $(".vid3").css('display','block');
        $(".vid1").css('display','none');
        $(".vid2").css('display','none');
    });
    
    $(window).on('scroll load', function(){
        if( $(window).scrollTop() > 10){
            $('#header').addClass('header-active');
        }else{
            $('#header').removeClass('header-active');
        }
    });

    // model creation
    function addlisners(){
      $(".card-container .card button").click(function(){
        var image,heading,detail,price,p_id = "";
        image = $(this).closest('.card').find('img')[0].currentSrc;
        heading = $(this).closest('.card').find('h3')[0].outerText;
        detail = $(this).closest('.card').find('p').text();
        price = $(this).closest('.card').find('h4')[0].outerText;
        p_id = $(this).closest('.card').find('h6')[0].outerText;


        $("#spc-model img").attr("src", image)
        $(".info-container").find("h2").html(heading)
        $(".info-container").find("p").html(detail)
        $(".info-container").find("h3").html(price)
        $(".info-container").find("h6").html(p_id)

        getReviews();
        });
    }
// change event of review input field
    $("#reviewInput").change(function(){
        var review = $(this).val();
        
        if(($.trim(review).length !==0) && ($.trim(review).length > 3)){
            $(".ico-review").removeClass('disable_alert').addClass('enable_alert');
        }else{
            $(".ico-review").removeClass('enable_alert').addClass('disable_alert');      
        }
    });

// create click event to review icon
    $(".ico-review").click(function() {
        var cus_review =  $("#reviewInput").val();
        if(($.trim(cus_review).length !==0) && ($.trim(cus_review).length > 3)){
            var product_review = "";
            product_review = {
            pk_review_id: Math.floor(Math.random() * 100),
            fk_product_id: parseInt($(".info-container h6").html()),
            pro_review: cus_review,
            review_date: new Date()
          }
          $.ajax({
              type: "POST",
              url: "https://isuri-restaurent-default-rtdb.firebaseio.com/product_review.json",
              data: JSON.stringify(product_review),
              dataType: "text",
              success:function(){
                getReviews();
                  console.log('Data inserted successfully');
                    $("#reviewInput").val("");
                    $("#myalert").addClass('alert').html("Thank you for your feedback!")
                    $("#myalert").fadeIn(1000);
                    $("#myalert").fadeOut(4000);
              },
              error:function(error){
                  console.log(error);
              }
          });
            
        }else{
            $(".ico-review").removeClass('enable_alert').addClass('disable_alert'); 
        }

    });
//calculate reviews
function filterReviews(data) {
        var g_numberOfreviews = 0;
        $.each(data,function(count){
            debugger;
           var ncount =  data[count].fk_product_id;
           
           var selected_product_id = parseInt($(".info-container h6").html());
           if(selected_product_id == ncount){
               g_numberOfreviews +=1;
            }
            
        });
        // console.log(ncount);

        console.log(g_numberOfreviews);
        $("#spc-model .info-container #ratingCount h4").html(g_numberOfreviews + " ratings");
    }

   // get reviews count
   function getReviews(){
        $.ajax({
            url: restdb + "product_review.json",
            type: "GET",
            dataType: "JSON",
            success: function(data){
                console.log(data);
                filterReviews(data);
            },
            error: function(error){
                console.log(error);
            }
        });
   }



// special card creation
try {
    
    $.ajax({
        url: "https://isuri-restaurent-default-rtdb.firebaseio.com/special-meals.json",
        type: 'GET',
        dataType: 'JSON',
        success:function(data){
            fetchmeals(data);
        },error:function(error){
            console.log(error)
        }
    });

    function fetchmeals(data) {
        var id,name,price,detail,image = "";
        console.log(data);
        $.each(data,function(i,meal){
            name = meal["p-name"];
            detail = meal["p-detail"];
            price = meal["p-price"];
            image = meal["p-image"];
            id = meal["p-id"];

            $("#special").find('.card-container').append($('<div>').addClass('card')
            .append($('<img>').attr({src: image, alt: ""}))
            .append($('<h3>').html(name))
            .append($('<div>').addClass('spc-btn-style')
            .append($('<a>').attr('href',"#special")
            .append($('<button>').attr("data-toggle", "modal").attr("data-target", "#spc-model")
            .html('Read more'))))     
            .append($('<div>').css("display","none")
            .append($('<p>').html(detail))
            .append($('<h4>').html('¥ ' + price))
            .append($('<h6>').html(id)))       
            )

        });
        addlisners();

    }

} catch (error) {
    console.log("From try catch " + error);
}




    $("#temp_sub").blur(function(){
        $("#subject").val("Customer inquery of Isu restaurent from " + $("#temp_sub").val());
    
    });

    $("#model-button").click(function(){
        $("#spc-model").css("display","none");
    });
});