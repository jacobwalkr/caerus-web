$state = md5(rand());
$app['session']->set('state', $state);
return $app['twig']->render('index.html', array(
    'CLIENT_ID' => CLIENT_ID,
    'STATE' => $state,
    'APPLICATION_NAME' => APPLICATION_NAME
));