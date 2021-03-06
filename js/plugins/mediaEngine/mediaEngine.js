function MediaAddItems(classname, total_items, previewClass, location)
{
	$('body').on('click',classname, function(e)
	{
		e.preventDefault();
	});
	var Template = '<div data-dz-errormessage></div>';
	$(classname).dropzone({
		maxFiles: total_items,
		url: location,
		acceptedFiles: 'image/*',
		previewsContainer: ".product-upload",
		previewTemplate: Template,
		init: function() {
			this.on("success", function(file, responseText) {
				$(previewClass).prepend('<div class="product-images"><img src="upload/'+ responseText.filename +'" /></div>');
				var count = $(previewClass + ' .product-images');

				
				
				if(count.length == total_items)
				{
					$(previewClass + ' .product-images-plus').remove();
				}
			});
			this.on("canceled", function(file, responseText) {
				
			});
			this.on("maxfilesreached", function(file, responseText) {
				
			});
			this.on("maxfilesexceeded", function(file, responseText) {
				// still need to do some stuff here
				
			});
			this.on('completemultiple', function(files, responseText)
			{



			});
		}
	});
	
}

function MediaEngine(meFiles, meLocation) {
	// This shouldn't be needed after install
	var myDate = (new Date).getTime();
	

	// Init CKeditor
	$('.ckeditor').ckeditor({
		contentsCss : 'js/plugins/mediaEngine/ckeditor_style.css,
		format_tags : 'p;h1;h2;h3;pre',
		extraAllowedContent : '*[id](*)',
		extraPlugins: 'mediaengine'
	});
	// Variables
	// var DropTemplate = '<div class="dz-preview dz-file-preview"><a href="#"><img data-dz-thumbnail /></a><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div></div>';
	var DropTemplate = '<div class="dz-preview dz-file-preview"><div class="attachment"><div class="loader"></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div>';
	// Initialize dropzone handler
	$('body').on('click', 'a.dz-btn', function (e) {
		e.preventDefault();
	});

	$('body').on('click', '#upload-media', function (e) {
		e.preventDefault();
		$('#mediaengine').fadeIn();
	});

	$('body').on('click', '#mediaengine', function (e) {
		if($(e.target).hasClass('mediaengine')){ $('#mediaengine').fadeOut(); }
	});

	$(document).keyup(function(e) {
		if (e.keyCode == 27) { $('#mediaengine').fadeOut(); }   // esc
	});

	// Media selecter
	$('body').on('click', 'a.link', function (e)
	{
		e.preventDefault();
		var Selector = $(this).attr('href');
		$('.media-tabs').removeClass('active');
		$(Selector).addClass('active');
		$('a.link').parent().removeClass('active');
		$(this).parent().addClass('active');
	});

	$('body').on('click', '.attachment', function (e)
	{
		e.preventDefault();
		$(this).addClass('selected');
	});

	$('body').on('click', '.attachment.selected', function (e)
	{
		e.preventDefault();
		$(this).removeClass('selected');
	});

	$('body').on('change', 'input[name="meUrl"]', function (e)
	{
		e.preventDefault();
		var Image = $(this).val();
		$('#mePreview').html('<img src="'+Image+'" />');
	});

	// Initilize dropzone
	$(".dz-default, .dz-btn").dropzone({
		init: function() {
			this.on("success", function(file, responseText) {
				// still need to do some stuff here
				var newImage = document.createElement('img');
				newImage.setAttribute('src', '/upload/' + responseText.filename);
				file.previewTemplate.children[0].children[1].appendChild(newImage);
				file.previewTemplate.children[0].children[0].remove();


			});
		},
		url: meLocation,
		acceptedFiles: meFiles,
		previewsContainer: ".preview-container",
		previewTemplate: DropTemplate,
		thumbnailWidth: 120,
		thumbnailHeight: 120
	});

	$('body').on('click','#insert-into-ck', function (e)
	{
		e.preventDefault();
		var SelectMedia = $('.selected img').map(function () {
			return $(this).attr('src');
		}).get();
		if(SelectMedia.length >= 1)
		{
			$.each(SelectMedia, function(i, item)
			{
				CKEDITOR.instances['addMediaEngine'].insertHtml('<img src="'+ item +'" />');
				$('#mediaengine').fadeOut();
				$('.selected').removeClass('selected');
			});
		}
		else
		{
			
		}
	});

};

var Mijncontent = 'foobar';

CKEDITOR.plugins.add( 'mediaengine', {
    requires: 'widget',
    init: function( editor ) {
        editor.widgets.add( 'mediaengine', {

            // button: 'Create a simple box',

            template:
                '<div class="simplebox">' +
                    '<h2 class="simplebox-title">Title</h2>' +
                    '<div class="simplebox-content"><p>'+Mijncontent+'</p></div>' +
                '</div>',

            editables: {
                // title: {
                //     selector: '.simplebox-title',
                //     allowedContent: 'br strong em'
                // },
                // content: {
                //     selector: '.simplebox-content',
                //     allowedContent: 'p br ul ol li strong em'
                // }
            },

            allowedContent:
                'div(!slideshow); div(!slide); img',

            requiredContent: 'div(slideshow)',

            upcast: function( element ) {
                return element.name == 'div' && element.hasClass( 'slideshow' );
            }
        } );
    }
} );