<?php
/*
Template Name: Single Post
*/
?>

<?php

/*
Template Name: Standard Page Template
*/
?>

<?php get_header();?>




<div class="container" pt-5 pb-5>
 


 <h1><?php the_title();?></h1>




 	<?php if(has_post_thumbnail()):?>

 		<img src= "<?php the_post_thumbnail_url('largest');?>" class="img-fluid">

 	<?php endif;?>






 <?php if (have_posts()) : while (have_posts()) : the_post();?>

 		<?php the_content();?>

 <?php endwhile; endif;?>




</div>








<?php get_footer();?>