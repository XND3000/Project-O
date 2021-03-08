<!DOCTYPE html>
<html>
  	<head>

  		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  		<?php wp_head();?>

  		

	</head>



<body <?php body_class()?>>














	<header class="sticky-top">


				<div class="container">
				<?php wp_nav_menu (

					
					array(
						'theme_location'   => 'top-menu',
						'menu_class'  => 'navigation',
					)
			


				);?>
				</div>




		
	</header>

