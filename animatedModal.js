/*=========================================
 * ORIGINAL : animatedModal.js: Version 1.0
 * ORIGINAL : author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
 * customized by Angeltcho 
 * email: angeltcho@gmail.com
=========================================*/
/*=========================================
 * animatedModal.js: Version 1.0
 * Remarques : 
 * pour fermer le modal, ajouter l'attribut data-role = close
 * obligatoire : le trigger doit avoir un ID !
=========================================*/

(function ($) {
 
    $.fn.animatedModal = function(options) {
        var initiator = $(this);
        var modal_id;

        //Defaults
        var settings = $.extend({
            modalTarget:'am', 
            position:'fixed', 
            width:'100%', 
            height:'100%', 
            top:'0px', 
            left:'0px', 
            zIndexIn: '9999',  
            zIndexOut: '-9999',  
            color: '#39BEB9', 
            opacityIn:'1',  
            opacityOut:'0', 
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s', 
            overflow:'auto', 
            // Callbacks
            beforeOpen: function() {},           
            afterOpen: function() {}, 
            beforeClose: function() {}, 
            afterClose: function() {}
 
           
        }, options);

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration
        };

        $(document).on('click', initiator.selector, function(event) {
            event.preventDefault();
//            build Modal and append
            buildModal();
            
        var id = $('body').find('#'+settings.modalTarget);
            modal_id = id;
            id.addClass('animated');
            id.addClass(settings.modalTarget+'-off');
             id2 = id.attr('id');
             id.css(initStyles);
            $('body, html').css({'overflow':'hidden'});
            if (id2 == settings.modalTarget) {
                if (id.hasClass(settings.modalTarget+'-off')) {
                    id.removeClass(settings.animatedOut);
                    id.removeClass(settings.modalTarget+'-off');
                    id.addClass(settings.modalTarget+'-on');
                } 
                 if (id.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen();
                    id.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    id.addClass(settings.animatedIn);  
                    id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };  
            }
        });
        
        $(document).on('click', 'a[data-role=close]',function(event) {
            event.preventDefault();
            $('html, body').css('overflow', 'auto'); 
            settings.beforeClose(); //beforeClose
            var id = modal_id;
             if (id.hasClass(settings.modalTarget+'-on')) {
                id.removeClass(settings.modalTarget+'-on');
                id.addClass(settings.modalTarget+'-off');
             }
             if (id.hasClass(settings.modalTarget+'-off')) {
                id.removeClass(settings.animatedIn);
                id.addClass(settings.animatedOut);
                id.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
             }
        });

        function buildModal() {
            if($('body #'+settings.modalTarget).length == 0) {
                $('body').append('<div id="'+settings.modalTarget+'"><div  id="closebt-container"><a href="" data-role="close"><img class="closebt" src="img/closebt.svg" title="Fermer"></a></div><div class="modal-content"></div></div>');
                $('.modal-content').append(settings.html);
                
            }
        }
        function afterClose () {      
            modal_id.css({'z-index':settings.zIndexOut}).remove();
            settings.afterClose(); //afterClose
        }
        
        function afterOpen () {       
            settings.afterOpen(); //afterOpen
        }
    }; // End animatedModal.js

}(jQuery));



        
