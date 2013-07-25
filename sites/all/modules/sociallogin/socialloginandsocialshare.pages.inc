<?php
/**
 * @file
 * User page callbacks for the socialloginandsocialshare module.
 */

/**
 * Menu callback Manage socialloginandsocialshare identities for the specified user.
 */
function socialloginandsocialshare_user_identities($account) {
  drupal_set_title(check_plain($account->name));
  if (user_is_logged_in()) {
    $obj = new LoginRadius();
    $secret = trim(variable_get('socialloginandsocialshare_apisecret', ''));
    $api_handler = trim(variable_get('socialloginandsocialshare_api_handler', ''));
    $userprofile = $obj->loginradius_get_data($secret, $api_handler);
    if ($obj->isauthenticated == TRUE AND user_is_logged_in()) {
      $lrdata = socialloginandsocialshare_getuser_data($userprofile);
      $authname_exist =   db_query("SELECT authname FROM {authmap} WHERE authname = '%s'", $lrdata['id']);
      $result = db_query("SELECT provider FROM {authmap} am INNER JOIN {socialloginandsocialshare_mapusers} sm ON am.aid = sm.aid WHERE module = 'socialloginandsocialshare'  AND uid = %d", $account->uid);
      $mapped = '';
       while ($identity = db_fetch_object($result)) {
        if ($identity->provider == $lrdata['provider']) {
          $mapped='yes';
        }
      }
      $authname_exist = db_fetch_array($authname_exist);
      if (empty($authname_exist) && !$authname_exist) {
        if ($mapped != 'yes') {
          db_query("INSERT INTO {authmap} (uid, authname, module) VALUES ('%d' ,'%s' ,'%s')", $account->uid, check_plain($lrdata['id']), 'socialloginandsocialshare');
          if (variable_get('user_pictures', 1) && !empty($lrdata['thumbnail'])) {
            socialloginandsocialshare_insert_picture($lrdata, $account);
          }
        $aid = db_query("SELECT aid FROM {authmap} WHERE authname = '%s'", $lrdata['id']);
        $aid = db_fetch_object($aid);
        db_query("INSERT INTO {socialloginandsocialshare_mapusers} VALUES ('%d' ,'%s' ,'%s')", $aid->aid, $lrdata['provider'], check_plain($lrdata['id']));
        drupal_set_message(t("Your account sucessfully mapped with this account."));
      }
      else {
          drupal_set_message(t("This social ID is already linked with an account. Kindly unmap the current ID before linking new Social ID."), 'error');
        }
      }
      else {
        drupal_set_message(t("This account is already linked with an account. try to choose another account."), 'error');
      }
    }
  }
  $header = array(t('Social Provider'), t('Social Provider ID'), t('Operations'));
  $rows = array();
  $result = db_query("SELECT am.aid, am.authname, sm.provider, sm.provider_id FROM {authmap} am INNER JOIN {socialloginandsocialshare_mapusers} sm ON am.aid = sm.aid WHERE module = 'socialloginandsocialshare' AND uid = %d", $account->uid);
  while ($identity = db_fetch_object($result)) {
    $provider_name='';
    if (isset($_SESSION['current_social_provider']) && (check_plain($identity->provider_id) == $_SESSION['current_social_provider'])) {
      $provider_name= " [" . t('Currently connected') . "]";
    }
    $rows[] = array('<span' . drupal_attributes(array("class" => "socialloginandsocialshare-mapprovider")) . '>' . '<img src = "' . $GLOBALS['base_url'] . '/' . drupal_get_path('module', 'socialloginandsocialshare') . '/images/' . $identity->provider . '.png"></span><b>' . $identity->provider . $provider_name . '</b>',
      check_plain($identity->provider_id),
      l(t('Delete'),
      'user/' . $account->uid . '/socialloginandsocialshare/delete/' . $identity->aid),
    );
  }
  $identity_title = variable_get('socialloginandsocialshare_identity_label_string', '');
  $params = NULL;
  $output = '<b>' . t($identity_title) . '</b>' . '<br>' . theme('socialloginandsocialshare_links', $params);
  $output .= theme('table', $header, $rows);
  return $output;
}

/**
 * Menu callback Delete the specified socialloginandsocialshare identity from the system.
 */
function socialloginandsocialshare_user_delete($account, $aid = 0) {
  db_query("DELETE FROM {authmap} WHERE uid=%d AND aid=%d AND module='socialloginandsocialshare'", $account->uid, $aid);
  db_query("DELETE FROM {socialloginandsocialshare_mapusers} WHERE  aid='%d'", $aid);
  if (db_affected_rows()) {
    drupal_set_message(t('Social Login ID deleted.'));
  }
  drupal_goto('user/' . $account->uid . '/socialloginandsocialshare');
}