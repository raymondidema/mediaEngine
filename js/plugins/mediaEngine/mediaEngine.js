$(document).ready( function () {
	// Variables
	var meFiles = 'image/*';
	var meLocation = '/file/post';
	var DropTemplate = '<div class="dz-preview dz-file-preview"><a href="#"><img data-dz-thumbnail /></a><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div></div>';
	var DropTemplate = '<div class="dz-preview dz-file-preview"><div class="attachment"><div class="loader"></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div>';
	// Initialize dropzone handler
	$('body').on('click', 'a.dz-btn', function (e) {
		e.preventDefault();
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
			});
		},
		url: meLocation,
		acceptedFiles: meFiles,
		previewsContainer: ".preview-container",
		previewTemplate: DropTemplate,
		thumbnailWidth: 120,
		thumbnailHeight: 120
	});
});