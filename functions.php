<?php


function load_stylesheets()
{




	wp_register_style('bootstrap', get_template_directory_uri() . '/css/bootstrap.min.css')
	array(), false,'all');

	wp_enque_style('stylesheet');


		wp_register_style('stylesheet', get_template_directory_uri() . 'style.css')
	array(), false,'all');

	wp_enque_style('stylesheet');

}
add_action('wp_enque_scripts', 'load_stylesheets');











function include_jquery()
{

	wp_deregister_script('jquery');

	wp_enque_script('jquery', get_template_directory_uri(). '/js/jquery-3.6.0.min.js',',1,'true);

	add_action('wp_enque_scripts','jquery');

}

add_action('wp_enque_scripts','include_jquery');








function loadjs()
{




	wp_register_script('customjs', get_template_directory_uri()  . '/js/scripts.js','',1, true );
	wp_enque_script('customjs');


}
add_action('wp_enque_scripts','loadjs');