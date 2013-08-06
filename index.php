<?php

foreach (glob('Core/*/') as $folder)
{
    foreach (glob($folder . '*.php') as $file)
    {
        require $file;
    }
}

Handler::Handle($_SERVER['REQUEST_URI']);

?>
