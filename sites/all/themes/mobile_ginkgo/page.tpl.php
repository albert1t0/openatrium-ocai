<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">
  <head>
    <?php print $head ?>
    <?php print $styles ?>
    <?php print $scripts ?>
    <?php print $ie ?>
    <title><?php print $head_title ?></title>
  </head>
  <body <?php print drupal_attributes($attr) ?>>

  <?php print $skipnav ?>

  <div id='global'><div class='limiter clear-block'>
    <?php if ($header): ?>
      <div id='header' class='dropdown-blocks toggle-blocks clear-block'>
        <?php print $header ?>
      </div>
    <?php endif; ?>
    <?php print $breadcrumb ?>
  </div></div>

  <?php if ($primary_links): ?>
  <div id='navigation'><div class='limiter clear-block'>
    <div class="dropdown-blocks toggle-blocks clear-block">
      <div id="block-atrium-features-menu" class="block block-atrium block-toggle">
        <div class="block-title">
          <a href="#block-atrium-features-menu" class="element-invisible">Toggle</a>
          <span class="icon"></span>
          Go To
        </div>
        <div class="block-content clear-block ">
          <?php if (isset($primary_links)) print theme('links', $primary_links, array('id' => 'features-menu', 'class' => 'primary-links links')) ?>
        </div>
      </div>
    </div>
    <?php if ($space_tools): ?>
      <div id='space-tools'><div class='dropdown-blocks toggle-blocks clear-block'><?php print $space_tools ?></div></div>
    <?php endif; ?>
  </div></div>
  <?php endif; ?>

  <div id='page-tools'><div class='limiter clear-block'>
    <?php if ($title): ?><h1 <?php print drupal_attributes($title_attr) ?>><?php print $title ?></h1><?php endif; ?>
    <?php if ($tabs):?><div class='tabs clear-block'><?php print $tabs ?></div><?php endif; ?>
  </div></div>

  <?php if ($tabs2): ?>
    <div id='secondary-tabs'><div class='limiter clear-block'><?php print $tabs2 ?></div></div>
  <?php endif; ?>

  <?php if ($messages): ?><div id='messages'><?php print $messages; ?></div><?php endif; ?>

  <div id='page'><div class='limiter clear-block'>
    <?php if ($mission): ?><div class="mission"><?php print $mission ?></div><?php endif; ?>

    <div id='content'><div class='page-region'>
      <?php if ($content): ?>
        <div class='page-content content-wrapper clear-block'><?php print $content ?></div>
      <?php endif; ?>
      <?php print $content_region ?>
    </div></div>
    <div id='right'><div class='page-region'>
      <?php if ($right) print $right ?>
    </div></div>
    
    </div></div>

  <?php if ($footer_message || $footer_links): ?>
  <div id="footer"><div class='limiter clear-block'>
    <?php if ($footer_message): ?><div class='footer-message'><?php print $footer_message ?></div><?php endif; ?>
    <?php if ($footer_links): ?><?php print theme('links', $footer_links) ?><?php endif; ?>
  </div></div>
  <?php endif; ?>

  <?php if ($palette): ?><div id='palette'><?php print $palette; ?></div><?php endif; ?>

  <?php print $closure ?>

  </body>
</html>
        