<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;

class ThemeProvider
{
    private string $theme;

    public function __construct(
        RequestStack $request,
        string $defaultTheme
    ) {
        $theme = $request -> getCurrentRequest() -> cookies -> get('theme');
        if (is_null($theme)) {
            $theme = $defaultTheme;
        }
        $this -> theme = $theme;
    }

    public function get()
    {
        return $this ->theme;
    }
}
